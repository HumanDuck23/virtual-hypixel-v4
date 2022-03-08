export interface configInterface {
    account: {
        email: string,
        password: string,
        auth: "mojang" | "microsoft",
        hypixelApiKey: string
    },

    packet: {
        enableMods: boolean,
        particles: boolean,
        deObf: boolean
    },

    modules: {
        packetFilter: boolean,
        playerModule: boolean,
        autoDodge: boolean,
        streamMod: boolean
    },

    inGameSettings: {
        open: string
    }
}