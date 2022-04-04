<img src="https://spaghetcodes.best/img/virtual-hypixel/VirtualHypixelBanner.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oxanium&display=swap" rel="stylesheet">

<h2 align="center" style="font-family: 'Oxanium', cursive;">
   What is Virtual Hypixel?
</h2>

Virtual Hypixel is a tool that improves your gameplay on Hypixel! It comes packed with many
features that make your life easier, including a stats mod, and fps booster (kind of) and more.

<h2 align="center" style="font-family: 'Oxanium', cursive;">
   Features
</h2>

<details>
  <summary>Pre-Game Stats</summary>
  <p>Virtual Hypixel shows the stats of your opponents before the game starts (including duels, after the update).</p>
</details>
<br>
<details>
  <summary>AutoGG</summary>
  <p>With most proxies like this AutoGG and other Hypixel mods don't work, so Virtual Hypixel implements its own AutoGG.</p>
</details>
<br>
<details>
  <summary>Better Ping</summary>
  <p>The Better Ping module updates your ping more frequently in-game and counteracts the problem of the ping mod showing 1ms. </p>
</details>
<br>
<details>
  <summary>Custom Commands</summary>
  <p>Virtual Hypixel implements a few custom commands, such as the <code>/sc</code> command for stat checking and <code>/rq</code> to quickly requeue your current game.</p>
</details>
<br>
<details>
  <summary><code>/play</code> Protection</summary>
  <p>Have you ever accidentally run <code>/play</code> while in game? Virtual Hypixel will ask you to confirm the command to avoid leaving the game.</p>
</details>
<br>
<details>
  <summary>Basic FPS Boost</summary>
  <p>The FPS Boosting module can filter out a few things sent by Hypixel to improve FPS.</p>
</details>
<br>
<details>
  <summary>Packet Filter (Lunar Enable)</summary>
  <p>The Packet Filter removes certain packets to enable disabled mods such as Freelook and Autotext.</p>
</details>
<br>
<details>
  <summary>Stream Commands</summary>
  <p>Virtual Hypixel lets you have a /stream ban (/ssb) command to easily get stream rule breakers off your stream parties!</p>
</details>
<br>
<details>
  <summary>Settings (WIP)</summary>
  <p>Virtual Hypixel allows you to change settings in-game with a nice and simple settings window.</p>
</details>


<h2 align="center" style="font-family: 'Oxanium', cursive;">
   How do I use it?
</h2>

Since there is no release yet, you'll have to do a lot of the work yourself to get this running. Here are the steps:

*You'll need to have [NodeJS](https://nodejs.org) and [TypeScript](https://www.typescriptlang.org/)
installed.*

1. Download this repo as a ZIP
2. Extract the ZIP
3. Open CMD in the folder you extracted it to
4. Install the dependencies by typing `npm i`
5. Fill out the config file in `src/config.yaml`
6. Rename `config.yaml` to `config_priv.yaml`
7. Create a file in src: `app.ts`
8. Paste this code in there:
    ```ts
   import { VirtualHypixel } from "./proxy/classes/VirtualHypixel"
    const vh = new VirtualHypixel("./config_priv.yaml")
    vh.start()
    ```
9. Compile all the TypeScript code by typing `tsc` in CMD
10. Run `app.js` with `node app.js`
