var general = require("./general.js")

////


module.exports = class LavaUtox extends general {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 42;//12

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
        var grassCells = super.chooseCell(4);
        var newCell = grassCells[Math.floor(Math.random() * grassCells.length)]

        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            for (var i in  LavaArr) {
				if ( LavaArr[i].x == newX &&  LavaArr[i].y == newY) {
                    LavaArr.splice(i, 1)
				}
			}

            this.x = newX;
            this.y = newY;
            this.energy+=5;

            if (this.energy >= 14) {
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
            var lutox = new LavaUtox(newX, newY, 5)
            LavaUtoxArr.push(lutox)
            matrix[newCell[1]][newCell[0]] = 5;
            this.energy = 0;
        }
        
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in LavaUtoxArr) {
            if (LavaUtoxArr[i].x == this.x && LavaUtoxArr[i].y == this.y) {
                LavaUtoxArr.splice(i, 1)
            }
        }
    }
}




