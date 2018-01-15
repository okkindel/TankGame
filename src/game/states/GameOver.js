import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#123'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
    this.buttonCliked = false;
    this.backend_url = 'http://0.0.0.0:6969/api/post_score';
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
    fetch(this.backend_url , {
      method : 'POST',
      body : {nickname : this.game.score.player,
              score: this.game.score.score},
      headers : new Headers({
        'Content-type': 'application/json'
      })}).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));

    let text = this.add.text(this.world.centerX, this.world.centerY - 120, 'Game Over', { font: '110px Sheriff', fill: '#dddddd', align: 'center' })
    let score = this.add.text(this.world.centerX, this.world.centerY + 20, 'Score: ' + this.game.score.score, { font: '25px Sheriff', fill: '#dddddd', align: 'center' })
    let nick = this.add.text(this.world.centerX, this.world.centerY - 30, 'Player: ' + this.game.score.player, { font: '35px Sheriff', fill: '#dddddd', align: 'center' })
    nick.anchor.setTo(0.5, 0.5)
    text.anchor.setTo(0.5, 0.5)
    score.anchor.setTo(0.5, 0.5)
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
