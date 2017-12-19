export default class Score {
    constructor() {
        this.score = 0;
    }

    addScore(object) {
        this.score += object.points;
        console.log(this.score);
    }

    showScore() {
        return this.score
    }
}