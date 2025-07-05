import Boot from "./states/Boot.js";
import Preload from "./states/Preload.js";
import Game from "./states/Game.js";

const game = new Phaser.Game(660, 630, Phaser.CANVAS, '', null);

game.state.add("Boot", Boot);
game.state.add("Preload", Preload);
game.state.add("Game", Game);

game.state.start("Boot");
