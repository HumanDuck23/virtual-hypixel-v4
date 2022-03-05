import { WindowManager } from "../classes/window/WindowManager"
import { VirtualHypixel } from "../classes/VirtualHypixel"
import { Client, PacketMeta } from "minecraft-protocol"
import { ModuleBase } from "./base/ModuleBase"
import { logger } from "../../utils/logger"
import {Item} from "../classes/window/Item";

/**
 * Settings module
 * /virtual command to open the window
 */
export class Settings extends ModuleBase {

    windowId: number = 69 // window id to use

    constructor(client: Client, virtual: VirtualHypixel) {
        super("Settings", "1.0.0", client, virtual);
    }

    openWindow() {
        this.virtual.windowManager.createWindow(this.client, this.windowId, "Virtual Hypixel", 9, () => {
            logger.debug("click!")
        })
        this.virtual.windowManager.addItems(this.client, this.windowId, [new Item(160, "test", 0)])
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
