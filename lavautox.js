var a = require("./general.js")

module.exports = class LavaUtox extends general {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 8;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],

            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2],

            [this.x - 3, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
            [this.x - 3, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 3, this.y + 3]
        ];
    }



    chooseCell(num) {
        this.getNewCoordinates();
        return super.chooseCell(num);
    }

    move() {
        var emptyCells = this.chooseCell(1).concat(this.chooseCell(2)).concat(this.chooseCell(3)).concat(this.chooseCell(4)).concat(this.chooseCell(0));
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }

        this.energy--; 4
        // if (this.energy <= 0) {
        //     this.die();
        // }
    }

    eat() {
        var grassCells = this.chooseCell(4);
        var newCell = random(grassCells);

        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy += 2;

            // if (this.energy >= 8) {
            //     // console.log(this.energy);
            //     this.mul();
            // }
        }
        else {
            this.move();
        }
    }

    // mul() {
    //     var emptyCells = this.chooseCell(0);
    //     var newCell = random(emptyCells);

    //     if (newCell) {
    //         var newX = newCell[0];
    //         var newY = newCell[1];
    //         this.energy--;
    //         matrix[newY][newX] = new LavaUtox(newX, newY, 5);
    //         this.energy = 0;
    //     }
    // }

    // die() {
    //     matrix[this.y][this.x] = 0;
    // }
}