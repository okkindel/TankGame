import Phaser from 'phaser'
import WebFont from 'webfontloader'
import Score from '../score'

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#123'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
    this.buttonCliked = false;

    this.score = new Score();
  }

  preload() {
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    this.load.image('button', './assets/button.png')
  }

  create() {
    console.log(this.score.score);
    let text = this.add.text(this.world.centerX, this.world.centerY - 100, 'Level Complete', { font: '80px Sheriff', fill: '#dddddd', align: 'center' })
    //let score = this.add.text(this.world.centerX, this.world.centerY - 120, Game.points, { font: '20px Sheriff', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)
    //score.anchor.setTo(0.5, 0.5)
    let button = this.game.add.button(this.game.world.centerX - 150, 450, 'button', this.actionOnClick, this, 2, 1, 0);
  }

  render() {
    if (this.buttonCliked) {
      this.state.start('Splash')
    }
  }

  fontsLoaded() {
    this.fontsReady = true
  }


  actionOnClick() {
    this.buttonCliked = true;
  }
}
