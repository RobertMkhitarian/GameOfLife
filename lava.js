


var general = require("./general.js")

module.exports = class Lava extends general {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 7;

    }

    getNewCoordinates() {
        super.getNewCoordinates();
    }



    chooseCell(num) {
        this.getNewCoordinates();
       return super.chooseCell(num);
    }

    move() {
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];


            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }


        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }
    }

    eat() {
        var grassCells = super.chooseCell(2);
        var newCell = grassCells[Math.floor(Math.random() * grassCells.length)]

        if (newCell) {

            var newX = newCell[1];
            var newY = newCell[0];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;
            if (this.energy >= 15) {

                this.mul();
                this.energy = 0;
            }
        }
        else {
            this.move();
        }
    }

    mul() {
        var emptyCells = this.chooseCell(1).concat(this.chooseCell(2));
        var newCell = super.random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            var lav = new Lava(newX, newY, 4)
            LavaArr.push(lav)
            this.energy--;

        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i in LavaArr) {
            if (LavaArr[i].x == this.x && LavaArr[i].y == this.y) {
                LavaArr.splice(i, 1)
            }
        }
    }

}