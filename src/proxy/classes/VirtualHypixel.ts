import { configInterface } from "../interfaces/configInterface"
import { ModuleBase } from "../modules/base/ModuleBase"
import { InstantConnectProxy } from "prismarine-proxy"
import { WindowManager } from "./window/WindowManager"
import { Client } from "minecraft-protocol"
import { logger } from "../../utils/logger"

/**
 * Main Virtual Hypixel Class
 */

export class VirtualHypixel {

    version: string = "v4-beta-0.0.1"

    // game stuff
    proxy: InstantConnectProxy
    client: Client | undefined

    // modules and stuff
    windowManager: WindowManager = new WindowManager()
    modules: ModuleBase[] = []

    constructor(public config: configInterface) {
        logger.info(`Starting Virtual Hypixel ${this.version}...`)

        this.proxy =  new InstantConnectProxy({
            loginHandler: (client) => {
                this.client = client

                logger.info(`Logging in as ${client.profile.name}...`)
                logger.info(`Loading modules...`)

                return { username: config.account.email, password: config.account.password, auth: config.account.auth }
            },
            serverOptions: {
                version: "1.8.9",
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
            toClient.write(meta.name, data)
        })

        // @ts-ignore
        this.proxy.on('outgoing', (data, meta, toClient, toServer) => {
            let intercept = false
            intercept = this.windowManager.onOutPacket(meta, data, toServer)


            if (!intercept)
                toServer.write(meta.name, data)
        })

        logger.info(`Ready! Connect to "localhost" to start playing!`)
    }

}