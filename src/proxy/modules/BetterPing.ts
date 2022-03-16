import { VirtualHypixel } from "../classes/VirtualHypixel"
import { ModuleBase } from "./base/ModuleBase"
import { Client, PacketMeta, ping } from "minecraft-protocol"
import { logger } from "../../utils/logger"
import { utils } from "../../utils/utils"

/**
 * Module to show ping more accurately (faster updates)
 */
export class BetterPing extends ModuleBase {

    pingInterval: NodeJS.Timer | null = null

    constructor(client: Client, virtual: VirtualHypixel) {
        super("Better Ping", "1.0.0", client, virtual);
        this.virtual.client?.on("end", () => {
            if (this.pingInterval) {
                clearInterval(this.pingInterval)
                this.pingInterval = null
            }
        })
    }

    onInPacket(meta: PacketMeta, data: any, toServer: Client): [boolean, any] {
        if (this.pingInterval === null) {
            this.pingInterval = setInterval(() => {
                ping({
                    host: "mc.hypixel.net",
                    version: "1.8.9"
                })
                    .then(e => {
                        // @ts-ignore
                        this.client.write("player_info", { action: 2, data: [ { UUID: utils.toDashUUID(this.client.profile.id), ping: e.latency } ] })
                    })
                    .catch(e => {
                        logger.error(`Error pinging: ${e}`)
                    })
            }, this.virtual.config.betterPing.interval ?? 5000)
        }
        if (meta.name === "player_info" && data.action === 2) {
            if (data.data[0].UUID.replaceAll("-","") === this.client?.profile.id) {
                return [true, null] // block server ping packets
            }
        }

        return [false, data]
    }

}