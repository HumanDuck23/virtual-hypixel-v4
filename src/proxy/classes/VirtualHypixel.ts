import { configInterface } from "../interfaces/configInterface"
import { CommandsHandler } from "../modules/CommandsHandler"
import { ModuleBase } from "../modules/base/ModuleBase"
import { InstantConnectProxy } from "prismarine-proxy"
import { WindowManager } from "./window/WindowManager"
import { PacketFilter } from "../modules/PacketFilter"
import { Client, PacketMeta } from "minecraft-protocol"
import { PlayerStats } from "../modules/PlayerStats"
import { BetterInvis } from "../modules/BetterInvis"
import { BetterPing } from "../modules/BetterPing"
import { Settings } from "../modules/Settings"
import { FPSBoost } from "../modules/FPSBoost"
import { logger } from "../../utils/logger"
import { AutoGG } from "../modules/AutoGG"
import fetch from "node-fetch"
import YAML from "yaml"
import * as fs from "fs"

const ChatMessage = require('prismarine-chat')('1.8')

/**
 * Main Virtual Hypixel Class
 */
export class VirtualHypixel {

    version: string = "v4-beta-1.0.0"

    // game stuff
    proxy: InstantConnectProxy | undefined
    client: Client | undefined

    inGame: boolean | null = false
    lastRespawn: number = 0
    currentMode: string | undefined
    position: any = {}
    gameStarted: boolean = false

    // modules and stuff
    windowManager: WindowManager = new WindowManager()
    modules: ModuleBase[] = []
    moduleToggles: {
        [key: string]: boolean
    } = {}
    config: configInterface

    startedAutoTip: boolean = false

    constructor(public configPath: string) {
        fs.writeFileSync("./virtual-log.txt", "")
        this.config = YAML.parse(fs.readFileSync(this.configPath).toString())
        if (this.config.stats === null) {
            // @ts-ignore
            this.config.stats = {}
        }
    }

    start() {
        logger.info(`Starting Virtual Hypixel ${this.version}...`)

        this.proxy = new InstantConnectProxy({
            loginHandler: (client) => {
                this.client = client

                logger.info(`Logging in as ${client.profile.name}...`)
                logger.info(`Loading modules...`)

                this.moduleToggles["Packet Filter"] = this.config.modules.packetFilter
                this.moduleToggles["Player Stats"] = this.config.modules.playerModule
                this.moduleToggles["FPS Boost"] = this.config.modules.fpsBoost
                this.moduleToggles["Better Ping"] = this.config.modules.betterPing
                this.moduleToggles["Better Invis"] = this.config.modules.betterInvis
                this.moduleToggles["AutoGG"] = this.config.modules.autoGG
                this.moduleToggles["Settings"] = true
                this.moduleToggles["Command Handler"] = true

                this.modules.push(new Settings(this.client, this))
                this.modules.push(new CommandsHandler(this.client, this))

                this.modules.push(new PacketFilter(this.client, this))
                this.modules.push(new PlayerStats(this.client, this))
                this.modules.push(new FPSBoost(this.client, this))
                this.modules.push(new BetterPing(this.client, this))
                this.modules.push(new BetterInvis(this.client, this))
                this.modules.push(new AutoGG(this.client, this))

                this.client.on("end", () => {
                    this.inGame = null
                })

                return { username: this.config.account.email, password: this.config.account.password, auth: this.config.account.auth }
            },
            serverOptions: {
                version: "1.8.9",
                // @ts-ignore
                validateChannelProtocol: false,
                motd: `Virtual Hypixel Server`,
                maxPlayers: 69,
                favicon: fs.readFileSync("./proxy/data/favicon.txt").toString()
            },
            clientOptions: {
                version: "1.8.9",
                host: "hypixel.net"
            }
        })

        // @ts-ignore
        this.proxy.on('incoming', (data, meta, toClient, toServer) => {
            if (!this.startedAutoTip && this.config.modules.autoTip) {
                this.startedAutoTip = true
                setTimeout(() => {
                    setInterval(() => {
                        toServer.write("chat", { message: "/tip all" })
                    }, this.config.autoTip.interval * 1000 * 60)
                }, this.config.autoTip.interval * 1000 * 60)
            }
            if (meta.name === "respawn" && new Date().getTime() - this.lastRespawn > 500) {
                toServer.write("chat", {message: "/locraw"})
                this.lastRespawn = new Date().getTime()
                this.inGame = null
                this.gameStarted = false
            } else if (meta.name === "chat") {
                const m = new ChatMessage(JSON.parse(data.message))
                //console.log(m.toString())
                const serverRE = /.+"server":.+".+".+/
                const gameTypeRE = /.+"gametype":.+".+".+/
                if (serverRE.exec(m.toString()) && gameTypeRE.exec(m.toString())) {
                    try {
                        const parsed = JSON.parse(m.toString())
                        this.inGame = parsed.server.includes("mini")
                        if (Object.keys(parsed).includes("mode")) {
                            this.currentMode = parsed.mode
                        }
                    } catch (e) {
                        logger.error(`Error while parsing chat message: ${e}`)
                    }
                    return
                } else if (m.toString().includes("▬")) {
                    if (m.extra && m.extra[0] && m.extra[0].color === "green") {
                        this.gameStarted = true
                    }
                }
            }

            const handled = this.handlePacket(meta, data, toServer, false)

            if (!handled.intercept)
                toClient.write(handled.meta.name, handled.data)
        })

        // @ts-ignore
        this.proxy.on('outgoing', (data, meta, toClient, toServer) => {
            if (meta.name === "position") {
                this.position = data
            }

            let winIntercept = this.windowManager.onOutPacket(meta, data, toServer)

            const handled = this.handlePacket(meta, data, toServer, true)

            if (!winIntercept && !handled.intercept)
                toServer.write(handled.meta.name, handled.data)
        })

        logger.info(`Ready! Connect to "localhost" to start playing!`)
    }

    handlePacket(meta: PacketMeta, data: any, toServer: Client, out: boolean): { intercept: boolean, meta: PacketMeta, data: any } {
        let intercept = false
        for (const module of this.modules) {
            if (this.moduleToggles[module.name]) {
                let applied
                try {
                    if (out)
                        applied = module.onOutPacket(meta, data, toServer)
                    else
                        applied = module.onInPacket(meta, data, toServer)
                } catch (e) {
                    logger.error(`Error in module ${module.name}: ${e}`)
                    applied = [false, data]
                }

                if (applied[0]) {
                    intercept = true
                } else {
                    data = applied[1]
                }
            }
        }

        return { intercept, meta, data }
    }

    writeConfig() {
        fs.writeFileSync(this.configPath, "# Check: https://github.com/HumanDuck23/virtual-hypixel-v4/blob/master/src/config.yaml\n" + YAML.stringify(this.config))
    }

}
