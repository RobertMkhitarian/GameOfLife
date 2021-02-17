var a = require("./general.js")

////


module.exports = class GrassEater extends general {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 8;

    }


    getNewCoordinates() {
        super.getNewCoordinates();
    }



    chooseCell(num) {
        this.getNewCoordinates();
        return super.chooseCell(num);
    }

    move() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

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
        var grassCells = this.chooseCell(1);
        var newCell = random(grassCells);

        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy += 2;

            if (this.energy >= 8) {
                // console.log(this.energy);
                this.mul();
            }
        }
        else {
            this.move();
        }
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            this.energy--;
            matrix[newY][newX] = new GrassEater(newX, newY, 2);
            this.energy = 0;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
    }
}