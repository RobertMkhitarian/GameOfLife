var general = require("./general.js")

////


module.exports = class GrassEater extends general {
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
        var grassCells = super.chooseCell(1);
        var newCell = grassCells[Math.floor(Math.random() * grassCells.length)]

        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            for (var i in grassArr) {
				if (grassArr[i].x == newX && grassArr[i].y == newY) {
					grassArr.splice(i, 1)
				}
			}

            this.x = newX;
            this.y = newY;
            this.energy+=5;

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

        if(newCell){
            var newX = newCell[0];
            var newY = newCell[1];
            var grEater = new GrassEater(newX, newY, 2)
            grassEaterArr.push(grEater)
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 0;
        }
        
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in grassEaterArr) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1)
            }
        }
    }
}




