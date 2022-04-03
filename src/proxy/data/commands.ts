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
                        utils.usernameToUUID(player, config.other.requestTimeout)
                            .then(uuid => {
                                utils.getStats(uuid, config.account.hypixelApiKey, config.other.requestTimeout)
                                    .then(stats => {
                                        PlayerStats.showStats(module.client, module.virtual, stats, false, gamemode)
                                    })
                                    .catch(e => {
                                        logger.error(`Error getting stats of ${player}: ${e}`)
                                    })
                            })
                            .catch(e => {
                                if (e === -1) {
                                    utils.sendMessage(module.client, utils.colorText("That player doesnt exist!", mcColors.RED))
                                } else {
                                    logger.error(`Error converting username ${player} to UUID! ${e}`)
                                }
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
    },
    {
        name: ["/namehistory", "/names", "/nh"],
        f(module: ModuleBase, config: configInterface, message: string, toServer: Client) {
            const args = message.split(" ")
            args.shift()

            if (args.length === 0) {
                utils.sendMessage(module.client, utils.colorText("Please specify at least one player!", mcColors.RED))
            }
            for (const player of args) {
                utils.usernameToUUID(player)
                    .then(uuid => {
                        utils.getNameHistory(uuid)
                            .then(history => {
                                utils.sendMessage(module.client, utils.colorText(`Name history of ${player}:`, mcColors.GOLD))
                                for (const name of history) {
                                    utils.sendMessage(module.client, utils.colorText(`${utils.colorText(name.name, mcColors.GREEN, true)} - ${name.changedToAt ? utils.colorText(`(${new Date(name.changedToAt).toISOString().split("T")[0]})`, mcColors.LIGHT_PURPLE) : ""}`, mcColors.WHITE))
                                }
                            })
                            .catch(e => {
                                logger.error(`Error getting name history of ${player}: ${e}`)
                            })
                    })
                    .catch(e => {
                        if (e === -1) {
                            utils.sendMessage(module.client, utils.colorText("That player doesnt exist!", mcColors.RED))
                        } else {
                            logger.error(`Error converting username ${player} to UUID! ${e}`)
                        }
                    })
            }
        }
    },
    {
    name: ["/stream ban", "/ssb"],
    f(module: ModuleBase, config: configInterface, message: string, toServer: Client) {
        const name = message.split(" ")[2]
        toServer.write("chat", { message: `/p kick ${name}` }
        setTimeout(() => {
          toServer.write("chat", { message: `/ignore add ${name}` }) 
        }, 250)       
    }
]
