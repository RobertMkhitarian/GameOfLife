


var a = require("./general.js")

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
        var emptyCells = this.chooseCell(0).concat(this.chooseCell(1));
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

            var newX = newCell[1];
            var newY = newCell[0];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;
            console.log(this.energy);
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
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Lava(newX, newY, 4);
            this.energy--;

        }
    }
    die() {
        console.log("aaaaaaaa")
        matrix[this.y][this.x] = 0;
    }

}