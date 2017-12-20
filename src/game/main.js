import 'pixi.js'
import 'p2' 
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import GameOver from './states/GameOver'
import NextLevel from './states/NextLevel'
import Score from './score'

import config from './config'

export default class extends Phaser.Game {
  constructor() {
    const docElement = document.documentElement;
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth;
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;

    super(width, height, Phaser.CANVAS, 'phaser', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);
    this.state.add('GameOver', GameOver, false);
    this.state.add('NextLevel', NextLevel, false);
    this.score = new Score();

    this.state.start('Boot');
  }
}