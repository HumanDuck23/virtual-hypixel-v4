import {rejects} from "assert";
import axios from "axios";

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
            const res = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
            if (res.status === 200) {
                resolve(res.data)
            } else {
                reject(res)
            }
        })
    }
}