import { logger } from "../../../../utils/logger"
import { utils } from "../../../../utils/utils"
import { Item } from "./Item"

export class CustomSkull extends Item {

    playerName: string = ""
    value: string = ""
    signature: string = ""

    constructor(name: string, public playerUUID: string) {
        super(397, name, 3)
    }

    /**
     * Load the data to send with the packet
     */
    loadData() {
        return new Promise(async (resolve, reject) => {
            // Load player data
            utils.getProfile(this.playerUUID)
                .then(data => {
                    if (data) {
                        this.playerName = data.name
                        this.value = data.properties[0].value
                        this.signature = data.properties[0].signature

                        if (this.playerName === "" || this.value === "" || this.signature === "") {
                            reject("Error loading data")
                        } else {
                            resolve("done")
                        }
                    } else {
                        reject("unknown")
                    }
                })
                .catch(e => {  logger.error(`CustomSkull: Error loading profile of ${this.playerUUID} - ${e}`); reject(e) })
        })
    }

    genJSON() {
        return {
            blockId: this.id,
            itemCount: 1,
            itemDamage: this.dmg,
            nbtData: {
                "type": "compound",
                "name": "",
                "value": {
                    "SkullOwner": {
                        "type": "compound",
                        "value": {
                            "Id": {
                                "type": "string",
                                "value": this.playerUUID
                            },
                            "Properties": {
                                "type": "compound",
                                "value": {
                                    "textures": {
                                        "type": "list",
                                        "value": {
                                            "type": "compound",
                                            "value": [
                                                {
                                                    "Signature": {
                                                        "type": "string",
                                                        "value": this.signature
                                                    },
                                                    "Value": {
                                                        "type": "string",
                                                        "value": this.value
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            },
                            "Name": {
                                "type": "string",
                                "value": this.playerName
                            }
                        }
                    },
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

}