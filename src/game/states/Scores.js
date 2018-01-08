import Phaser from 'phaser'
import WebFont from 'webfontloader'

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
  }

  create() {

  }

  render() {

  }

  fontsLoaded() {
    this.fontsReady = true
  }
}
