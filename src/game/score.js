export default class Score {
    constructor() {
        this.score = 0;
    }

    addScore(object) {
        this.score += object.points;
    }

    addStaticScore(variable) {
        this.score += variable;
    }

    resetScore() {
        this.score = 0;
    }
}