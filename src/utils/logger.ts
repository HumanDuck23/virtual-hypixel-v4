import color from "colorts"
import chalk from "chalk"


/**
 * Logger Util
 */
export const logger = {
    /**
     * Logs a debug message
     * @param text - Message
     */
    debug(text: string) {
        console.log(chalk.bold.magenta(`[${new Date().toISOString()}] [info] ${color(text).white}`))
    },

    /**
     * Logs an info message
     * @param text - Message
     */
    info(text: string) {
        console.log(chalk.bold.cyan(`[${new Date().toISOString()}] [info] ${color(text).white}`))
    },

    /**
     * Logs a warning message
     * @param text - Message
     */
    warn(text: string) {
        console.log(chalk.bold.yellow(`[${new Date().toISOString()}] [warn] ${color(text).white}`))
    },

    /**
     * Logs an error message
     * @param text - Message
     */
    error(text: string) {
        console.log(chalk.bold.red(`[${new Date().toISOString()}] [error] ${color(text).white}`))
    }
}