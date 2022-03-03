export const utils = {
    /**
     * Creates an array with n-amounts of the same object (deep copy).
     * Useful for filling inventory/chest windows.
     * @param obj - Object to be repeated
     * @param count - Amount of times to repeat object
     */
    repeatObj(obj: any, count: number) {
        const r = []
        for (let i = 0; i < count; i++) {
            r.push(JSON.parse(JSON.stringify(obj))) // deep copy
        }
    }
}