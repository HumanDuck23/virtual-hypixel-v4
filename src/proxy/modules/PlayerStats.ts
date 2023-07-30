import { VirtualHypixel } from "../classes/VirtualHypixel"
import { Client, PacketMeta } from "minecraft-protocol"
import { ModuleBase } from "./base/ModuleBase"
import { logger } from "../../utils/logger"
import { mcColors } from "../data/mcColors"
import { utils } from "../../utils/utils"
import { stats } from "../data/stats"
import { bot_message } from "../../bot_message"
import fs from "fs"

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
        this.sentPlayers = []

        try {
            if (meta.name === "respawn" || (this.virtual.gameStarted && this.tabList.length < 0)) {
                // remove players from tablist
                //logger.debug("TABLIST >> " + JSON.stringify(this.tabList))
                for (const uuid of this.tabList) {

                    let uuid_str = utils.toDashUUID(JSON.stringify(uuid['id']))

                    //logger.debug(uuid_str)
                    // clears packet with UUID of player
                    this.client?.write("player_info", {
                        action: 4, data: [{
                            UUID: uuid_str
                        }]
                    })
                    delete this.tabList[uuid]
                    //logger.debug(`Removed ${uuid['id']} from tablist`)
                    //logger.debug(`TABLIST_PACKET >> ${JSON.stringify(tablist_packet)}`)
                }
            }

            if (meta.name === "scoreboard_team") {
                if (data.team === "§7§k") { // players team
                    if (data.mode === 3) { // add players
                        for (const player of data.players) {
                            if (player !== this.client.profile.name) {
                                utils.playerExists(player, this.virtual.config.other.requestTimeout)
                                    .then(exists => {
                                        if (exists) {
                                            utils.usernameToUUID(player, this.virtual.config.other.requestTimeout)
                                                .then(uuid => {
                                                    if (!this.sentPlayers.includes(uuid)) {
                                                        this.sentPlayers.push(uuid.toString().includes("-") ? uuid : utils.toDashUUID(uuid))
                                                        utils.getStats(uuid, this.virtual.config.account.hypixelApiKey, this.virtual.config.other.requestTimeout)
                                                            .then(playerObj => {
                                                                if (this.virtual.config.other.showCorrectNameAndSkin) {
                                                                    utils.getProfile(player, "name", true, this.virtual.config.other.requestTimeout).then(profile => {
                                                                        let displayName = stats.getPlayerText(playerObj)
                                                                        const rankRegex = /.*(\[.*\]).*/
                                                                        if (rankRegex.exec(displayName) !== null) {
                                                                            // @ts-ignore
                                                                            displayName = displayName.replace(rankRegex.exec(displayName)[1], "")
                                                                            displayName = displayName.replace(" ", "")
                                                                        }

                                                                        // get the display name of the player and add the star to the beginning of the name only if in the skywars gamemode
                                                                        //logger.debug(profile.properties)

                                                                        try {
                                                                            let player_shrt = player.substring(0, 16)
                                                                            logger.debug("PLAYER_SHRT >> " + player_shrt)
                                                                            let player_packet = [
                                                                                "player_info", {
                                                                                    action: 0,
                                                                                    data: [
                                                                                        {
                                                                                            UUID: utils.toDashUUID(uuid),
                                                                                            name: `${player_shrt}`,
                                                                                            properties: profile.properties,
                                                                                            gamemode: 2,
                                                                                            ping: 1
                                                                                        }],
                                                                                }]

                                                                            //logger.debug("PLAYER_PACKET >> " + JSON.stringify(player_packet))
                                                                            // This is where the player is added to the Tablist ingame
                                                                            this.client?.write("player_info", player_packet[1])

                                                                        } catch (e) {
                                                                            logger.error(`Error sending player_info packet: ${e}`)
                                                                        }
                                                                        // ^ attempt at making it show the correct skin and stuff lol, thats still a TODO
                                                                        profile.name = player

                                                                        this.tabList.push(profile)
                                                                        //logger.debug('TABLIST PACKET >> ' + JSON.stringify(this.tabList))
                                                                    }).catch(e => {
                                                                        logger.error(`Error getting profile of ${player}: ${e}`)
                                                                    })
                                                                }

                                                                if (this.virtual.currentMode && Object.keys(stats.modes).includes(this.virtual.currentMode)) {
                                                                    utils.sameGameMode(uuid, this.client.profile.id, this.virtual.config.account.hypixelApiKey, this.virtual.config.other.requestTimeout)
                                                                        .then(same => {
                                                                            logger.debug(`${player} same: ${same}`)
                                                                            if (same) {
                                                                                PlayerStats.showStats(this.client, this.virtual, playerObj)

                                                                                /*
                                                                                USE AS REFERENCE
                                                                                data = [
                                                                                { 
                                                                                    team: '§7§k',
                                                                                    mode: 3,
                                                                                    name: undefined,
                                                                                    friendlyFire: undefined,
                                                                                    nameTagVisibility: undefined,
                                                                                    color: undefined,
                                                                                    players: [ 'SlowRandom' ]
                                                                                    prefix: undefined,
                                                                                    suffix: undefined
                                                                                }
                                                                                ]
                                                                                */
                                                                                var teamName = undefined
                                                                                var customDisplayName = undefined


                                                                                // mode 0 is to create team, mode 1 is to remove team, mode 2 update team info, mode 3 add entities to team (players is username:string, entities is uuid:string), and mode 4 is remove entities from team
                                                                                //logger.debug(`USERNAME >> ${player}`)
                                                                                const sc_data = [
                                                                                    "scoreboard_team", {
                                                                                        team: "",
                                                                                        mode: 3, // add players to team
                                                                                        players: [player] // use username, because its a player
                                                                                    }
                                                                                ]



                                                                                data.team = ''

                                                                                logger.debug(`DATA >> ${JSON.stringify(data)}`)
                                                                                logger.debug(`SC_DATA >> ${JSON.stringify(sc_data)}`)

                                                                                //logger.debug(`DATA >> ${JSON.stringify(data)}`)

                                                                                this.client?.write("scoreboard_team", sc_data[1])
                                                                                //utils.SetTabPlayer(this.client, uuid, player)
                                                                            }
                                                                        })
                                                                        .catch(e => {
                                                                            if (e === "offline") {
                                                                                logger.debug(`${player} offline`)
                                                                                PlayerStats.showStats(this.client, this.virtual, playerObj, true)
                                                                                //utils.SetTabPlayer(this.client, uuid, player)
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                            .catch(e => {
                                                                logger.error(`Error getting stats of ${player} - ${e}`)
                                                            })
                                                    }
                                                    logger.debug(`${player} exists`)
                                                    //make new request to api and save to cache.json
                                                })
                                        }
                                    })
                            }
                        }
                    }
                }
            }

            if (meta.name === "player_info" && data.action === 0 && data.data[0].properties && this.virtual.inGame) {
                if (data.data[0].UUID && utils.realUUID(data.data[0].UUID) && data.data[0].UUID !== utils.toDashUUID(this.client.profile.id)) {
                    const uuid = data.data[0].UUID
                    if (!this.sentPlayers.includes(utils.toDashUUID(uuid))) {
                        //this.sentPlayers.push(uuid.toString().includes("-") ? uuid : utils.toDashUUID(uuid))
                        this.sentPlayers.push(uuid)
                        utils.uuidToUsername(uuid, this.virtual.config.other.requestTimeout)
                            .then(name => {
                                utils.sameGameMode(uuid, this.client.profile.id, this.virtual.config.account.hypixelApiKey, this.virtual.config.other.requestTimeout)
                                    .then(same => {
                                        //.debug(`${name} same: ${same}`)
                                        if (same) {
                                            utils.getStats(uuid, this.virtual.config.account.hypixelApiKey, this.virtual.config.other.requestTimeout)
                                                .then(playerObj => {
                                                    //logger.debug(`got stats of ${name}`)
                                                    if (this.virtual.currentMode && Object.keys(stats.modes).includes(this.virtual.currentMode)) {
                                                        PlayerStats.showStats(this.client, this.virtual, playerObj)
                                                    }
                                                })
                                                .catch(e => {
                                                    logger.error(`Error getting stats of ${name} - ${e}`)
                                                    //continue;
                                                })
                                        }
                                    })
                                    .catch(e => {
                                        if (e === "offline") {
                                            //logger.debug(`${name} offline`)
                                            utils.getStats(uuid, this.virtual.config.account.hypixelApiKey, this.virtual.config.other.requestTimeout)
                                                .then(playerObj => {
                                                    //logger.debug(`got stats of ${name}`)
                                                    if (this.virtual.currentMode && Object.keys(stats.modes).includes(this.virtual.currentMode)) {
                                                        PlayerStats.showStats(this.client, this.virtual, playerObj, true)
                                                    }
                                                })
                                                .catch(e => {
                                                    logger.error(`Error getting stats of ${name} - ${e}`)

                                                })
                                        }
                                    })
                            })
                            .catch(e => {
                                logger.error(`Error converting UUID ${uuid} to username - ${e}`)
                            })
                        //fs.appendFileSync("./packetLog2.txt", `==========================\n${new Date().toISOString()}\n${JSON.stringify(meta)}\n${JSON.stringify(data)}\n`)
                    }

                }

            }

        } catch (e) {
            logger.error(`Error in PlayerStats module: ${e}`)
        }

        return [false, data]
    }


    /**
     * Calculate the stats for the current mode and send them to the client
     * @param client - Client instance
     * @param virtual - Virtual Hypixel instance
     * @param stat - Stats object
     * @param maybe - Whether this player is not definitely in the game
     * @param _mode - Whether to use for a specific mode or use a custom mode
     */
    static showStats(client: Client, virtual: VirtualHypixel, stat: any, maybe: boolean = false, _mode: string = "") {

        function username_parse(message: any) {
            try {
                let message_parsed = message.replace(/§[0-9A-FK-OR]/gi, "")
                /*
                
     
                var re = /\[(.*?)\]/g;
                // if messageparse has brackets then dont add any, but if the first element in the array is not a bracket then insert a new element at the start of the array
                if (message_parsed?.find((e: string) => re.test(e))) {
                    
                } else {
                    message_parsed.unshift("[NON]")
                }
                */

                // after parse >> [11❤] [VIP] Trifer -  - K: 5009 - D: 4666 - K/D: 1.07

                let usernamematch = message_parsed.match(/[A-Za-z0-9]+/g)
                if (usernamematch == null) usernamematch = ["unknown"]
                //logger.debug("username_FUNCTION >> " + usernamematch)
                return usernamematch[1].toString();
            }
            catch (e) {
                //(e)
            }
        }

        if (stat === null) {
            utils.sendMessage(client, utils.colorText("Nicked Player!", mcColors.RED, true))
            //const dismessage = new bot_message("Nicked Player!")
            //dismessage.sendMessage();
        } else {
            //logger.debug(stat)
            const args = [stat]

            const getPath = (path: string) => {
                const p = path.split(".")
                let obj = stat
                for (let _ of p) {
                    if (obj) {
                        obj = obj[_]
                    } else {
                        obj = 0
                        break
                    }
                }
                return obj ?? 0
            }

            // use OVERALL if the user wants it and it exists
            const useMode = (_mode === "" ? virtual.currentMode : _mode)
            let mode

            if (virtual.config.stats.overall && _mode === "") {
                mode = useMode?.split("_")
                if (mode) {
                    mode[mode.length - 1] = "OVERALL"
                    mode = mode.join("_")
                    // @ts-ignore
                    if (!stats.modes[mode]) {
                        mode = useMode
                    }
                } else {
                    mode = useMode
                }
            } else {
                mode = useMode
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

            if (_mode === "") {
                if (!virtual.gameStarted) {
                    if (maybe) // use when the opponent has API status disabled, so it just says OFFLINE
                        utils.sendMessage(client, utils.colorText("!!MAYBE!!", mcColors.RED, true))
                    // sends tabplayerstats to discord bot in the bot_message.ts file
                    //const dismessage = new bot_message("!!MAYBE!!")
                    //dismessage.sendMessage();
                    // @ts-ignore
                    const m = stats.modes[useMode].f(virtual.config, args)
                    for (const _ of m) {
                        //§f§c§l>>§r §7[§f8★§7] §7Edgar_Dodo§r -  - §aK: 1279§r - §cD: 2509§r - §9K/D: 0.51§r§r
                        //remove all the formatting codes from _ variable
                        const username_ = username_parse(_)
                        //logger.debug(username_)
                        utils.sendMessage(client, _, `https://plancke.io/hypixel/player/stats/${username_}`, `https://plancke.io/hypixel/player/stats/${username_}`)

                        // sends tabplayerstats to discord bot in the bot_message.ts file
                        const dismessage = new bot_message(_)

                        //logger.debug(useMode.toString())
                        dismessage.sendMessage(useMode.toString());
                    }
                }
            } else {
                if (maybe) // use when the opponent has API status disabled, so it just says OFFLINE
                    utils.sendMessage(client, utils.colorText(`PLAYER HAS THEIR API DISABLED`, mcColors.RED, true))
                //const dismessage = new bot_message("API disabled")
                //dismessage.sendMessage();
                // @ts-ignore
                const m = stats.modes[useMode].f(virtual.config, args)
                for (const _ of m) {
                    const username_ = username_parse(_)
                    utils.sendMessage(client, _, `https://plancke.io/hypixel/player/stats/${username_}`)
                    const dismessage = new bot_message(_)
                    //logger.debug(useMode.toString())
                    dismessage.sendMessage(useMode.toString());
                }
            }
        }
    }
}


