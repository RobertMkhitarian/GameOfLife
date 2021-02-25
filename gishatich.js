var general = require("./general.js")

////

module.exports = class Gishatich extends general {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 80;
    }

    getNewCoordinates() {
        super.getNewCoordinates();
    }



    chooseCell(num) {
        this.getNewCoordinates();
        return super.chooseCell(num);
    }

    move() {
        this.energy--;
        var emptyCells = this.chooseCell(0).concat(this.chooseCell(1));
        var newCell = super.random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }

    }


    eat() {
        if (this.energy <= 0) {
            this.die();
        }
        else {
            var grassCells = this.chooseCell(2);
            var newCell = super.random(grassCells);

            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                this.energy += 8;
                if (this.energy >= 8) {
                    // console.log(this.energy);
                    this.mul();
                }
            }
            else {
                this.move();
            }
        }


    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = super.random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Gishatich(newX, newY, 3);
            this.energy = 0;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
    }
}