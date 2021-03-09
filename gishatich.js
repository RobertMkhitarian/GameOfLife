var general = require("./general.js")

////


module.exports = class Gishatich extends general {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 12;

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


        if (this.energy <= 0) {
            this.die();
        }
    }

    eat() {
        var grassCells = super.chooseCell(2);
        var newCell = grassCells[Math.floor(Math.random() * grassCells.length)]

        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1)
                }
            }


            this.x = newX;
            this.y = newY;
            this.energy += 5;

            if (this.energy >= 8) {
                this.mul();
            }
        }
        else {
            this.move();
        }
    }

    mul() {
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            var gish = new Gishatich(newX, newY, 3)
            GishatichArr.push(gish)
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 0;
        }

    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in GishatichArr) {
            if (GishatichArr[i].x == this.x && GishatichArr[i].y == this.y) {
                GishatichArr.splice(i, 1)
            }
        }
    }
}




