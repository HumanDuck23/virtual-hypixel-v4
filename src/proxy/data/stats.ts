import { utils } from "../../utils/utils"
import { mcColors } from "./mcColors"

export const stats = {
    modes: {
      "DUELS_SUMO_DUEL": {
          // @ts-ignore
          f: function (args: any[]) {
              // @ts-ignore
              return stats.winsLossesWinstreakBestWinstreak(...args)
          },
          keys: [
              "stats.Duels.sumo_duel_wins",
              "stats.Duels.sumo_duel_losses",
              "stats.Duels.current_sumo_winstreak",
              "stats.Duels.best_sumo_winstreak",
          ]
      }
    },

    winsLossesWinstreakBestWinstreak(player: any, wins: any, losses: any, ws: any, bws: any) {
        const bar = utils.colorText("II", mcColors.DARK_BLUE, false, false, false, false, true)

        const w = utils.colorText(`Wins: ${wins}`, mcColors.GREEN)
        const l = utils.colorText(`Losses: ${losses}`, mcColors.RED)
        const wlr = utils.colorText(`W/L: ${parseInt(wins) / (parseInt(losses) !== 0 ? parseInt(losses) : 1)}`, mcColors.BLUE)

        const wsT =  utils.colorText(`WS: ${ws}`, mcColors.LIGHT_PURPLE)
        const bwsT =  utils.colorText(`BWS: ${bws}`, mcColors.DARK_PURPLE)

        return utils.colorText(`${bar} ${this.getPlayerText(player)} - ${w} - ${l} - ${wlr} - ${wsT} - ${bwsT}`, mcColors.WHITE)
    },

    killsDeathsWinsLossesWinstreakBestWinstreak(player: any, kills: any, deaths: any, wins: any, losses: any, ws: any, bws: any) {
        // some good method naming right there
        const bar = utils.colorText("II", mcColors.DARK_BLUE, false, false, false, false, true)

        const w = utils.colorText(`Wins: ${wins}`, mcColors.GREEN)
        const l = utils.colorText(`Losses: ${losses}`, mcColors.RED)
        const wlr = utils.colorText(`W/L: ${parseInt(wins) / (parseInt(losses) !== 0 ? parseInt(losses) : 1)}`, mcColors.BLUE)

        const k = utils.colorText(`Kills: ${kills}`, mcColors.GREEN)
        const d = utils.colorText(`Deaths: ${deaths}`, mcColors.RED)
        const kdr = utils.colorText(`K/D: ${parseInt(kills) / (parseInt(deaths) !== 0 ? parseInt(deaths) : 1)}`, mcColors.BLUE)

        const wsT =  utils.colorText(`WS: ${ws}`, mcColors.LIGHT_PURPLE)
        const bwsT =  utils.colorText(`BWS: ${bws}`, mcColors.DARK_PURPLE)

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
}