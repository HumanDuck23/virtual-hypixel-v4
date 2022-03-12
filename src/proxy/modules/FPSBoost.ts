import { VirtualHypixel } from "../classes/VirtualHypixel"
import { Client, PacketMeta } from "minecraft-protocol"
import { ModuleBase } from "./base/ModuleBase"

/**
 * FPS Boost Module
 * Works by filtering out packets that spawn unnecessary stuff (e.g particles)
 */
export class FPSBoost extends ModuleBase {

    constructor(client: Client, virtual: VirtualHypixel) {
        super("FPS Boost", "1.0.0", client, virtual);
    }

    onInPacket(meta: PacketMeta, data: any, toServer: Client): [boolean, any] {
        if (meta.name === "world_particles") return [this.virtual.config.fpsBoost.particles, data]

        if (meta.name === "spawn_entity") {
            if (data.type === 76) {
                return [this.virtual.config.fpsBoost.fireworks, data]
            }
        }

        return [false, data]
    }

}