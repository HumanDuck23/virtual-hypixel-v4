import { Client, PacketMeta } from "minecraft-protocol"
import { VirtualHypixel } from "../classes/VirtualHypixel"
import { ModuleBase } from "./base/ModuleBase"
import { commands } from "../data/commands"

export class CommandsHandler extends ModuleBase {

    constructor(client: Client, virtual: VirtualHypixel) {
        super("Command Handler", "1.0.0", client, virtual);
    }

    onOutPacket(meta: PacketMeta, data: any, toServer: Client): [boolean, any] {
        if (meta.name === "chat") {
            for (const command of commands) {
                if (command.name.includes(data.message.split(" ")[0])) {
                    command.f(this, this.virtual.config, data.message)
                    return [true, null]
                }
            }
        }

        return [false, data]
    }

}