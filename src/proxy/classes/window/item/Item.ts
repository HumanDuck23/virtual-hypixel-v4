/**
 * Very simple representation of an MC item
 */
export class Item {
    /**
     * Constructor of the Item class
     * @param id - ID
     * @param name - Display Name
     * @param dmg - Item Damage (for different colored glass etc.)
     */
    constructor(public id: number, public name: string, public dmg: number | undefined) {}

    /**
     * Generates the JSON for you to send with the "window_items" packet
     */
    genJSON() {
        return {
            blockId: this.id,
            itemCount: 1,
            itemDamage: this.dmg,
            nbtData: {
                "type": "compound",
                "name": "",
                "value": {
                    "display": {
                        "type": "compound",
                        "value": {
                            "Name": {
                                "type": "string",
                                "value": this.name
                            }
                        }
                    }
                }
            }
        }
    }

    static getName(nbtData: any) {
        return nbtData.value.display.value.Name.value
    }
}