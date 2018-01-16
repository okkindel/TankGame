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

    fetch('http://localhost:6969/api/high_scores', {
      method: 'GET', // or 'PUT'
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
      .then(response => {
        this.users = response;
        this.show_scores();
      })
      .catch(error => {
        this.actionOnClick();
      })
  }

  constructor() {
    super();
  }

  create() {
    let button = this.game.add.button(this.game.world.centerX - 150, 520, 'button', this.actionOnClick, this, 2, 1, 0);
  }

  show_scores() {
    let text = this.add.text(this.world.centerX, this.world.centerY - 240, 'Highscores', { font: '100px Sheriff', fill: '#fff', align: 'center' })
    text.anchor.setTo(0.5, 0.5)
    let i = 0;
    for (let key in this.users) {
      let text = this.add.text(300, 250 + 50 * i, i + '.              ' + this.users[i].nick + ':  ' + this.users[i].score,
        { font: '20px', fill: '#fff', align: 'center' })
      text.anchor.setTo(0, 0.5)
      i += 1
    }
  }

  render() {
    if (this.buttonCliked) {
      if (this.game.score.player == 'guest')
        modal.style.display = "block";
      this.state.start('Splash')
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
