var a = require("./general.js");

////

module.exports = class Grass extends general {
    constructor(x, y, index) {
        super(x, y, index)
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];


    }


    chooseCell(num) {
     return super.chooseCell(num);
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0).concat(this.chooseCell(4));
        var newCell = random(emptyCells);
        // console.log(newCell)

        if (newCell && this.multiply >= 6) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = new Grass(newX, newY, 1);


            this.multiply = 0;
        }
    }
}