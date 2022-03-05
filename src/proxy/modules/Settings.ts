import { WindowManager } from "../classes/window/WindowManager"
import { VirtualHypixel } from "../classes/VirtualHypixel"
import { Client, PacketMeta } from "minecraft-protocol"
import { ModuleBase } from "./base/ModuleBase"

/**
 * Settings module
 * /virtual command to open the window
 */
export class Settings extends ModuleBase {

    windowId: number = 69 // window id to use
    windowManager: WindowManager = new WindowManager()

    constructor(client: Client, virtual: VirtualHypixel) {
        super("Settings", "1.0.0", client, virtual);
    }

    openWindow() {
        this.windowManager.createWindow(this.client, this.windowId, "Virtual Hypixel", 9, () => {
            console.log("CLICK")
        })
    }

    onOutPacket(meta: PacketMeta, data: any, toServer: Client): [boolean, any] {
        if (meta.name === "chat") {
            if (data.message === this.virtual.config.inGameSettings.open) {
                this.openWindow()
                return [true, data]
            }
        }

        return [false, data]
    }

}
