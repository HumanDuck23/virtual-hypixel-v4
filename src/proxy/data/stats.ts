import { configInterface } from "../interfaces/configInterface"
import { utils } from "../../utils/utils"
import { mcColors } from "./mcColors"
import {bwPrestiges} from "./bwPrestiges";

const overallBridge = {
    // @ts-ignore
    f: function (config: configInterface, args: any[]) {
        // @ts-ignore
        return stats.winsLossesWinstreakBestWinstreak(config, ...args)
    },
    keys: [
        [
            "stats.Duels.bridge_duel_wins",
            "stats.Duels.bridge_doubles_wins",
            "stats.Duels.bridge_threes_wins",
            "stats.Duels.bridge_four_wins",
            "stats.Duels.bridge_2v2v2v2_wins",
            "stats.Duels.bridge_3v3v3v3_wins",
            "stats.Duels.capture_threes_wins"
        ],
        [
            "stats.Duels.bridge_duel_losses",
            "stats.Duels.bridge_doubles_losses",
            "stats.Duels.bridge_threes_losses",
            "stats.Duels.bridge_four_losses",
            "stats.Duels.bridge_2v2v2v2_losses",
            "stats.Duels.bridge_3v3v3v3_losses",
            "stats.Duels.capture_threes_losses"
        ],
        "stats.Duels.current_bridge_winstreak",
        "stats.Duels.best_bridge_winstreak",
    ]
}

const overallBw = {
    // @ts-ignore
    f: function (config: configInterface, args: any[]) {
        // @ts-ignore
        return stats.starWinsLossesFKDRBBLRWS(config, ...args)
    },
    keys: [
        "achievements.bedwars_level",
        "stats.Bedwars.wins_bedwars",
        "stats.Bedwars.losses_bedwars",
        "stats.Bedwars.final_kills_bedwars",
        "stats.Bedwars.final_deaths_bedwars",
        "stats.Bedwars.beds_broken_bedwars",
        "stats.Bedwars.beds_lost_bedwars",
        "stats.Bedwars.winstreak"
    ]
}

export const stats = {
    modes: {
        /*

        DUELS MODES

         */
        "DUELS_SUMO_DUEL": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.sumo_duel_wins",
                "stats.Duels.sumo_duel_losses",
                "stats.Duels.current_sumo_winstreak",
                "stats.Duels.best_sumo_winstreak",
            ]
        },
        "DUELS_BRIDGE_DUEL": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.bridge_duel_wins",
                "stats.Duels.bridge_duel_losses",
                "stats.Duels.current_bridge_winstreak",
                "stats.Duels.best_bridge_winstreak",
            ]
        },
        "DUELS_BRIDGE_DOUBLES": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.bridge_doubles_wins",
                "stats.Duels.bridge_doubles_losses",
                "stats.Duels.current_winstreak_mode_bridge_doubles",
                "stats.Duels.best_winstreak_mode_bridge_doubles",
            ]
        },
        "DUELS_BRIDGE_THREES": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.bridge_threes_wins",
                "stats.Duels.bridge_threes_losses",
                "stats.Duels.current_winstreak_mode_bridge_threes",
                "stats.Duels.best_winstreak_mode_bridge_threes",
            ]
        },
        "DUELS_BRIDGE_FOUR": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.bridge_four_wins",
                "stats.Duels.bridge_four_losses",
                "stats.Duels.current_winstreak_mode_bridge_four",
                "stats.Duels.best_winstreak_mode_bridge_four",
            ]
        },
        "DUELS_BRIDGE_2V2V2V2": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.bridge_2v2v2v2_wins",
                "stats.Duels.bridge_2v2v2v2_losses",
                "stats.Duels.current_winstreak_mode_bridge_2v2v2v2",
                "stats.Duels.best_winstreak_mode_bridge_2v2v2v2",
            ]
        },
        "DUELS_BRIDGE_3V3V3V3": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.bridge_3v3v3v3_wins",
                "stats.Duels.bridge_3v3v3v3_losses",
                "stats.Duels.current_winstreak_mode_bridge_3v3v3v3",
                "stats.Duels.best_winstreak_mode_bridge_3v3v3v3",
            ]
        },
        "DUELS_BRIDGE_OVERALL": overallBridge,
        "DUELS_CAPTURE_THREES": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.capture_threes_wins",
                "stats.Duels.capture_threes_losses",
                "stats.Duels.best_winstreak_mode_capture_threes",
                "stats.Duels.best_winstreak_mode_capture_threes",
            ]
        },
        "DUELS_CAPTURE_OVERALL": overallBridge,
        "DUELS_UHC_DUEL": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.uhc_duel_wins",
                "stats.Duels.uhc_duel_losses",
                "stats.Duels.current_winstreak_mode_uhc_duel",
                "stats.Duels.best_winstreak_mode_uhc_duel",
            ]
        },
        "DUELS_UHC_DOUBLES": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.uhc_doubles_wins",
                "stats.Duels.uhc_doubles_losses",
                "stats.Duels.current_winstreak_mode_uhc_doubles",
                "stats.Duels.best_winstreak_mode_uhc_doubles",
            ]
        },
        "DUELS_UHC_FOUR": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.uhc_four_wins",
                "stats.Duels.uhc_four_losses",
                "stats.Duels.current_winstreak_mode_uhc_four",
                "stats.Duels.best_winstreak_mode_uhc_four",
            ]
        },
        "DUELS_UHC_MEETUP": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.uhc_meetup_wins",
                "stats.Duels.uhc_meetup_losses",
                "stats.Duels.current_winstreak_mode_uhc_meetup",
                "stats.Duels.best_winstreak_mode_uhc_meetup",
            ]
        },
        "DUELS_UHC_OVERALL": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                [
                    "stats.Duels.uhc_duel_wins",
                    "stats.Duels.uhc_doubles_wins",
                    "stats.Duels.uhc_four_wins",
                    "stats.Duels.uhc_meetup_wins"
                ],
                [
                    "stats.Duels.uhc_duel_losses",
                    "stats.Duels.uhc_doubles_losses",
                    "stats.Duels.uhc_four_losses",
                    "stats.Duels.uhc_meetup_losses",
                ],
                "stats.Duels.current_uhc_winstreak",
                "stats.Duels.best_uhc_winstreak",
            ]
        },
        "DUELS_OP_DUEL": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.op_duel_wins",
                "stats.Duels.op_duel_losses",
                "stats.Duels.current_winstreak_mode_op_duel",
                "stats.Duels.best_winstreak_mode_op_duel",
            ]
        },
        "DUELS_SW_DUEL": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.sw_duel_wins",
                "stats.Duels.sw_duel_losses",
                "stats.Duels.current_winstreak_mode_sw_duel",
                "stats.Duels.best_winstreak_mode_sw_duel",
            ]
        },
        "DUELS_SW_DOUBLES": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.sw_doubles_wins",
                "stats.Duels.sw_doubles_losses",
                "stats.Duels.current_winstreak_mode_sw_double",
                "stats.Duels.best_winstreak_mode_sw_doubles",
            ]
        },
        "DUELS_SW_OVERALL": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                [
                    "stats.Duels.sw_duel_wins",
                    "stats.Duels.sw_doubles_wins",
                ],
                [
                    "stats.Duels.sw_duel_losses",
                    "stats.Duels.sw_doubles_losses",
                ],
                "stats.Duels.current_skywars_winstreak",
                "stats.Duels.best_skywars_winstreak",
            ]
        },
        "DUELS_CLASSIC_DUEL": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.classic_duel_wins",
                "stats.Duels.classic_duel_losses",
                "stats.Duels.current_winstreak_mode_classic_duel",
                "stats.Duels.best_winstreak_mode_classic_duel",
            ]
        },
        "DUELS_BOW_DUEL": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.bow_duel_wins",
                "stats.Duels.bow_duel_losses",
                "stats.Duels.current_winstreak_mode_bow_duel",
                "stats.Duels.best_winstreak_mode_bow_duel",
            ]
        },
        "DUELS_BLITZ_DUEL": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.blitz_duel_wins",
                "stats.Duels.blitz_duel_losses",
                "stats.Duels.current_winstreak_mode_blitz_duel",
                "stats.Duels.best_winstreak_mode_blitz_duel",
            ]
        },
        "DUELS_BOWSPLEEF_DUEL": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.bowspleef_duel_wins",
                "stats.Duels.bowspleef_duel_losses",
                "stats.Duels.current_winstreak_mode_bowspleef_duel",
                "stats.Duels.best_winstreak_mode_bowspleef_duel",
            ]
        },
        "DUELS_PARKOUR_EIGHT": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.parkour_eight_wins",
                "stats.Duels.parkour_eight_losses",
                "stats.Duels.current_winstreak_mode_parkour_eight",
                "stats.Duels.best_winstreak_mode_parkour_eight",
            ]
        },
        "DUELS_BOXING_DUEL": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.boxing_duel_wins",
                "stats.Duels.boxing_duel_losses",
                "stats.Duels.current_winstreak_mode_boxing_duel",
                "stats.Duels.best_winstreak_mode_boxing_duel",
            ]
        },
        "DUELS_POTION_DUEL": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.potion_duel_wins",
                "stats.Duels.potion_duel_losses",
                "stats.Duels.current_winstreak_mode_potion_duel",
                "stats.Duels.best_winstreak_mode_potion_duel",
            ]
        },
        "DUELS_MW_DUEL": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.mw_duel_wins",
                "stats.Duels.mw_duel_losses",
                "stats.Duels.current_winstreak_mode_mw_duel",
                "stats.Duels.best_winstreak_mode_mw_duel",
            ]
        },
        "DUELS_MW_DOUBLES": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.mw_doubles_wins",
                "stats.Duels.mw_doubles_losses",
                "stats.Duels.current_winstreak_mode_mw_double",
                "stats.Duels.best_winstreak_mode_mw_doubles",
            ]
        },
        "DUELS_MW_OVERALL": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                [
                    "stats.Duels.mw_duel_wins",
                    "stats.Duels.mw_doubles_wins"
                ],
                [
                    "stats.Duels.mw_duel_losses",
                    "stats.Duels.mw_doubles_losses"
                ],
                "stats.Duels.current_mega_walls_winstreak",
                "stats.Duels.best_mega_walls_winstreak",
            ]
        },
        "DUELS_COMBO_DUEL": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.winsLossesWinstreakBestWinstreak(config, ...args)
            },
            keys: [
                "stats.Duels.combo_duel_wins",
                "stats.Duels.combo_duel_losses",
                "stats.Duels.current_winstreak_mode_combo_duel",
                "stats.Duels.best_winstreak_mode_combo_duel",
            ]
        },
        /*

        BEDWARS MODES

         */
        "BEDWARS_EIGHT_ONE": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.starWinsLossesFKDRBBLRWS(config, ...args)
            },
            keys: [
                "achievements.bedwars_level",
                "stats.Bedwars.wins_bedwars",
                "stats.Bedwars.losses_bedwars",
                "stats.Bedwars.final_kills_bedwars",
                "stats.Bedwars.final_deaths_bedwars",
                "stats.Bedwars.beds_broken_bedwars",
                "stats.Bedwars.beds_lost_bedwars",
                "stats.Bedwars.eight_one_winstreak"
            ]
        },
        "BEDWARS_EIGHT_TWO": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.starWinsLossesFKDRBBLRWS(config, ...args)
            },
            keys: [
                "achievements.bedwars_level",
                "stats.Bedwars.wins_bedwars",
                "stats.Bedwars.losses_bedwars",
                "stats.Bedwars.final_kills_bedwars",
                "stats.Bedwars.final_deaths_bedwars",
                "stats.Bedwars.beds_broken_bedwars",
                "stats.Bedwars.beds_lost_bedwars",
                "stats.Bedwars.eight_two_winstreak"
            ]
        },
        "BEDWARS_EIGHT_OVERALL": overallBw,
        "BEDWARS_FOUR_THREE": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.starWinsLossesFKDRBBLRWS(config, ...args)
            },
            keys: [
                "achievements.bedwars_level",
                "stats.Bedwars.wins_bedwars",
                "stats.Bedwars.losses_bedwars",
                "stats.Bedwars.final_kills_bedwars",
                "stats.Bedwars.final_deaths_bedwars",
                "stats.Bedwars.beds_broken_bedwars",
                "stats.Bedwars.beds_lost_bedwars",
                "stats.Bedwars.four_three_winstreak"
            ]
        },
        "BEDWARS_FOUR_FOUR": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.starWinsLossesFKDRBBLRWS(config, ...args)
            },
            keys: [
                "achievements.bedwars_level",
                "stats.Bedwars.wins_bedwars",
                "stats.Bedwars.losses_bedwars",
                "stats.Bedwars.final_kills_bedwars",
                "stats.Bedwars.final_deaths_bedwars",
                "stats.Bedwars.beds_broken_bedwars",
                "stats.Bedwars.beds_lost_bedwars",
                "stats.Bedwars.four_four_winstreak"
            ]
        },
        "BEDWARS_FOUR_OVERALL": overallBw,
        "BEDWARS_TWO_FOUR": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.starWinsLossesFKDRBBLRWS(config, ...args)
            },
            keys: [
                "achievements.bedwars_level",
                "stats.Bedwars.wins_bedwars",
                "stats.Bedwars.losses_bedwars",
                "stats.Bedwars.final_kills_bedwars",
                "stats.Bedwars.final_deaths_bedwars",
                "stats.Bedwars.beds_broken_bedwars",
                "stats.Bedwars.beds_lost_bedwars",
                "stats.Bedwars.two_four_winstreak"
            ]
        },
        //"BEDWARS_TWO_OVERALL": overallBw,
        /*

        SKYWARS MODES

         */
        "solo_normal": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.swkillsDeathsWinsLosses(config, ...args)
            },
            //player: any, kills: any, deaths: any, wins: any, losses: any, ws: any, bws: any
            keys: [
                "stats.SkyWars.levelFormatted",
                "stats.SkyWars.kills_solo_normal",
                "stats.SkyWars.deaths_solo_normal",
                "stats.SkyWars.wins_solo_normal",
                "stats.SkyWars.losses_solo_normal"
                
            ]
        },
        "teams_normal": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.swkillsDeathsWinsLosses(config, ...args)
            },
            //player: any, kills: any, deaths: any, wins: any, losses: any, ws: any, bws: any
            keys: [
                "stats.SkyWars.levelFormatted",
                "stats.SkyWars.kills_team_normal",
                "stats.SkyWars.deaths_team_normal",
                "stats.SkyWars.wins_team_normal",
                "stats.SkyWars.losses_team_normal"
                
            ]
        },
        "teams_insane": {
            // @ts-ignore
            f: function (config: configInterface, args: any[]) {
                // @ts-ignore
                return stats.swkillsDeathsWinsLosses(config, ...args)
            },
            //player: any, kills: any, deaths: any, wins: any, losses: any, ws: any, bws: any
            keys: [
                "stats.SkyWars.levelFormatted",
                "stats.SkyWars.kills_team_insane",
                "stats.SkyWars.deaths_team_insane",
                "stats.SkyWars.wins_team_insane",
                "stats.SkyWars.losses_team_insane"
                
            ]
        }
    },

    winsLossesWinstreakBestWinstreak(config: configInterface, player: any, wins: any, losses: any, ws: any, bws: any) {
        const bar = utils.colorText(">>", mcColors.RED, true, false, false, false, false)

        const w = utils.colorText(`W: ${wins}`, this.getColor(config.stats.wins ?? "GREEN", mcColors.GREEN))
        const l = utils.colorText(`L: ${losses}`, this.getColor(config.stats.losses ?? "RED", mcColors.RED))
        const wlr = utils.colorText(`W/L: ${(parseInt(wins) / (parseInt(losses) !== 0 ? parseInt(losses) : 1)).toFixed(2)}`, this.getColor(config.stats.wlr ?? "BLUE", mcColors.BLUE))

        const wsT =  utils.colorText(`WS: ${ws}`, this.getColor(config.stats.ws ?? "LIGHT_PURPLE", mcColors.LIGHT_PURPLE))
        const bwsT =  utils.colorText(`BWS: ${bws}`, this.getColor(config.stats.bws ?? "DARK_PURPLE", mcColors.DARK_PURPLE))

        return [utils.colorText(`${bar} ${this.getPlayerText(player)} - ${w} - ${l} - ${wlr} - ${wsT} - ${bwsT}`, mcColors.WHITE)]
    },

    starWinsLossesKDRWS(config: configInterface, player: any, star: any, wins: any, losses: any, kills: any, deaths: any, ws: any) {

    },

    starWinsLossesFKDRBBLRWS(config: configInterface, player: any, star: any, wins: any, losses: any, fkills: any, fdeaths: any, bb: any, bl: any, ws: any) {
        const bar = utils.colorText(">>", mcColors.RED, true, false, false, false, false)

        const w = utils.colorText(`W: ${wins}`, this.getColor(config.stats.wins ?? "GREEN", mcColors.GREEN))
        const l = utils.colorText(`L: ${losses}`, this.getColor(config.stats.losses ?? "RED", mcColors.RED))
        const wlr = utils.colorText(`W/L: ${(parseInt(wins) / (parseInt(losses) !== 0 ? parseInt(losses) : 1)).toFixed(2)}`, this.getColor(config.stats.wlr ?? "BLUE", mcColors.BLUE))

        const fk = utils.colorText(`FK: ${fkills}`, this.getColor(config.stats.fkills ?? "GREEN", mcColors.GREEN))
        const fkdr = utils.colorText(`W/L: ${(parseInt(fkills) / (parseInt(fdeaths) !== 0 ? parseInt(fdeaths) : 1)).toFixed(2)}`, this.getColor(config.stats.fkdr ?? "BLUE", mcColors.BLUE))

        const bbT = utils.colorText(`Beds: ${bb}`, this.getColor(config.stats.fkills ?? "GREEN", mcColors.GREEN))
        const bblr = utils.colorText(`BB/L: ${(parseInt(bb) / (parseInt(bl) !== 0 ? parseInt(bl) : 1)).toFixed(2)}`, this.getColor(config.stats.fkdr ?? "BLUE", mcColors.BLUE))


        const wsT =  utils.colorText(`WS: ${ws}`, this.getColor(config.stats.ws ?? "LIGHT_PURPLE", mcColors.LIGHT_PURPLE))

        const starT = this.colorStar(parseInt(star.toString()))

        return [utils.colorText(`${bar} ${this.getPlayerText(player)} - ${starT} - ${w} - ${l} - ${wlr}`, mcColors.WHITE), utils.colorText(`${bar} ${fk} - ${fkdr} - ${bbT} - ${bblr} - ${wsT}`, mcColors.WHITE)]
    },

    killsDeathsWinsLossesWinstreakBestWinstreak(config: configInterface, player: any, kills: any, deaths: any, wins: any, losses: any, ws: any, bws: any) {
        // some good method naming right there
        const bar = utils.colorText(">>", mcColors.RED, true, false, false, false, false)

        const w = utils.colorText(`W: ${wins}`, this.getColor(config.stats.wins ?? "GREEN", mcColors.GREEN))
        const l = utils.colorText(`L: ${losses}`, this.getColor(config.stats.losses ?? "RED", mcColors.RED))
        const wlr = utils.colorText(`W/L: ${(parseInt(wins) / (parseInt(losses) !== 0 ? parseInt(losses) : 1)).toFixed(2)}`, this.getColor(config.stats.wlr ?? "BLUE", mcColors.BLUE))

        const k = utils.colorText(`K: ${kills}`, this.getColor(config.stats.kills ?? "GREEN", mcColors.GREEN))
        const d = utils.colorText(`D: ${deaths}`, this.getColor(config.stats.deaths ?? "RED", mcColors.RED))
        const kdr = utils.colorText(`K/D: ${(parseInt(kills) / (parseInt(deaths) !== 0 ? parseInt(deaths) : 1)).toFixed(2)}`, this.getColor(config.stats.kdr ?? "BLUE", mcColors.BLUE))

        const wsT =  utils.colorText(`WS: ${ws}`, this.getColor(config.stats.ws ?? "LIGHT_PURPLE", mcColors.LIGHT_PURPLE))
        const bwsT =  utils.colorText(`BWS: ${bws}`, this.getColor(config.stats.bws ?? "DARK_PURPLE", mcColors.DARK_PURPLE))

        return [utils.colorText(`${bar} ${this.getPlayerText(player)} - ${w} - ${l} - ${wlr} - ${k} - ${d} - ${kdr} - ${wsT} - ${bwsT}`, mcColors.WHITE)]
    },
    // Skywars KDR Card, supports colored stars!
    swkillsDeathsWinsLosses(config: configInterface, player: any, star: any, kills: any, deaths: any, wins: any, losses: any) {
        // Pylons added this :D
        const bar = utils.colorText(">>", mcColors.RED, true, false, false, false, false)

        const w = utils.colorText(`W: ${wins}`, this.getColor(config.stats.wins ?? "GREEN", mcColors.GREEN))
        const l = utils.colorText(`L: ${losses}`, this.getColor(config.stats.losses ?? "RED", mcColors.RED))
        const wlr = utils.colorText(`W/L: ${(parseInt(wins) / (parseInt(losses) !== 0 ? parseInt(losses) : 1)).toFixed(2)}`, this.getColor(config.stats.wlr ?? "BLUE", mcColors.BLUE))

        const k = utils.colorText(`K: ${kills}`, this.getColor(config.stats.kills ?? "GREEN", mcColors.GREEN))
        const d = utils.colorText(`D: ${deaths}`, this.getColor(config.stats.deaths ?? "RED", mcColors.RED))
        const kdr = utils.colorText(`K/D: ${(parseInt(kills) / (parseInt(deaths) !== 0 ? parseInt(deaths) : 1)).toFixed(2)}`, this.getColor(config.stats.kdr ?? "BLUE", mcColors.BLUE))
        
        return [utils.colorText(`${bar} §7[${star.toString()}§7] ${this.getPlayerText(player)} -  - ${k} - ${d} - ${kdr}`, mcColors.WHITE)]
    },


    getPlayerText(player: any) {
        if (player.monthlyPackageRank === "SUPERSTAR") {
            // @ts-ignore
            return utils.colorText(`[MVP${utils.colorTextCustomReset("++", mcColors[player.rankPlusColor ?? "RED"], mcColors.GOLD)}] ${player.displayname}`, mcColors.GOLD)
        } else if (player.newPackageRank) {
            if (player.newPackageRank === "VIP" || player.newPackageRank === "VIP_PLUS") {
                return utils.colorText(`[VIP${player.newPackageRank === "VIP_PLUS" ? utils.colorTextCustomReset("+", mcColors.GOLD, mcColors.GREEN) : ""}] ${player.displayname}`, mcColors.GREEN)
            } else if (player.newPackageRank === "MVP" || player.newPackageRank === "MVP_PLUS") {
                // @ts-ignore
                return utils.colorText(`[MVP${player.newPackageRank === "MVP_PLUS" ? utils.colorTextCustomReset("+", mcColors[player.rankPlusColor ?? "RED"], mcColors.AQUA) : ""}] ${player.displayname}`, mcColors.AQUA)
            }
        }
        return utils.colorText(player.displayname, mcColors.GRAY)
    },

    colorStar(star: number): string {
        const icons = ["✫", "✪", "⚝"]
        let icon = ""

        let prestige: string[] | number = star.toString().split("")
        prestige[prestige.length - 1] = "0"
        prestige[prestige.length - 2] = "0"
        prestige = parseInt(prestige.join("")) + 100

        if (prestige < 1100) {
            icon = icons[0]
        } else if (prestige < 2100) {
            icon = icons[1]
        } else {
            icon = icons[2]
        }

        // @ts-ignore
        const colors = bwPrestiges[prestige]
        const toColor = `[${star}${icon}]`

        let t = ""

        if (colors.length === 1) {
            t = utils.colorText(toColor, colors[0])
        } else {
            for (let [i, char] of toColor.split("").entries()) {
                t += utils.colorText(char, colors[i])
            }
        }


        return t
    },

    getColor(color: string, other: mcColors): mcColors {
        // @ts-ignore
        if (mcColors[color] !== undefined) {
            // @ts-ignore
            return mcColors[color]
        }

        return other
    }
}