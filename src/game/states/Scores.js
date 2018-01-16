import Phaser from 'phaser'
import WebFont from 'webfontloader'
import button from '../assets/button.png'
import loaderBg_img from '../assets/images/loader-bg.png'
import loaderBar_img from '../assets/images/loader-bar.png'

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#123'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
    this.buttonCliked = false;
    modal.style.display = "none";
  }

  preload() {
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    this.load.image('button', button)
    this.load.image('loaderBg', loaderBg_img)
    this.load.image('loaderBar', loaderBar_img)
    this.game.score.resetScore();
  }

  create() {
    let button = this.game.add.button(this.game.world.centerX - 150, 500, 'button', this.actionOnClick, this, 2, 1, 0);
  }

  render() {
    if (this.buttonCliked) {
      this.state.start('Splash')
      if (this.game.score.player == 'guest')
        modal.style.display = "block";
    }
  }

  fontsLoaded() {
    this.fontsReady = true
  }
  actionOnClick() {
    this.buttonCliked = true;
  }
  actionScores() {
    this.scoresClicked = true;
  }
}
