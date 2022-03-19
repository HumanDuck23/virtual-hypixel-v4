import { VirtualHypixel } from "../classes/VirtualHypixel"
import { Client, PacketMeta } from "minecraft-protocol"
import { ModuleBase } from "./base/ModuleBase"
import { logger } from "../../utils/logger"
import { mcColors } from "../data/mcColors"
import { utils } from "../../utils/utils"
import { stats } from "../data/stats"

/**
 * Player Stats Module
 * Shows stats of players before the game starts
 */
export class PlayerStats extends ModuleBase {

    tabList: string[] = []
    sentPlayers: string[] = []

    constructor(client: Client, virtual: VirtualHypixel) {
        super("Player Stats", "1.0.0", client, virtual);
    }

    onInPacket(meta: PacketMeta, data: any, toServer: Client): [boolean, any] {
        if (meta.name === "respawn") {
            // remove players from tablist
            for (const uuid of this.tabList) {
                this.client?.write("player_info", { action: 4, data: [{ UUID: uuid }] })
            }
            this.sentPlayers = []
        }

        if (meta.name === "scoreboard_team") {
            if (data.team === "§7§k") { // players team
                if (data.mode === 3) { // add players
                    for (const player of data.players) {
                        if (player !== this.client.profile.name) {
                            utils.playerExists(player)
                                .then(exists => {
                                    if (exists) {
                                        //logger.debug(`${player} exists`)
                                        utils.usernameToUUID(player)
                                            .then(uuid => {
                                                if (!this.sentPlayers.includes(uuid)) {
                                                    this.sentPlayers.push(uuid.toString().includes("-") ? uuid : utils.toDashUUID(uuid))
                                                    utils.getStats(uuid, this.virtual.config.account.hypixelApiKey)
                                                        .then(playerObj => {
                                                            //logger.debug(`got stats of ${player}`)
                                                            if (this.virtual.config.other.showCorrectNameAndSkin) {
                                                                utils.getProfile(player, "name")
                                                                    .then(profile => {
                                                                        let displayName = stats.getPlayerText(playerObj)
                                                                        const rankRegex = /.*(\[.*\]).*/
                                                                        if (rankRegex.exec(displayName) !== null) {
                                                                            // @ts-ignore
                                                                            displayName = displayName.replace(rankRegex.exec(displayName)[1], "")
                                                                            displayName = displayName.replace(" ", "")
                                                                        }
                                                                        this.client?.write("player_info", { action: 0, data: [{ UUID: uuid, name: displayName.length <= 16 ? displayName : player, properties: profile.properties }], gamemode: 2, ping: 100 })
                                                                        // ^ attempt at making it show the correct skin and stuff lol, thats still a TODO
                                                                        this.tabList.push(uuid)
                                                                    })
                                                                    .catch(e => {
                                                                        logger.error(`Error getting profile of ${player}: ${e}`)
                                                                    })
                                                            }

                                                            if (this.virtual.currentMode && Object.keys(stats.modes).includes(this.virtual.currentMode)) {
                                                                utils.sameGameMode(uuid, this.client.profile.id, this.virtual.config.account.hypixelApiKey)
                                                                    .then(same => {
                                                                        //logger.debug(`${player} same: ${same}`)
                                                                        if (same) {
                                                                            this.showStats(playerObj)
                                                                        }
                                                                    })
                                                                    .catch(e => {
                                                                        if (e === "offline") {
                                                                            //logger.debug(`${player} offline`)
                                                                            this.showStats(playerObj, true)
                                                                        }
                                                                    })
                                                            }
                                                        })
                                                        .catch(e => {
                                                            logger.error(`Error getting stats of ${player} - ${e}`)
                                                        })
                                                }
                                            })
                                            .catch(e => {
                                                logger.error(`Error getting UUID of ${player}: ${e}`)
                                            })
                                    }
                                })
                                .catch(e => {
                                    logger.error(e)
                                })
                        }
                    }
                }
            }
        }

        if (meta.name === "player_info" && data.action === 0 && data.data[0].properties && this.virtual.inGame) {
            if (data.data[0].UUID && utils.realUUID(data.data[0].UUID) && data.data[0].UUID !== utils.toDashUUID(this.client.profile.id)) {
                //logger.debug(`${data.playerUUID} spawned`)
                const uuid = data.data[0].UUID
                if (!this.sentPlayers.includes(uuid)) {
                    this.sentPlayers.push(uuid)
                    //console.log(this.sentPlayers)
                    utils.uuidToUsername(uuid)
                        .then(name => {
                            utils.sameGameMode(uuid, this.client.profile.id, this.virtual.config.account.hypixelApiKey)
                                .then(same => {
                                    //.debug(`${name} same: ${same}`)
                                    if (same) {
                                        utils.getStats(uuid, this.virtual.config.account.hypixelApiKey)
                                            .then(playerObj => {
                                                //logger.debug(`got stats of ${name}`)
                                                if (this.virtual.currentMode && Object.keys(stats.modes).includes(this.virtual.currentMode)) {
                                                    this.showStats(playerObj)
                                                }
                                            })
                                            .catch(e => {
                                                logger.error(`Error getting stats of ${name} - ${e}`)
                                            })
                                    }
                                })
                                .catch(e => {
                                    if (e === "offline") {
                                        //logger.debug(`${name} offline`)
                                        utils.getStats(uuid, this.virtual.config.account.hypixelApiKey)
                                            .then(playerObj => {
                                                //logger.debug(`got stats of ${name}`)
                                                if (this.virtual.currentMode && Object.keys(stats.modes).includes(this.virtual.currentMode)) {
                                                    this.showStats(playerObj, true)
                                                }
                                            })
                                        //.catch(e => {
                                        //    logger.error(`Error getting stats of ${name} - ${e}`)
                                        //})
                                    }
                                })
                        })
                        .catch(e => {
                            logger.error(`Error converting UUID ${uuid} to username - ${e}`)
                        })
                }
            }
            //fs.appendFileSync("./packetLog2.txt", `==========================\n${new Date().toISOString()}\n${JSON.stringify(meta)}\n${JSON.stringify(data)}\n`)
        }

        return [false, data]
    }

    /**
     * Calculate the stats for the current mode and send them to the client
     * @param stat - Stats object
     * @param maybe - Whether this player is not definitely in the game
     */
    showStats(stat: any, maybe: boolean = false) {
        if (stat === null) {
            utils.sendMessage(this.client, utils.colorText("Nicked Player!", mcColors.RED, true))
        } else {
            const args = [stat]

            const getPath = (path: string) => {
                const p = path.split(".")
                let obj = stat
                for (let _ of p) {
                    obj = obj[_]
                }
                return obj ?? 0
            }

            // use OVERALL if the user wants it and it exists
            let mode

            if (this.virtual.config.stats.overall) {
                mode = this.virtual.currentMode?.split("_")
                if (mode) {
                    mode[mode.length - 1] = "OVERALL"
                    mode = mode.join("_")
                    // @ts-ignore
                    if (!stats.modes[mode]) {
                        mode = this.virtual.currentMode
                    }
                } else {
                    mode = this.virtual.currentMode
                }
            } else {
                mode = this.virtual.currentMode
            }

            // @ts-ignore
            for (const arg of stats.modes[mode].keys) {
                let obj
                if (typeof arg === "object") { // multiple args
                    obj = 0
                    for (const subArg of arg) {
                        obj += getPath(subArg)
                    }
                } else {
                    obj = getPath(arg)
                }
                args.push(obj ?? 0) // make sure you don't get an UNDEFINED in there somewhere
            }

            if (maybe) // use when the opponent has API status disabled, so it just says OFFLINE
                utils.sendMessage(this.client, utils.colorText("!!MAYBE!!", mcColors.RED, true))
            // @ts-ignore
            const m = stats.modes[this.virtual.currentMode].f(this.virtual.config, args)
            for (const _ of m) {
                utils.sendMessage(this.client, _, "hi :)")
            }
        }
    }
}