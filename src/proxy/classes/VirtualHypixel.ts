import { configInterface } from "../interfaces/configInterface"
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
import axios from "axios"
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
    config: configInterface

    constructor(public configPath: string) {
        this.config = YAML.parse(fs.readFileSync(this.configPath).toString())
        if (this.config.stats === null) {
            // @ts-ignore
            this.config.stats = {}
        }
    }

    start() {
        logger.info(`Starting Virtual Hypixel ${this.version}...`)

        this.proxy =  new InstantConnectProxy({
            loginHandler: (client) => {
                this.client = client

                logger.info(`Logging in as ${client.profile.name}...`)
                logger.info(`Loading modules...`)

                this.modules.push(new Settings(this.client, this))

                if (this.config.modules.packetFilter)
                    this.modules.push(new PacketFilter(this.client, this))
                if (this.config.modules.playerModule)
                    this.modules.push(new PlayerStats(this.client, this))
                if (this.config.modules.fpsBoost)
                    this.modules.push(new FPSBoost(this.client, this))
                if (this.config.modules.betterPing)
                    this.modules.push(new BetterPing(this.client, this))
                if (this.config.modules.betterInvis)
                    this.modules.push(new BetterInvis(this.client, this))

                return { username: this.config.account.email, password: this.config.account.password, auth: this.config.account.auth }
            },
            serverOptions: {
                version: "1.8.9",
                // @ts-ignore
                validateChannelProtocol: false,
                motd: `Virtual Hypixel Server`,
                maxPlayers: 69,
                //favicon: fs.readFileSync("./data/favicon.txt").toString()
            },
            clientOptions: {
                version: "1.8.9",
                host: "hypixel.net"
            }
        })

        // @ts-ignore
        this.proxy.on('incoming', (data, meta, toClient, toServer) => {
            if (meta.name === "respawn" && new Date().getTime() - this.lastRespawn > 500) {
                toServer.write("chat", {message: "/whereami"})
                this.lastRespawn = new Date().getTime()
                this.inGame = null
                this.gameStarted = false

                if (this.client) {
                    axios.get(`https://api.hypixel.net/status?uuid=${this.client.profile?.id}&key=${this.config.account.hypixelApiKey}`)
                        .then(res => {
                            if (res.status === 200) {
                                if (res.data.success) {
                                    if (res.data.session.online) {
                                        this.currentMode = res.data.session.mode
                                    }
                                } else {
                                    logger.error(`Error with hypixel api: ${res.status}`)
                                }
                            } else {
                                logger.error(`Error with hypixel api: ${res.status}`)
                            }
                        })
                        .catch(e => {
                            logger.error(`Error getting your status: ${e}`)
                        })
                }

            } else if (meta.name === "chat") {
                const m = new ChatMessage(JSON.parse(data.message))
                const serverRE = /You are currently connected to server (.*)/
                if (serverRE.exec(m.toString())) {
                    const rex = serverRE.exec(m.toString())
                    if (rex && rex[1].includes("mini"))
                        this.inGame = true
                    else
                        this.inGame = false
                    return
                } else if (m.toString().includes("The game is starting in 0 seconds")) {
                    this.gameStarted = true
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
            let applied
            if (out)
                applied = module.onOutPacket(meta, data, toServer)
            else
                applied = module.onInPacket(meta, data, toServer)

            if (applied[0]) {
                intercept = true
            } else {
                data = applied[1]
            }
        }

        return { intercept, meta, data }
    }

    writeConfig() {
        fs.writeFileSync(this.configPath, "# Check: https://github.com/HumanDuck23/virtual-hypixel-v4/blob/master/src/config.yaml\n" + YAML.stringify(this.config))
    }

}
