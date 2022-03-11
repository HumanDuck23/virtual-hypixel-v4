import axios from "axios"
import {Client} from "minecraft-protocol";
import {mcColors} from "../proxy/data/mcColors";

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
     */
    getProfile(uuid: string, mode: "uuid" | "name" = "uuid"): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            if (mode === "name") {
                const res = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${uuid}`)
                if (res.status === 200) {
                    uuid = res.data.id
                } else {
                    reject(res)
                }
            }
            const res = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}?unsigned=false`)
            if (res.status === 200) {
                resolve(res.data)
            } else {
                reject(res)
            }
        })
    },

    /**
     * Checks whether the two players are in the same gamemode
     * @param uuid1
     * @param uuid2
     */
    sameGameMode(uuid1: string, uuid2: string, apiKey: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const res1 = await axios.get(`https://api.hypixel.net/status?uuid=${uuid1}&key=${apiKey}`)
            const res2 = await axios.get(`https://api.hypixel.net/status?uuid=${uuid2}&key=${apiKey}`)

            if (res1.status === 200 && res2.status === 200) {
                if (res1.data.session.online && res2.data.session.online) {
                    resolve(res1.data.session.mode === res2.data.session.mode)
                } else {
                    reject("offline")
                }
            } else {
                reject(-1)
            }
        })
    },

    /**
     * Checks whether the given player exists
     * @param name
     */
    playerExists(name: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const res = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${name}`)
            resolve(res.status === 200)
        })
    },

    /**
     * Send a message to the client
     * @param client - Client instance
     * @param m - Message
     * @param hoverText - Text to be shown on hover
     */
    sendMessage (client: Client, m: string, hoverText: string = "") {
        let message = {}
        if (hoverText) {
            message = { message: JSON.stringify({ text: "", extra: [{ text: m, hoverEvent: { action: "show_text", value: { text: hoverText } } }] }) }
        } else {
            message = { message: JSON.stringify({ text: "", extra: [{ text: m }] }) }
        }
        client.write("chat", message)
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