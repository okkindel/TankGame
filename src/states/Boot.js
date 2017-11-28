import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#123'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
    this.buttonCliked = false;
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY - 100, 'Tank Game', { font: '100px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)
    let button = game.add.button(game.world.centerX - 95, 400, 'button', this.actionOnClick, this, 2, 1, 0);

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
  }

  render () {
    if (this.buttonCliked) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }


 actionOnClick () {
  
      this.buttonCliked = true;
  
  }
}
