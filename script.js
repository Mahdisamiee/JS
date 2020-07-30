// let box = {
//   color: "green",
//   position: 1,
//   clickme() {
//     document.querySelector(".green").addEventListener("click", (event) => {
//       console.log(
//         "this is " + this.position + " box and its color is " + this.color
//       );
//     });
//   },
// };

// box.clickme();
// //output:>> this is 1 box and its color is green.

// Destructuring

// let obj = {
//   name : "hasan",
//   lastname: "sami",
//   age: 61
// }

// const {name, lastname, age} = obj;

// console.log(name, lastname, age)
// "hasan"  "sami" 61

// function func(year) {
//   let name = "mahdi";
//   let date = new Date().getFullYear();

//   return [name, date - year];
// }

// const [name, age] = func(1999);
// console.log(name, age);

// // mahdi 21

// Array
// let nodeList = document.querySelectorAll('.box');
// //ES6
// let arr2= Array.from(nodeList)
// // or
// let arr3 = [...arr];
// // (3) [div.box.green, div.box.blue, div.box.orange]

// let arr = [10, 11, 13, 14, 18, 21, 20, 16];;

// // for find index of a value that have some condition
// arr.findIndex((cur)=> cur >= 18) // the indexof first value that is greather or equal to 18.
// arr.find((cur)=> cur >= 18) // the first value of arr that is greater that 18.
// let map = new Map();
// Map.prototype.myfunc = function () {
//   for (let [key, value] of this.entries()) {
//     if (typeof key === "number") {
//       console.log(`answer ${key} : ${value}`);
//     }
//   }
// };

// map.set("question", "what is your favorite app?");
// map.set(1, "its not your biusnise");
// map.set(2, "fuck you");
// map.set(3, "ffdf");
// // map.set('question', 'what is your favorite app?')
// map.myfunc();

// function Person5(name, lastname) {
//   this.name = name;
//   this.lastname = lastname;
// }

// Person5.prototype.m2 = function () {
//   console.log("hey2");
// };

// let obj = new Person5("mahi", "samieenai");

/**
 * coding challange
 */

// class TownBuilding {
//   constructor(name, buildYear) {
//     this.name = name;
//     this.buildYear = buildYear;
//   }
// }

// class Park extends TownBuilding {
//   constructor(name, buildYear, treesNum, parkArea) {
//     super(name, buildYear);
//     this.treesNum = treesNum;
//     this.parkArea = parkArea;
//   }

//   treeDensity() {
//     return this.treesNum / this.parkArea;
//   }
// }

// class Street extends TownBuilding {
//   constructor(name, buildYear, length, size = "normal") {
//     super(name, buildYear);
//     this.length = length;
//     this.size = size;
//   }
// }

// let park1 = new Park("shohada", "1999", 200, 1);
// let park2 = new Park("laleh", "1990", 2000, 8);
// let park3 = new Park("pirmard", "2003", 10, 0.5);

// let street1 = new Street("imam khomeiny", "1970", 2, "big");
// let street2 = new Street("20 metry", "1985", 1.5);
// let street3 = new Street("shahid beheshti", "1990", 1.7, "big");
// let street4 = new Street("asli", "1999", 3, "huge");

// function report() {
//   let parkMap = new Map();
//   parkMap.set(1, park1);
//   parkMap.set(2, park2);
//   parkMap.set(3, park3);

//   let streetMap = new Map();
//   streetMap.set(1, street1);
//   streetMap.set(2, street2);
//   streetMap.set(3, street3);
//   streetMap.set(4, street4);

//   parkReport(parkMap);
//   streetReport(streetMap);
// }

// function parkReport(map) {
//   console.log("-----Parks Report-----");
//   let total = 0;
//   let parkover1000 = [];
//   let date = new Date().getFullYear();
//   map.forEach((cur) => {
//     total += date - cur.buildYear;
//     if (cur.treesNum >= 1000) {
//       parkover1000.push(cur.name);
//     }
//   });
//   console.log(
//     `our ${map.size} park have average age of ${total / map.size} years.`
//   );
//   map.forEach((cur) => {
//     console.log(
//       `${
//         cur.name
//       } park has a tree density of ${cur.treeDensity()} trees per square km`
//     );
//   });
//   for (let cur of parkover1000) {
//     console.log(`${cur} park has more than 1000 trees`);
//   }
// }

// function streetReport(map) {
//   console.log("-----Street Report-----");
//   let total = 0;
//   map.forEach((cur) => {
//     total += cur.length;
//   });
//   console.log(
//     `our ${map.size} street have an average of ${
//       total / map.size
//     } km and a total size of ${total}`
//   );
//   map.forEach((cur) => {
//     console.log(
//       `${cur.name} street, build in ${cur.buildYear}, is a ${cur.size} street`
//     );
//   });
// }

// report();

/**
 * Coding Challange course solution
 */

class TownBuilding {
  constructor(name, buildYear) {
    (this.name = name), (this.buildYear = buildYear);
  }
}

class Park extends TownBuilding {
  constructor(name, buildYear, numTree, area) {
    super(name, buildYear);
    this.numTree = numTree;
    this.area = area; // km2
  }

  parkDensity() {
    let density = this.numTree / this.area;
    console.log(
      `${this.name} park has a tree density of ${density} trees per square km`
    );
  }
}

class Street extends TownBuilding {
  constructor(name, buildYear, length, size = 3) {
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }

  mappedSize() {
    let mapsize = new Map();
    mapsize.set(1, "very small");
    mapsize.set(2, "small");
    mapsize.set(3, "normal");
    mapsize.set(4, "big");
    mapsize.set(5, "huge");
    console.log(
      `${this.name} street, build in ${this.buildYear}, is a ${mapsize.get(
        this.size
      )} street`
    );
  }
}

let parks = [
  new Park("shohada", "1999", 200, 1),
  new Park("laleh", "1990", 2000, 8),
  new Park("pirmard", "2003", 10, 0.5),
];
let streets = [
  new Street("imam khomeiny", "1970", 2),
  new Street("20 metry", "1985", 1.5),
  new Street("shahid beheshti", "1990", 1.7, 4),
  new Street("asli", "1999", 3, 5),
];

function calc(arr) {
  let sum = arr.reduce((prev, cur) => prev + cur, 0);

  return [sum, sum / arr.length];
}

function parkReport(p) {
  console.log("----------Park Report----------");

  // Density
  p.forEach((cur) => cur.parkDensity());
  // Average
  let ages = p.map((cur) => new Date().getFullYear() - cur.buildYear);
  let [total, average] = calc(ages);
  console.log(`our ${p.length} park have average age of ${average} years.`);
  // which park has more than 1000 trees
  let p1000 = p.filter((cur) => cur.numTree >= 1000);
  p1000.forEach((el) =>
    console.log(`the ${el.name} park has more than 1000 trees`)
  );
}

function streetReport(s) {
  console.log("-------street Report-------");
  // build year and size
  s.forEach((cur) => {
    cur.mappedSize();
  });
  //average and total length
  let length = s.map((el) => el.length);
  let [total, aveLeng] = calc(length);
  console.log(
    `our ${s.length} street have an average of ${aveLeng} km and a total size of ${total}`
  );
}

parkReport(parks);
streetReport(streets);
