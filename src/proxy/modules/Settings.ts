import { CustomSkull } from "../classes/window/item/CustomSkull"
import { VirtualHypixel } from "../classes/VirtualHypixel"
import { Client, PacketMeta } from "minecraft-protocol"
import { ModuleBase } from "./base/ModuleBase"
import { Item } from "../classes/window/item/Item"
import { logger } from "../../utils/logger"
import { mcColors } from "../data/mcColors"
import { utils } from "../../utils/utils"

const open = require("open")

/**
 * Settings module
 * /virtual command to open the window
 */
export class Settings extends ModuleBase {

    windowId: number = 69 // window id to use
    loadedLayout: boolean = false
    layouts: {
        [key: string]: {
            name: string,
            layout: Item[]
        }
    }

    constructor(client: Client, virtual: VirtualHypixel) {
        super("Settings", "1.0.0", client, virtual);

        this.layouts =  {
            main: {
                name: "Virtual Hypixel",
                layout:  [
                    ...utils.repeatObj<Item>(new Item(160, "", 15), 9),
                    new Item(160, "", 15),
                    new CustomSkull(utils.colorText("Modules", mcColors.LIGHT_PURPLE, true), "9b44022c-6dec-4182-9d1e-b11c272b81df"),
                    ...utils.repeatObj<Item>(new Item(160, "", 15), 7),
                    ...utils.repeatObj<Item>(new Item(160, "", 15), 9),
                    ...utils.repeatObj<Item>(new Item(160, "", 15), 9),
                    ...utils.repeatObj<Item>(new Item(160, "", 15), 9),
                    ...utils.repeatObj<Item>(new Item(160, "", 15), 4),
                    new CustomSkull(utils.colorText("GitHub", mcColors.AQUA, true), "3c77f8ea-3a43-4526-8f8b-0068c1b7c87e"),
                    ...utils.repeatObj<Item>(new Item(160, "", 15), 4)
                ]
            },
            modules: {
                name: "Virtual Hypixel - Modules",
                layout: [
                    ...utils.repeatObj<Item>(new Item(160, "", 15), 9),
                    ...utils.repeatObj<Item>(new Item(160, "", 15), 9),
                    ...utils.repeatObj<Item>(new Item(160, "", 15), 4),
                    new Item(262, utils.colorText("Back", mcColors.RED, true), 0),
                    ...utils.repeatObj<Item>(new Item(160, "", 15), 4),
                ]
            }
        }
    }

    openWindow(layout: { name: string, layout: Item[] }) {
        if (!this.loadedLayout) {
            this.loadLayout()
                .then(() => {
                    this.openWindow(this.layouts.main)
                })
        } else {
            this.virtual.windowManager.createWindow(this.client, this.windowId, layout.name, layout.layout.length, (event) => {
                let reOpenWindow = true

                const itemName = Item.getName(event.item.nbtData)
                if (itemName.includes("GitHub")) {
                    open("https://github.com/HumanDuck23/virtual-hypixel-v4")
                } else if (itemName.includes("Modules")) {
                    reOpenWindow = false
                    this.openWindow(this.layouts.modules)
                } else if (itemName.includes("Back")) {
                    reOpenWindow = false
                    this.openWindow(this.layouts.main)
                }

                if (reOpenWindow) {
                    this.openWindow(layout)
                }
            })
            this.virtual.windowManager.addItems(this.client, this.windowId, layout.layout)
        }
    }

    loadLayout() {
        return new Promise(async (resolve, reject) => {
            let skullCount = 0
            let loadedCount = 0

            for (let [key, value] of Object.entries(this.layouts)) {
                for (const item of value.layout) {
                    if (item instanceof CustomSkull) skullCount++
                }
            }


            logger.debug(`Loading ${skullCount} skulls.`)

            if (skullCount === 0) {
                this.loadedLayout = true
                resolve(1)
            } else {
                for (let [key, value] of Object.entries(this.layouts)) {
                    for (const item of value.layout) {
                        if (item instanceof CustomSkull) {
                            await item.loadData().catch(e => { logger.error(`Error in skull: ${e}`) })
                            loadedCount++
                            if (loadedCount === skullCount) {
                                this.loadedLayout = true
                                resolve(1)
                            }
                        }
                    }
                }
            }
        })

    }

    onOutPacket(meta: PacketMeta, data: any, toServer: Client): [boolean, any] {
        if (meta.name === "chat") {
            if (data.message === this.virtual.config.inGameSettings.open) {
                this.openWindow(this.layouts.main)
                return [true, data]
            }
        }

        return [false, data]
    }

}
