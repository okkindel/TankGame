import Phaser from 'phaser'
import WebFont from 'webfontloader'
import asset1 from '../assets/button.png'
import loaderBg_img from '../assets/images/loader-bg.png'
import loaderBar_img from '../assets/images/loader-bar.png'

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#123'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
    this.buttonCliked = false;
  }

  preload() {
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    this.load.image('button', asset1)
    this.load.image('loaderBg', loaderBg_img)
    this.load.image('loaderBar', loaderBar_img)
  }

  create() {
    let text = this.add.text(this.world.centerX, this.world.centerY - 100, 'Tank Game', { font: '100px Sheriff', fill: '#fff', align: 'center' })
    text.anchor.setTo(0.5, 0.5)
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
