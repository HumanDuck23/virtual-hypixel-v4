import { EmbedBuilder } from "discord.js";
import { utils } from "./utils/utils"
import { logger } from "./utils/logger";
import { configInterface } from "./proxy/interfaces/configInterface"
import YAML from "yaml"

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const config = YAML.parse(fs.readFileSync("./config_priv.yaml").toString())

const token = config.other.discordbotToken as string;

//const { token } = require('./token/token.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(((file: { endsWith: (arg0: string) => { (): any; new(): any; toString: { (): any; new(): any; }; }; }) => file.endsWith('.js').toString()));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        logger.debug(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}


client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c: { user: { tag: any; }; }) => {
    logger.debug(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

export class bot_message {
    constructor(public message: string) {
        this.message = message;
    }
    
    //config.other.discordingamechat
    sendlobby(guildid: string) {
        let channel = client.channels.cache.get(guildid);
        channel.send(this.message)
    }

    async ingamechat(ingamechatid: string, user_gamemode: string) {
        //logger.debug(jsonchat)
        let channel = client.channels.cache.get(ingamechatid);
        //1037546036748632136
        let lobby_channel = client.channels.cache.get(config.other.discordingamechat);

        // split jsonchat using | into an array
        let lobby = user_gamemode
        let message_packet = this.message


        //logger.debug("L >> " + lobby + " | " + message_packet)
        try {
            var V_V = message_packet.replace("was killed by", '').replace("was shot by", '').replace(".", '')
            //logger.debug(V_V)
            if(message_packet === undefined){
                return
            } if(message_packet === ''){
                return
            }
            if (message_packet.includes("was killed by") || message_packet.includes("was shot by")) {
                var v = V_V.split(" ")
                const winner = v[2]
                const loser = v[0]

                const fetch_uuid = async () => {
                    try {
                        const uuid = await utils.usernameToUUID(winner, 1000);
                        return uuid;
                    } catch (err) {
                        logger.debug(err);
                        return '8667ba71b85a4004af54457a9734eed7';
                    }
                }
                const player_uuid = await fetch_uuid()

                logger.debug(`winner = ${winner}, loser = ${loser}`)

                /*
                const playerEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(`${lobby}`)
                    .setDescription(`${loser} was killed by ${winner}!`)
                    .addFields({ name: '\u200b', value: '\u200b' })
                    .setTimestamp()
                    .setFooter({ text: 'crndg_client', iconURL: 'https://images.halloweencostumes.com/products/43866/1-1/adult-mens-corndog-costume.jpg' });
    
                lobby_channel.send({ embeds: [playerEmbed] })
                */
                let playerEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(`${winner}`)
                    .addFields(
                        {name : "WINNER", value: `${winner}`, inline: true},
                        {name : "LOSER", value: `${loser}`, inline: true}
                    )
                    //https://crafatar.com/renders/head/5d6eab327cb84e87a41556f09fba09b3
                    .setThumbnail(`https://crafatar.com/renders/head/${player_uuid.toString()}`)
                    .addFields({ name: '\u200b', value: '\u200b' })
                    .setTimestamp()
                    .setFooter({ text: 'crndg_client', iconURL: 'https://images.halloweencostumes.com/products/43866/1-1/adult-mens-corndog-costume.jpg' });

                    lobby_channel.send({ embeds: [playerEmbed] })
            }  else {
            }
            // send regular discord message if message_packet is not a duel kill message
        } catch (error) {
            logger.debug(error)
        }
       

        // when the message packet includes all hypixel duel kill messages, then return the packet


        /*
        const playerEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`${lobby}`)
            .setDescription(`${message_packet}`)
            .addFields({ name: '\u200b', value: '\u200b' })
            .setTimestamp()
            .setFooter({ text: 'crndg_client', iconURL: 'https://images.halloweencostumes.com/products/43866/1-1/adult-mens-corndog-costume.jpg' });
        
        channel.send({ embeds: [playerEmbed] })
        */

        /*
        let channel = client.channels.cache.get('ingamechatid');
        const playerEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`${rank} ${username}`)
            .addFields(
                { name: 'Wins', value: `${Wins}`, inline: true },
                { name: 'Losses', value: `${Losses}`, inline: true },
                { name: 'W_L', value: `${W_L}`, inline: true },
                { name: 'WS', value: `${WS}`, inline: true },
                { name: 'BWS', value: `${BWS}`, inline: true },
            )
            //https://crafatar.com/renders/head/5d6eab327cb84e87a41556f09fba09b3
            .setThumbnail(`https://crafatar.com/renders/head/${player_uuid.toString()}`)
            .addFields({ name: '\u200b', value: '\u200b' })
            .setTimestamp()
            .setFooter({ text: 'crndg_client', iconURL: 'https://images.halloweencostumes.com/products/43866/1-1/adult-mens-corndog-costume.jpg' });

        channel.send({ embeds: [playerEmbed] })
        */
    }

    /**
     * Send a message to the client
     * expect this text when parsing --> §f§c§l>>§r §7[§611❤§7] §a[VIP] Trifer§r -  - §aK: 5009§r - §cD: 4666§r - §9K/D: 1.07§r§r
     * @param messag - yeeeeeeeeeah the message bois
     */
    async sendMessage(mode_game: string) {
        //const re = /\xA7[0-9A-FK-OR]/gi; <-- removes minecraft color formatting
        //logger.debug(this.message)
        // message for pylons: §f§c§l>>§r §b[MVP§0+§b] Pylons§r - §aW: 1521§r - §cL: 595§r - §9W/L: 2.56§r - §dWS: 5§r - §5BWS: 55§r§r
        let message_parsed = this.message.replace(/§[0-9A-FK-OR]/gi, "")

        // after parse >> [11❤] [VIP] Trifer -  - K: 5009 - D: 4666 - K/D: 1.07

        var messageparse = message_parsed.replace("- ", "").replace("-", "").replace("K/D: ", "").replace("K: ", "").replace("D: ", "").replace(">> ", "").replace("  ", " ").split(" ");

        messageparse = messageparse.filter(function (el) {
            return el != '-';
        });

        //logger.debug(messageparse)

        //logger.debug(mode_game)

        // regex to extract anything between brackets
        var re = /\[(.*?)\]/g;
        // if messageparse has brackets then dont add any, but if the first element in the array is not a bracket then insert a new element at the start of the array
        if (messageparse.some(e => re.test(e))) {
        } else {
            messageparse.unshift("[NON]")
        }

        if (mode_game == "DUELS_SUMO_DUEL") {
            // For Sumo Duels message parse will look something like this: ['[MVP+]', 'ConwayTech', 'W:', '199', 'L:', '663',  '-', 'W/L:', '0.30', '-', 'WS:',  '0',  '-', 'BWS:', '4']
            // rank is the first element in the array [0]
            // username is the second element in the array [1]
            // the Win symbol is the third element in the array [2]
            // the Wins is the fourth element in the array [3]
            // the Loss symbol is the fifth element in the array [4]
            // the Losses is the sixth element in the array [5]
            // the seperator is the seventh element in the array [6]
            // the W/L symbol is the eighth element in the array [7]
            // the W/L is the ninth element in the array [8]
            // the seperator is the tenth element in the array [9]
            // the WS symbol is the eleventh element in the array [10]
            // the WS is the twelth element in the array [11]
            // the seperator is the thirteenth element in the array [12]
            // the Best WS symbol is the fourteenth element in the array [13]
            // the Best WS is the fifteenth element in the array [14]
            let rank = messageparse[0]
            let username = messageparse[1]
            let Wins = messageparse[3]
            let Losses = messageparse[5]
            let W_L = messageparse[7]
            let WS = messageparse[11]
            let BWS = messageparse[14]

            const fetch_uuid = async () => {
                try {
                    const uuid = await utils.usernameToUUID(username, 1000);
                    return uuid;
                } catch (err) {
                    logger.debug(err);
                    return '8667ba71b85a4004af54457a9734eed7';
                }
            }
            const player_uuid = await fetch_uuid()

            if (this.message == "Nicked Player!") {
                let channel = client.channels.cache.get(config.other.discordingamechat);
                channel.send(`got nicked player!`)
            }
            if (this.message == "!!MAYBE!!") {
                let channel = client.channels.cache.get(config.other.discordingamechat);
                channel.send(`api disabled?`)
            }
            if (this.message == 'API disabled') {
                let channel = client.channels.cache.get(config.other.discordingamechat);
                channel.send(`api disabled?`)
            }
            else {
                let channel = client.channels.cache.get(config.other.discordingamechat);
                const playerEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(`${rank} ${username}`)
                    .addFields(
                        { name: 'Wins', value: `${Wins}`, inline: true },
                        { name: 'Losses', value: `${Losses}`, inline: true },
                        { name: 'W_L', value: `${W_L}`, inline: true },
                        { name: 'WS', value: `${WS}`, inline: true },
                        { name: 'BWS', value: `${BWS}`, inline: true },

                    )
                    //https://crafatar.com/renders/head/5d6eab327cb84e87a41556f09fba09b3
                    .setThumbnail(`https://crafatar.com/renders/head/${player_uuid.toString()}`)
                    .addFields({ name: '\u200b', value: '\u200b' })
                    .setTimestamp()
                    .setFooter({ text: 'crndg_client', iconURL: 'https://images.halloweencostumes.com/products/43866/1-1/adult-mens-corndog-costume.jpg' });

                channel.send({ embeds: [playerEmbed] })
            }
        }
        else if (mode_game == "DUELS_SW_DUEL") {
            // For SW Duels message parse will look something like this: ['[NON]', 'crankyj', 'W:', '1418', 'L:', '2106', '-', 'W/L:', '0.67',  '-', 'WS:',  '0', '-',  'BWS:', '9']
            // username
            let rank = messageparse[0]
            let username = messageparse[1]
            let Wins = messageparse[3]
            let Losses = messageparse[5]
            let W_L = messageparse[8]
            let WS = messageparse[11]
            let BWS = messageparse[14]

            const fetch_uuid = async () => {
                try {
                    const uuid = await utils.usernameToUUID(username, 1000);
                    return uuid;
                } catch (err) {
                    logger.debug(err);
                    return '8667ba71b85a4004af54457a9734eed7';
                }
            }
            const player_uuid = await fetch_uuid()

            if (this.message == "Nicked Player!") {
                let channel = client.channels.cache.get(config.other.discordingamechat);
                channel.send(`got nicked player!`)
            }
            if (this.message == "!!MAYBE!!") {
                let channel = client.channels.cache.get(config.other.discordingamechat);
                channel.send(`api disabled?`)
            }
            if (this.message == 'API disabled') {
                let channel = client.channels.cache.get(config.other.discordingamechat);
                channel.send(`api disabled?`)
            }
            else {
                let channel = client.channels.cache.get(config.other.discordingamechat);
                const playerEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(`${rank} ${username}`)
                    .addFields(
                        { name: 'Wins', value: `${Wins}`, inline: true },
                        { name: 'Losses', value: `${Losses}`, inline: true },
                        { name: 'W_L', value: `${W_L}`, inline: true },
                        { name: 'WS', value: `${WS}`, inline: true },
                        { name: 'BWS', value: `${BWS}`, inline: true },
                    )
                    .setThumbnail(`https://crafatar.com/renders/head/${player_uuid.toString()}`)
                    .addFields({ name: '\u200b', value: '\u200b' })
                    .setTimestamp()
                    .setFooter({ text: 'crndg_client', iconURL: 'https://images.halloweencostumes.com/products/43866/1-1/adult-mens-corndog-costume.jpg' });

                channel.send({ embeds: [playerEmbed] })
            }
        }
        else if (mode_game == "DUELS_SW_OVERALL") {
            /*messageparse for pylons: 
            [ '[MVP+]', 'Pylons', 'W:', '1521', 'L:','595', 'W/L:',   '2.56', 'WS:',    '5', 'BWS:',   '55']
            */

            // For SW Duels message parse will look something like this: ['[NON]', 'crankyj', 'W:', '1418', 'L:', '2106', '-', 'W/L:', '0.67',  '-', 'WS:',  '0', '-',  'BWS:', '9']
            // username
            let rank = messageparse[0]
            let username = messageparse[1]
            let Wins = messageparse[3]
            let Losses = messageparse[5]
            let W_L = messageparse[7]
            let WS = messageparse[9]
            let BWS = messageparse[11]

            const fetch_uuid = async () => {
                try {
                    const uuid = await utils.usernameToUUID(username, 1000);
                    return uuid;
                } catch (err) {
                    logger.debug(err);
                    return '8667ba71b85a4004af54457a9734eed7';
                }
            }
            const player_uuid = await fetch_uuid()

            if (this.message == "Nicked Player!") {
                let channel = client.channels.cache.get(config.other.discordingamechat);
                channel.send(`got nicked player!`)
            }
            if (this.message == "!!MAYBE!!") {
                let channel = client.channels.cache.get(config.other.discordingamechat);
                channel.send(`api disabled?`)
            }
            if (this.message == 'API disabled') {
                let channel = client.channels.cache.get(config.other.discordingamechat);
                channel.send(`api disabled?`)
            }
            else {
                let channel = client.channels.cache.get(config.other.discordingamechat);
                const playerEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(`${rank} ${username} - Duels SW Overall`)
                    .addFields(
                        { name: 'Wins', value: `${Wins}`, inline: true },
                        { name: 'Losses', value: `${Losses}`, inline: true },
                        { name: 'W_L', value: `${W_L}`, inline: true },
                        { name: 'WS', value: `${WS}`, inline: true },
                        { name: 'BWS', value: `${BWS}`, inline: true },
                    )
                    .setThumbnail(`https://crafatar.com/renders/head/${player_uuid.toString()}`)
                    .addFields({ name: '\u200b', value: '\u200b' })
                    .setTimestamp()
                    .setFooter({ text: 'crndg_client', iconURL: 'https://images.halloweencostumes.com/products/43866/1-1/adult-mens-corndog-costume.jpg' });

                channel.send({ embeds: [playerEmbed] })
            }
        }
        else {
            let star = messageparse[0]
            let rank = messageparse[1]
            let username = messageparse[2]
            let Kills = messageparse[4]
            let Deaths = messageparse[6]
            let KDR = messageparse[8]
            if (this.message == "Nicked Player!") {
                let channel = client.channels.cache.get(config.other.discordingamechat);
                channel.send(`got nicked player!`)
            }
            if (this.message == "!!MAYBE!!") {
                let channel = client.channels.cache.get(config.other.discordingamechat);
                channel.send(`api disabled?`)
            }
            if (this.message == 'API disabled') {
                let channel = client.channels.cache.get(config.other.discordingamechat);
                channel.send(`api disabled?`)
            }
            else {
                const fetch_uuid = async () => {
                    try {
                        const uuid = await utils.usernameToUUID(username, 1000);
                        return uuid;
                    } catch (err) {
                        logger.debug(err);
                        return '8667ba71b85a4004af54457a9734eed7';
                    }
                }
                const player_uuid = await fetch_uuid()

                let channel = client.channels.cache.get(config.other.discordingamechat);
                const playerEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(`${star} ${rank} ${username}`)
                    .addFields(
                        { name: 'Kills', value: `${Kills}`, inline: true },
                        { name: 'Deaths', value: `${Deaths}`, inline: true },
                        { name: 'KDR', value: `${KDR}`, inline: true },
                    )
                    .setThumbnail(`https://crafatar.com/renders/head/${player_uuid.toString()}`)
                    .addFields({ name: '\u200b', value: '\u200b' })
                    .setTimestamp()
                    .setFooter({ text: 'crndg_client', iconURL: 'https://images.halloweencostumes.com/products/43866/1-1/adult-mens-corndog-costume.jpg' });

                channel.send({ embeds: [playerEmbed] })
            }
        }


        //let UUID = utils.usernameToUUID(username)



    }
    //send message to channel 1132900528049901658

}



/* at the top of your file
const { EmbedBuilder } = require('discord.js');

// inside a command, event listener, etc.
const playerEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Player - stats')
    .setDescription('{star}[11❤]  {username simple}[VIP] Trifer ')
    .setThumbnail('https://crafatar.com/avatars/${UUID} ec67c9217f72471ba7a5ebad4ceb3808')
    .addFields(
        { name: 'Kills', value: '${kills} 5009', inline: true },
        { name: 'Deaths', value: '${deaths} 4666', inline: true },
        { name: 'KDR', value: '${kdr} 1.07', inline: true },
    )
    .addFields({ name: '\u200b', value: '\u200b' })
    .setTimestamp()
    .setFooter({ text: 'crndg_client', iconURL: 'https://images.halloweencostumes.com/products/43866/1-1/adult-mens-corndog-costume.jpg' });

channel.send({ embeds: [playerEmbed] });
*/