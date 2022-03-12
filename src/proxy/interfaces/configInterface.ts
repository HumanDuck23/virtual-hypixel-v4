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
        fpsBoost: boolean
    },

    inGameSettings: {
        open: string
    },

    fpsBoost: {
        particles: boolean,
        fireworks: boolean
    },

    stats: {
        wins: string | undefined,
        losses: string | undefined,
        wlr: string | undefined,
        kills: string | undefined,
        deaths: string | undefined,
        kdr: string | undefined,
        ws: string | undefined,
        bws: string | undefined
    }
}