class general {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
    }
}


class Grass extends general {
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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


class GrassEater extends general {
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
            [this.x + 1, this.y + 1]
        ];
    }



    chooseCell(num) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push(this.directions[i]);
                }
                else {
                    var obj = matrix[y][x];
                    if (obj.index == num) {
                        found.push(this.directions[i]);
                    }
                }
            }
        }
        return found;
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



class Gishatich extends general {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 80;
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
            [this.x + 1, this.y + 1]
        ];
    }



    chooseCell(num) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push(this.directions[i]);
                }
                else {
                    var obj = matrix[y][x];
                    if (obj.index == num) {
                        found.push(this.directions[i]);
                    }
                }
            }
        }
        return found;
    }

    move() {
        this.energy--;
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

    }


    eat() {
        if (this.energy <= 0) {
            this.die();
        }
        else {
            var grassCells = this.chooseCell(2);
            var newCell = random(grassCells);

            if (newCell) {
                console.log(11);
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
        var newCell = random(emptyCells);

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



class Lava extends general {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 7;

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
            [this.x + 1, this.y + 1]
        ];
    }



    chooseCell(num) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push(this.directions[i]);
                }
                else {
                    var obj = matrix[y][x];
                    if (obj.index == num) {
                        found.push(this.directions[i]);
                    }
                }
            }
        }
        return found;
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








class LavaUtox extends general {
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push(this.directions[i]);
                }
                else {
                    var obj = matrix[y][x];
                    if (obj.index == num) {
                        found.push(this.directions[i]);
                    }
                }
            }
        }
        return found;
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


