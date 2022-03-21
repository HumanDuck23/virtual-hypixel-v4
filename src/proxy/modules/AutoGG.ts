import { VirtualHypixel } from "../classes/VirtualHypixel"
import { ModuleBase } from "./base/ModuleBase"
import { Client, PacketMeta } from "minecraft-protocol"

const ChatMessage = require('prismarine-chat')('1.8')

export class AutoGG extends ModuleBase {

    trigger: string = "WINNER"

    constructor(client: Client, virtual: VirtualHypixel) {
        super("AutoGG", "1.0.0", client, virtual)
    }

    onInPacket(meta: PacketMeta, data: any, toServer: Client): [boolean, any] {
        if (meta.name === "chat") {
            const m = new ChatMessage(JSON.parse(data.message))

            if (m.toString().startsWith(" ") && m.toString().includes(this.trigger)) {
                for (const [index, ggMessage] of this.virtual.config.autoGG.message.entries()) {
                    setTimeout(() => {
                        toServer.write("chat", { message: ggMessage })
                    }, (index + 1) * this.virtual.config.autoGG.delay)
                }
            }
        }

        return [false, data]
    }

}