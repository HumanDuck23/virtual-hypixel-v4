import { configInterface } from "../interfaces/configInterface"
import { InstantConnectProxy } from "prismarine-proxy"
import { Client } from "minecraft-protocol"

/**
 * Main Virtual Hypixel Class
 */

export class VirtualHypixel {

    version: string = "v4-beta-0.0.1"

    // game stuff
    proxy: InstantConnectProxy
    client: Client | undefined

    constructor(public config: configInterface) {
    }

}