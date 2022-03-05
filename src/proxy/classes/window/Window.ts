import { windowClickEvent } from "../../interfaces/windowClickEvent"
import EventEmitter from "events"
import { Item } from "./item/Item"

/**
 * Class to represent minecraft container windows
 */
export class Window extends EventEmitter {

    items: Item[] = []

    /**
     * Constructor of the Window class
     * @param id - Window ID
     * @param type - Window type
     * @param title - Window title
     * @param slotCount - Slots in the window
     */
    constructor(public id: number, public type: string, public title: string, public slotCount: number) {
        super()
    }

    /**
     * Add an item the window's item array (doesn't send packet!)
     * @param item - Item instance
     */
    addItem(item: Item) {
        this.items.push(item)
    }

    /**
     * Add an array of items the window's item array (doesn't send packet!)
     * @param items - Array of Item instances
     */
    addItems(items: Item[]) {
        this.items.push(...items)
    }

    /**
     * Generates the JSON to be sent with the open_window packet
     */
    genOpenJSON() {
        return { windowId: this.id, inventoryType: this.type, windowTitle: JSON.stringify({ translate: this.title }), slotCount: this.slotCount }
    }

    /**
     * Generate the JSON for you to send with the "window_items" packet
     */
    genItemJSON() {
        const it = []
        for (const item of this.items) {
            it.push(item.genJSON())
        }
        return it
    }

    /**
     * Call this when the window is clicked on
     * @param event
     */
    onClick(event: windowClickEvent) {
        this.emit("click", event)
    }
}