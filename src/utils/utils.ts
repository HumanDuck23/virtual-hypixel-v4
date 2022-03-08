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
    }
}