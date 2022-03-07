import { CustomSkull } from "../classes/window/item/CustomSkull"
import { VirtualHypixel } from "../classes/VirtualHypixel"
import { Client, PacketMeta } from "minecraft-protocol"
import { ModuleBase } from "./base/ModuleBase"
import { Item } from "../classes/window/item/Item"
import { logger } from "../../utils/logger"
import { utils } from "../../utils/utils"

/**
 * Settings module
 * /virtual command to open the window
 */
export class Settings extends ModuleBase {

    windowId: number = 69 // window id to use
    loadedLayout: boolean = false

    layout: Item[] = [
        ...utils.repeatObj<Item>(new Item(160, "ee", 15), 8),
        new CustomSkull("TEST", "f081021a-a454-4f15-bf2d-af9d9935e1f2")
    ]

    constructor(client: Client, virtual: VirtualHypixel) {
        super("Settings", "1.0.0", client, virtual);
    }

    openWindow() {
        if (!this.loadedLayout) {
            this.loadLayout()
                .then(() => {
                    this.openWindow()
                })
        } else {
            this.virtual.windowManager.createWindow(this.client, this.windowId, "Virtual Hypixel", 9, () => {
                logger.debug("click!")
            })
            this.virtual.windowManager.addItems(this.client, this.windowId, this.layout)
        }
    }

    loadLayout() {
        return new Promise(async (resolve, reject) => {
            let skullCount = 0
            let loadedCount = 0

            for (const item of this.layout) {
                if (item instanceof CustomSkull) skullCount++
            }

            logger.debug(`Loading ${skullCount} skulls.`)

            for (const item of this.layout) {
                if (item instanceof CustomSkull) {
                    await item.loadData().catch(e => { logger.error(`Error in skull: ${e}`) })
                    loadedCount++
                    if (loadedCount === skullCount) {
                        this.loadedLayout = true
                        resolve(1)
                    }
                }
            }
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
