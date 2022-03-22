export interface configInterface {
    account: {
        email: string,
        password: string,
        auth: "mojang" | "microsoft",
        hypixelApiKey: string
    },

    packet: {
        enableMods: boolean,
        deObf: boolean
    },

    modules: {
        packetFilter: boolean,
        playerModule: boolean,
        fpsBoost: boolean,
        betterPing: boolean,
        betterInvis: boolean,
        autoGG: boolean,
        playProtection: boolean,
        autoTip: boolean
    },

    inGameSettings: {
        open: string
    },

    fpsBoost: {
        particles: boolean,
        fireworks: boolean,
        showRedstone: boolean
    },

    betterPing: {
      interval: 5000
    },

    autoGG: {
        message: string[],
        delay: number
    }

    autoTip: {
        interval: number
    }

    stats: {
        overall: boolean,
        wins: string | undefined,
        losses: string | undefined,
        wlr: string | undefined,
        kills: string | undefined,
        fkills: string | undefined,
        deaths: string | undefined,
        fdeaths: string | undefined,
        kdr: string | undefined,
        ws: string | undefined,
        bws: string | undefined,
        fkdr: string | undefined
    },

    other: {
        showCorrectNameAndSkin: boolean,
        requestTimeout: number
    }
}