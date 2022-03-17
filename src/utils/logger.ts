import chalk from "chalk"
import * as fs from "fs"


/**
 * Logger Util
 */
export const logger = {
    /**
     * Logs a debug message
     * @param text - Message
     */
    debug(text: string) {
        const date = new Date().toISOString()
        console.log(chalk.bold.magenta(`[${date.split("T")[1]}] [info] ${chalk.white(text)}`))
        fs.appendFileSync("./virtual-log.txt", `[${date}] [info] ${text}\n`)
    },

    /**
     * Logs an info message
     * @param text - Message
     */
    info(text: string) {
        const date = new Date().toISOString()
        console.log(chalk.bold.cyan(`[${new Date().toISOString()}] [info] ${chalk.white(text)}`))
        fs.appendFileSync("./virtual-log.txt", `[${date}] [info] ${text}\n`)
    },

    /**
     * Logs a warning message
     * @param text - Message
     */
    warn(text: string) {
        const date = new Date().toISOString()
        console.log(chalk.bold.yellow(`[${new Date().toISOString()}] [warn] ${chalk.white(text)}`))
        fs.appendFileSync("./virtual-log.txt", `[${date}] [info] ${text}\n`)
    },

    /**
     * Logs an error message
     * @param text - Message
     */
    error(text: string) {
        const date = new Date().toISOString()
        console.log(chalk.bold.red(`[${new Date().toISOString()}] [error] ${chalk.white(text)}`))
        fs.appendFileSync("./virtual-log.txt", `[${date}] [info] ${text}\n`)
    }
}