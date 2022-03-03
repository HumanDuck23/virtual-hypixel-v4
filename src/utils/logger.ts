import color from "colorts"

/**
 * Logger Util
 */
export const logger = {
    /**
     * Logs an info message
     * @param text - Message
     */
    info(text: string) {
        console.log(color(`[${new Date().toISOString()}] [info] ${color(text).white}`).cyan.bold.toString())
    },

    /**
     * Logs a warning message
     * @param text - Message
     */
    warn(text: string) {
        console.log(color(`[${new Date().toISOString()}] [warn] ${color(text).white}`).yellow.bold.toString())
    },

    /**
     * Logs an error message
     * @param text - Message
     */
    error(text: string) {
        console.log(color(`[${new Date().toISOString()}] [error] ${color(text).white}`).red.bold.toString())
    }
}