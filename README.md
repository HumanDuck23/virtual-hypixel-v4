# Virtual Hypixel (v4)
V4 of [Virtual Hypixel](https://github.com/HumanDuck23/virtual-hypixel).

---


██╗░░░██╗██╗██████╗░████████╗██╗░░░██╗░█████╗░██╗░░░░░
██║░░░██║██║██╔══██╗╚══██╔══╝██║░░░██║██╔══██╗██║░░░░░
╚██╗░██╔╝██║██████╔╝░░░██║░░░██║░░░██║███████║██║░░░░░
░╚████╔╝░██║██╔══██╗░░░██║░░░██║░░░██║██╔══██║██║░░░░░
░░╚██╔╝░░██║██║░░██║░░░██║░░░╚██████╔╝██║░░██║███████╗
░░░╚═╝░░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░░╚═════╝░╚═╝░░╚═╝╚══════╝

██╗░░██╗██╗░░░██╗██████╗░██╗██╗░░██╗███████╗██╗░░░░░
██║░░██║╚██╗░██╔╝██╔══██╗██║╚██╗██╔╝██╔════╝██║░░░░░
███████║░╚████╔╝░██████╔╝██║░╚███╔╝░█████╗░░██║░░░░░
██╔══██║░░╚██╔╝░░██╔═══╝░██║░██╔██╗░██╔══╝░░██║░░░░░
██║░░██║░░░██║░░░██║░░░░░██║██╔╝╚██╗███████╗███████╗
╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░░░░╚═╝╚═╝░░╚═╝╚══════╝╚══════╝

---

### Some of the cool stuff:

- Pre-Game Stats
- FPS Boost
- Nice in-game settings menu
- Re-enable disabled mods such as freelook

### TODO

- [x] FPS Boost
- [x] Packet Filter
- [x] In Game Settings


- Pre-Game Stats
  - [x] All Duels Modes
  - [x] Bedwars
  - [ ] Skywars
  - [ ] Maybe some more...

### How do I use it?

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