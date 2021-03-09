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


    eat() {   
        var emptyCells = super.chooseCell(1)
        var newCell = super.random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            var lav = new Lava(newX, newY, 4)
            LavaArr.push(lav)
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy--;
            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                }
            }

        }
    }


}