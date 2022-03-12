import { configInterface } from "../interfaces/configInterface"
import { utils } from "../../utils/utils"
import { mcColors } from "./mcColors"

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
        }
    },

    winsLossesWinstreakBestWinstreak(config: configInterface, player: any, wins: any, losses: any, ws: any, bws: any) {
        const bar = utils.colorText("II", mcColors.DARK_BLUE, false, false, false, false, true)

        const w = utils.colorText(`Wins: ${wins}`, this.getColor(config.stats.wins ?? "GREEN", mcColors.GREEN))
        const l = utils.colorText(`Losses: ${losses}`, this.getColor(config.stats.losses ?? "RED", mcColors.RED))
        const wlr = utils.colorText(`W/L: ${(parseInt(wins) / (parseInt(losses) !== 0 ? parseInt(losses) : 1)).toFixed(2)}`, this.getColor(config.stats.wlr ?? "BLUE", mcColors.BLUE))

        const wsT =  utils.colorText(`WS: ${ws}`, this.getColor(config.stats.ws ?? "LIGHT_PURPLE", mcColors.LIGHT_PURPLE))
        const bwsT =  utils.colorText(`BWS: ${bws}`, this.getColor(config.stats.bws ?? "DARK_PURPLE", mcColors.DARK_PURPLE))

        return utils.colorText(`${bar} ${this.getPlayerText(player)} - ${w} - ${l} - ${wlr} - ${wsT} - ${bwsT}`, mcColors.WHITE)
    },

    killsDeathsWinsLossesWinstreakBestWinstreak(config: configInterface, player: any, kills: any, deaths: any, wins: any, losses: any, ws: any, bws: any) {
        // some good method naming right there
        const bar = utils.colorText("II", mcColors.DARK_BLUE, false, false, false, false, true)

        const w = utils.colorText(`Wins: ${wins}`, this.getColor(config.stats.wins ?? "GREEN", mcColors.GREEN))
        const l = utils.colorText(`Losses: ${losses}`, this.getColor(config.stats.losses ?? "RED", mcColors.RED))
        const wlr = utils.colorText(`W/L: ${(parseInt(wins) / (parseInt(losses) !== 0 ? parseInt(losses) : 1)).toFixed(2)}`, this.getColor(config.stats.wlr ?? "BLUE", mcColors.BLUE))

        const k = utils.colorText(`Kills: ${kills}`, this.getColor(config.stats.kills ?? "GREEN", mcColors.GREEN))
        const d = utils.colorText(`Deaths: ${deaths}`, this.getColor(config.stats.deaths ?? "RED", mcColors.RED))
        const kdr = utils.colorText(`K/D: ${(parseInt(kills) / (parseInt(deaths) !== 0 ? parseInt(deaths) : 1)).toFixed(2)}`, this.getColor(config.stats.kdr ?? "BLUE", mcColors.BLUE))

        const wsT =  utils.colorText(`WS: ${ws}`, this.getColor(config.stats.ws ?? "LIGHT_PURPLE", mcColors.LIGHT_PURPLE))
        const bwsT =  utils.colorText(`BWS: ${bws}`, this.getColor(config.stats.bws ?? "DARK_PURPLE", mcColors.DARK_PURPLE))

        return utils.colorText(`${bar} ${this.getPlayerText(player)} - ${w} - ${l} - ${wlr} - ${k} - ${d} - ${kdr} - ${wsT} - ${bwsT}`, mcColors.WHITE)
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

    getColor(color: string, other: mcColors): mcColors {
        // @ts-ignore
        if (mcColors[color] !== undefined) {
            // @ts-ignore
            return mcColors[color]
        }

        return other
    }
}