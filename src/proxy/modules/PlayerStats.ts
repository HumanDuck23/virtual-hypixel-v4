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

    constructor(client: Client, virtual: VirtualHypixel) {
        super("Player Stats", "1.0.0", client, virtual);
    }

    onInPacket(meta: PacketMeta, data: any, toServer: Client): [boolean, any] {
        if (meta.name === "scoreboard_team") {
            if (data.team === "§7§k") { // players team
                if (data.mode === 3) { // add players
                    for (const player of data.players) {
                        if (player !== this.client.profile.name) {
                            utils.playerExists(player)
                                .then(exists => {
                                    if (exists) {
                                        //logger.debug(`${player} exists`)
                                        utils.getProfile(player, "name")
                                            .then(profile => {
                                                //this.client?.write("player_info", { action: 0, data: [{ UUID: profile.id, name: profile.name, properties: profile.properties }], gamemode: 2, ping: 100 })
                                                // ^ attempt at making it show the correct skin and stuff lol, thats still a TODO
                                                if (this.virtual.currentMode && Object.keys(stats.modes).includes(this.virtual.currentMode)) {
                                                    utils.sameGameMode(profile.id, this.client.profile.id, this.virtual.config.account.hypixelApiKey)
                                                        .then(same => {
                                                            //logger.debug(`${player} same: ${same}`)
                                                            if (same) {
                                                                this.showStats(profile)
                                                            }
                                                        })
                                                        .catch(e => {
                                                            if (e === "offline") {
                                                                //logger.debug(`${player} offline`)
                                                                this.showStats(profile, true)
                                                            }
                                                        })
                                                }

                                            })
                                            .catch(e => {
                                                logger.error(`Error getting profile of ${player}: ${e}`)
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

        return [false, data]
    }

    /**
     * Calculate the stats for the current mode and send them to the client
     * @param profile - Profile fetched with the utils method
     */
    showStats(profile: any, maybe: boolean = false) {
        utils.getStats(profile.id, this.virtual.config.account.hypixelApiKey)
            .then(r => {
                const args = [r]
                // @ts-ignore
                for (const arg of stats.modes[this.virtual.currentMode].keys) {
                    const p = arg.split(".")
                    let obj = r
                    for (let _ of p) {
                        obj = obj[_]
                    }
                    args.push(obj ?? 0) // make sure you don't get an UNDEFINED in there somewhere
                }
                if (maybe) // use when the opponent has API status disabled, so it just says OFFLINE
                    utils.sendMessage(this.client, utils.colorText("!!MAYBE!!", mcColors.RED, true))
                // @ts-ignore
                utils.sendMessage(this.client, stats.modes[this.virtual.currentMode].f(this.virtual.config, args), "hi :)")
            })
    }
}