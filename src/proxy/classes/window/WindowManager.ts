import { Client, PacketMeta } from "minecraft-protocol"
import { Window } from "./Window"
import { Item } from "./Item"

/**
 * Class to create and manage container windows
 */
export class WindowManager {
    windows: { [key: number]: Window } = {}

    /**
     * Creates an inventory GUI
     * @param windowId - ID of the window
     * @param client - Current client instance
     * @param title - Title of the window
     * @param slots - Slot count
     * @param onClick - Will be called when a click event occurs
     */
    createWindow(client: Client, windowId: number, title: string, slots: number, onClick: () => void) {
        this.windows[windowId] = new Window(windowId, "minecraft:chest", title, slots)
        this.windows[windowId].on("click", onClick)

        client.write("open_window", this.windows[windowId].genOpenJSON())
    }

    /**
     * Adds the items to the window
     * @param client - Current client instance
     * @param windowId - ID of the window
     * @param items - Array of Item instances
     */
    addItems(client: Client, windowId: number, items: Item[]) {
        this.windows[windowId].addItems(items)

        client.write("window_items", { windowId, items: this.windows[windowId].genItemJSON() })
    }

    /**
     * Close the window
     * @param client - Current client instance
     * @param windowId - ID of the window
     */
    closeWindow(client: Client, windowId: number) {
        delete this.windows[windowId]
        client.write("close_window", { windowId })
    }

    /**
     * Called for each packet going to the (target) server
     * @param meta - Packet meta
     * @param data - Packet data
     * @param toServer - toServer to be used to send stuff to the server
     * @return boolean - Whether the packet should be filtered or not
     */
    onOutPacket(meta: PacketMeta, data: any, toServer: Client): boolean {
        if (meta.name === "window_click") {
            if (data.windowId && Object.keys(this.windows).includes(data.windowId.toString())) {
                this.windows[data.windowId].onClick(data)
                return true
            }
        }
       return false
    }
}