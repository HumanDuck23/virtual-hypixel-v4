import { configInterface } from "../interfaces/configInterface"
import { logger } from "../../utils/logger"
import { utils } from "../../utils/utils"
import { mcColors } from "./mcColors"
import { aliases } from "./aliases"
import { PlayerStats } from "../modules/PlayerStats"
import { ModuleBase } from "../modules/base/ModuleBase"
import { Client } from "minecraft-protocol"

export const commands = [
    {
        name: ["/sc", "/stat"],
        f(module: ModuleBase, config: configInterface, message: string, toServer: Client) {
            const args = message.split(" ")
            args.shift()

            if (args.length < 2) {
                utils.sendMessage(module.client, utils.colorText("Invalid usage! Use: /sc <gamemode> <player(s)>", mcColors.RED))
            } else {
                let gamemode: any = null
                for (const mode in aliases.games) {
                    if (args[0].toLowerCase() === mode.toLowerCase()) {
                        gamemode = mode
                    } else {
                        // @ts-ignore
                        for (const alias of aliases.games[mode]) {
                            if (alias.toString().toLowerCase() === args[0].toLowerCase()) {
                                gamemode = mode
                            }
                        }
                    }
                }

                if (gamemode === null) {
                    utils.sendMessage(module.client, utils.colorText("Invalid gamemode! See src/proxy/data/aliases.ts for a list of modes!", mcColors.RED))
                } else {
                    args.shift()

                    for (const player of args) {
                        utils.usernameToUUID(player)
                            .then(uuid => {
                                utils.getStats(uuid, config.account.hypixelApiKey)
                                    .then(stats => {
                                        console.log(gamemode)
                                        PlayerStats.showStats(module.client, module.virtual, stats, false, gamemode)
                                    })
                                    .catch(e => {
                                        logger.error(`Error getting stats of ${player}: ${e}`)
                                    })
                            })
                            .catch(e => {
                                logger.error(`Error converting username ${player} to UUID! ${e}`)
                            })
                    }
                }
            }
        }
    },
    {
        name: ["/rq", "/req", "/requeue"],
        lastRun: 0,
        f(module: ModuleBase, config: configInterface, message: string, toServer: Client) {
            if (module.virtual.currentMode) {
                if (module.virtual.gameStarted) {
                    if ((new Date().getTime() - this.lastRun) > 3000) {
                        utils.sendMessage(module.client, utils.colorText("You seem to be in game! Run the command again to confirm!", mcColors.RED))
                        this.lastRun = new Date().getTime()
                    } else {
                        toServer.write("chat", { message: `/play ${module.virtual.currentMode.toLowerCase()}` })
                    }
                } else {
                    toServer.write("chat", { message: `/play ${module.virtual.currentMode.toLowerCase()}` })
                }
            }
        }
    },
    {
        name: ["/play"],
        lastRun: 0,
        f(module: ModuleBase, config: configInterface, message: string, toServer: Client) {
            if (config.modules.playProtection) {
                if (module.virtual.gameStarted) {
                    if ((new Date().getTime() - this.lastRun) > 3000) {
                        utils.sendMessage(module.client, utils.colorText("You seem to be in game! Run the command again to confirm!", mcColors.RED))
                        this.lastRun = new Date().getTime()
                    } else {
                        toServer.write("chat", { message: message })
                    }
                } else {
                    toServer.write("chat", { message: message })
                }
            } else {
                toServer.write("chat", { message: message })
            }
        }
    }
]