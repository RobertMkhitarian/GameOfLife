// var general = require("./general.js")

// module.exports = class LavaUtox extends general {
//     constructor(x, y, index) {
//         super(x, y, index)
//         this.energy = 8;
//     }

//     getNewCoordinates() {
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1],

//             [this.x - 2, this.y - 2],
//             [this.x, this.y - 2],
//             [this.x + 2, this.y - 2],
//             [this.x - 2, this.y],
//             [this.x + 2, this.y],
//             [this.x - 2, this.y + 2],
//             [this.x, this.y + 2],
//             [this.x + 2, this.y + 2],

//             [this.x - 3, this.y - 3],
//             [this.x, this.y - 3],
//             [this.x + 3, this.y - 3],
//             [this.x - 3, this.y],
//             [this.x + 3, this.y],
//             [this.x - 3, this.y + 3],
//             [this.x, this.y + 3],
//             [this.x + 3, this.y + 3]
//         ];
//     }



//     chooseCell(num) {
//         this.getNewCoordinates();
//         return super.chooseCell(num);
//     }

// //     move() {
// //         var emptyCells =super.chooseCell(0);
// // 		var newCell = super.random(emptyCells);
        

// //         if (newCell) {
// //             var newX = newCell[0];
// //             var newY = newCell[1];

// //             matrix[newY][newX] = matrix[this.y][this.x];
// //             matrix[this.y][this.x] = 0; //0

// //             this.x = newX;
// //             this.y = newY;
// //         }

// //         // if (this.energy <= 0) {
// //         //     this.die();
// //         // }
// //     }

// //     eat() {
// //         var grassCells = super.chooseCell(4);
// // 		var newCell = grassCells[Math.floor(Math.random() * grassCells.length)]

// //         if (newCell) {

// //             var newX = newCell[0];
// //             var newY = newCell[1];

// //             matrix[newY][newX] = matrix[this.y][this.x];
// //             matrix[this.y][this.x] = 0; //0
// //             for (var i in  LavaArr) {
// // 				if ( LavaArr[i].x == newX &&  LavaArr[i].y == newY) {
// //                     LavaArr.splice(i, 1)
// // 				}
// // 			}

// //             this.x = newX;
// //             this.y = newY;


// //             // if (this.energy >= 8) {
// //             //     // console.log(this.energy);
// //             //     this.mul();
// //             // }
// //         }
// //         else {
// //             this.move();
// //         }
// //     }

// //     // mul() {
// //     //     var emptyCells = this.chooseCell(0);
// //     //     var newCell = random(emptyCells);

// //     //     if (newCell) {
// //     //         var newX = newCell[0];
// //     //         var newY = newCell[1];
// //     //         this.energy--;
// //     //         matrix[newY][newX] = new LavaUtox(newX, newY, 5);
// //     //         this.energy = 0;
// //     //     }
// //     // }

// //     // die() {
// //     //     matrix[this.y][this.x] = 0;
// //     //     for (let i in LavaUtoxArr) {
// //     //         if (LavaUtoxArr[i].x == this.x &&LavaUtoxArr[i].y == this.y) {
// //     //             LavaUtoxArr.splice(i, 1)
// //     //         }
// //     //     }
// //     // }
// // }


// move() {
//     let emptyCells = this.chooseCell(0,1,2,3);
//     let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
//     if (newCell) {
//         var newX = newCell[0];
//         var newY = newCell[1];

//         matrix[newY][newX] = matrix[this.y][this.x];
//         matrix[this.y][this.x] = 0;//

//         this.x = newX;
//         this.y = newY;
//     }

// }

// eat() {
//     var grassCells = this.chooseCell(4);
//     var newCell = grassCells[Math.floor(Math.random() * grassCells.length)]

//     if (newCell) {

//         var newX = newCell[0];
//         var newY = newCell[1];

//         matrix[newY][newX] = matrix[this.y][this.x];
//         matrix[this.y][this.x] = 0;//

//         for (var i in LavaArr) {
//             if (LavaArr[i].x == newX && LavaArr[i].y == newY) {
//                LavaArr.splice(i, 1)
//             }
//         }

//         this.x = newX;
//         this.y = newY;

//     }
//     else {
//         this.move();
//     }
// }
// }
















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




