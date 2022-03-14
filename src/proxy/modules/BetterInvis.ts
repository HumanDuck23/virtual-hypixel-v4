import { VirtualHypixel } from "../classes/VirtualHypixel"
import { Client, PacketMeta } from "minecraft-protocol"
import { ModuleBase } from "./base/ModuleBase"

/**
 * Module that makes invis footprints more visible
 * Use at your own risk
 * **cough** better
 */
export class BetterInvis extends ModuleBase {

    lastSent: number = 0

    constructor(client: Client, virtual: VirtualHypixel) {
        super("Better Invis", "1.0.0", client, virtual);
    }

    onInPacket(meta: PacketMeta, data: any, toServer: Client): [boolean, any] {
        if (meta.name === "world_particles") {
            if (data.particleId === 28) { // footprint
                data.y += 0.2 // slightly higher up
                this.client.write("world_particles", data)
                // send special "instant spell" particles
                this.client.write("world_particles", {
                    particleId: 14,
                    longDistance: false,
                    x: data.x,
                    y: data.y,
                    z: data.z,
                    offsetX: 0,
                    offsetY: 0,
                    offsetZ: 0,
                    particleData: 1,
                    particles: 15
                })
                this.client.write("named_sound_effect", {
                    soundName: "mob.bat.death",
                    x: data.x,
                    y: data.y,
                    z: data.z,
                    volume: 1
                })

                if (new Date().getTime() - this.lastSent > 200) {
                    this.lastSent = new Date().getTime()
                    this.client.write("named_sound_effect", {
                        soundName: "mob.bat.takeoff",
                        x: this.virtual.position.x,
                        y: this.virtual.position.y,
                        z: this.virtual.position.z
                    })
                }
            }
        }

        return [false, data]
    }

}