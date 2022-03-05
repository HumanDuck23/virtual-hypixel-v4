import { VirtualHypixel } from "../../classes/VirtualHypixel"
import { PacketMeta } from "minecraft-protocol"
import { logger } from "../../../utils/logger"
import { Client } from "minecraft-protocol"

/**
 * This is the base class for all modules.
 * Provided methods:
 * - onInPacket (PacketMeta, data, toServer) -> string
 * - onOutPacket (PacketMeta, data, toServer) -> string
 */
export class ModuleBase {

    /**
     * Constructor for a module
     * @param name - Name of the module
     * @param version - Version of the module
     * @param client - Current client instance
     * @param virtual - Current virtual-hypixel instance
     */
    constructor(public name: string, public version: string, public client: Client, public virtual: VirtualHypixel) {
        logger.info(`Loaded module: ${this.name} v${this.version}`)
    }

    /**
     * Called for each packet coming to the client
     * @param meta - Packet meta
     * @param data - Packet data
     * @param toServer - toServer to be used to send stuff to the server
     * @return boolean - [Filter packet, data], this is so that you can modify the data instead of filtering it completely
     */
    onInPacket(meta: PacketMeta, data: any, toServer: Client): [boolean, any] {
        return [false, data]
    }

    /**
     * Called for each packet going to the (target) server
     * @param meta - Packet meta
     * @param data - Packet data
     * @param toServer - toServer to be used to send stuff to the server
     * @return [boolean, any] - [Filter packet, data], this is so that you can modify the data instead of filtering it completely
     */
    onOutPacket(meta: PacketMeta, data: any, toServer: Client): [boolean, any] {
        return [false, data]
    }
}