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
        autoGG: boolean
    },

    inGameSettings: {
        open: string
    },

    fpsBoost: {
        particles: boolean,
        fireworks: boolean
    },

    betterPing: {
      interval: 5000
    },

    autoGG: {
        message: string[]
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
        showCorrectNameAndSkin: boolean
    }
}