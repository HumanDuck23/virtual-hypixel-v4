import { mcColors } from "../proxy/data/mcColors"
import { Client } from "minecraft-protocol"
import fetch from "node-fetch"

export const utils = {
    /**
     * Creates an array with n-amounts of the same object (deep copy).
     * Useful for filling inventory/chest windows.
     * @param obj - Object to be repeated
     * @param count - Amount of times to repeat object
     */
    repeatObj<T>(obj: T, count: number): T[] {
        const r = []
        for (let i = 0; i < count; i++) {
            r.push(Object.assign(Object.create(Object.getPrototypeOf(obj)), obj)) // deep copy
        }
        return r
    },

    /**
     * Repeats a string n times
     * @param str
     * @param n
     */
    repeatStr(str: string, n: number): string {
        let t = ""
        for (let i = 0; i < n; i++) {
            t += str
        }
        return t
    },

    /**
     * Checks whether the UUID is valid for a player
     * @param uuid - The UUID to check
     */
    realUUID(uuid: string): boolean {
        return /[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-4[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}/.exec(uuid) !== null
    },

    /**
     * Get minecraft session profile
     * For skins etc
     * @param uuid - UUID of the player
     * @param mode - Use uuid or name
     * @param sig - Get signature
     * @param timeout
     */
    getProfile(uuid: string, mode: "uuid" | "name" = "uuid", sig: boolean = true, timeout: number = 5000): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            if (mode === "name") {
                uuid = await this.usernameToUUID(uuid, timeout).catch(e => reject(e))
            }
            const controller = new AbortController()
            setTimeout(() => {
                controller.abort()
            }, timeout)
            const res = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}${sig ? "?unsigned=false" : ""}`, { signal: controller.signal }).catch(e => reject(e))
            if (res) {
                if (res.status === 200) {
                    const json = await res.json()
                    resolve(json)
                } else {
                    reject(res)
                }
            } else {
                reject(`Error making request: ${res}`)
            }
        })
    },

    /**
     * Checks whether the two players are in the same gamemode
     * @param uuid1
     * @param uuid2
     * @param timeout
     */
    sameGameMode(uuid1: string, uuid2: string, apiKey: string, timeout: number = 5000): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const controller1 = new AbortController()
            setTimeout(() => {
                controller1.abort()
            }, timeout)
            const res1 = await fetch(`https://api.hypixel.net/status?uuid=${uuid1}&key=${apiKey}`, { signal: controller1.signal }).catch(e => reject(e))

            const controller2 = new AbortController()
            setTimeout(() => {
                controller2.abort()
            }, timeout)
            const res2 = await fetch(`https://api.hypixel.net/status?uuid=${uuid2}&key=${apiKey}`, { signal: controller2.signal }).catch(e => reject(e))

            if (res1 && res2) {
                if (res1.status === 200 && res2.status === 200) {
                    const json1 = await res1.json()
                    const json2 = await res2.json()
                    if (json1.session.online && json2.session.online) {
                        resolve(json1.session.mode === json2.session.mode)
                    } else {
                        reject("offline")
                    }
                } else {
                    reject(-1)
                }
            } else {
                reject(`Error making request: ${res1} ${res2}`)
            }
        })
    },

    /**
     * Gets the stats of the UUID
     */
    getStats(uuid: string, apiKey: string, timeout: number = 5000): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const controller = new AbortController()
            setTimeout(() => {
                controller.abort()
            }, timeout)
            const res = await fetch(`https://api.hypixel.net/player?uuid=${uuid}&key=${apiKey}`, { signal: controller.signal }).catch(e => reject(e))
            if (res) {
                if (res.status === 200) {
                    const json = await res.json()
                    if (json.success) {
                        resolve(json.player)
                    } else {
                        reject(`Error with hypixel api: ${res.status}`)
                    }
                } else {
                    reject(`Error making stat's request: ${res.status}`)
                }
            } else {
                reject(`Error making request: ${res}`)
            }
        })
    },

    /**
     * Checks whether the given player exists
     * @param name
     * @param timeout
     */
    playerExists(name: string, timeout: number = 5000): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const controller = new AbortController()
            setTimeout(() => {
                controller.abort()
            }, timeout)
            const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`, { signal: controller.signal }).catch(e => reject(e))
            if (res)
                resolve(res.status === 200)
            else reject(-1)
        })
    },

    /**
     * Convert a username to a UUID
     * @param name
     * @param timeout
     */
    usernameToUUID(name: string, timeout: number = 5000): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const controller = new AbortController()
            setTimeout(() => {
                controller.abort()
            }, timeout)
            const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`, { signal: controller.signal }).catch(e => reject(e))
            if (res) {
                if (res.status === 200) {
                    const json = await res.json()
                    resolve(json.id)
                } else {
                    reject(-1)
                }
            } else reject(-1)
        })
    },

    /**
     * Convert a UUID to a username
     * @param uuid
     * @param timeout
     */
    uuidToUsername(uuid: string, timeout: number = 5000): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const controller = new AbortController()
            setTimeout(() => {
                controller.abort()
            }, timeout)
            const res = await fetch(`https://api.mojang.com/user/profiles/${uuid}/names`, { signal: controller.signal }).catch(e => reject(e))
            if (res) {
                if (res.status === 200) {
                    const json = await res.json()
                    resolve(json[json.length - 1].name)
                } else {
                    reject(-1)
                }
            } else reject(-1)
        })
    },

    /**
     * Send a message to the client
     * @param client - Client instance
     * @param m - Message
     * @param hoverText - Text to be shown on hover
     */
    sendMessage(client: Client, m: string, hoverText: string = "") {
        let message = {}
        if (hoverText) {
            message = { message: JSON.stringify({ text: "", extra: [{ text: m, hoverEvent: { action: "show_text", value: { text: hoverText } } }] }) }
        } else {
            message = { message: JSON.stringify({ text: "", extra: [{ text: m }] }) }
        }
        client.write("chat", message)
    },

    toDashUUID(uuid: string) {
        let nuuid = ""
        nuuid += uuid.substring(0, 8) + "-"
        nuuid += uuid.substring(8, 12) + "-"
        nuuid += uuid.substring(12, 16) + "-"
        nuuid += uuid.substring(16, 20) + "-"
        nuuid += uuid.substring(20, 32)
        return nuuid
    },

    /**
     * Color the text
     * @param text
     * @param color
     * @param bold
     * @param underline
     * @param italic
     * @param strike
     * @param obf
     */
    colorText(text: string, color: mcColors, bold = false, underline = false, italic = false, strike = false, obf = false) {
        return color + (bold ? mcColors.BOLD : "") + (underline ? mcColors.UNDERLINE : "") + (italic ? mcColors.ITALIC : "") + (strike ? mcColors.STRIKETHROUGH : "") + (obf ? mcColors.OBF : "") + text + mcColors.RESET
    },

    /**
     * Color the text, but with a custom reset
     * @param text
     * @param color
     * @param reset
     * @param bold
     * @param underline
     * @param italic
     * @param strike
     * @param obf
     */
    colorTextCustomReset(text: string, color: mcColors, reset: mcColors, bold = false, underline = false, italic = false, strike = false, obf = false) {
        return color + (bold ? mcColors.BOLD : "") + (underline ? mcColors.UNDERLINE : "") + (italic ? mcColors.ITALIC : "") + (strike ? mcColors.STRIKETHROUGH : "") + (obf ? mcColors.OBF : "") + text + reset
    },
}