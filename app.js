// function Person(name, lastName, age) {
//   this.name = name;
//   this.lastName = lastName;
//   this.age = age;
// }

// Person.prototype.calculatedAge = function (now) {
//   this.birthday = now - this.age;
// };

// let mahdi = new Person("mahdi", "samieenia", "22");
// mahdi.calculatedAge(2020);

// let hasan = {}
// hasan= mahdi;
// console.log(hasan)

// console.log(Person.prototype);

// let obj1 = {
//   name: "mahdi",
//   age: 22,
// };

// let obj2 = Object.assign({}, obj1);
// obj2.name = "dads"
// console.log("obj2 :>> ", obj1);

//*************************************************************************** */
(function () {
  function Questions(ques, answerArr, corAnswer) {
    this.ques = ques;
    this.answerArr = answerArr;
    this.corAnswer = corAnswer;
  }

  let q1 = new Questions(
    "what is mahdi's sex?",
    ["men", "female", "both", "i have no idea!"],
    0
  );
  let q2 = new Questions(
    "who is the next president of iran?",
    ["mahdi", "saieed", "hasan"],
    0
  );
  let q3 = new Questions(
    "what is the pass?",
    ["1234", "4321", "m.ssamie1234321", "opps!"],
    3
  );

  let questionsArr = [q1, q2, q3];
  let score = 0;
  function randomQ() {
    let rand = Math.floor(Math.random() * questionsArr.length);
    showInConsole(rand);
    let userAnswer = prompt("enter a number for choose answer");
    if (userAnswer == questionsArr[rand].corAnswer) {
      console.log("Correct!");
      score++;
      return randomQ();
    } else if (userAnswer == "exit" || userAnswer == "Exit") {
      alert(`you got ${score} point in this game good Bye :))`);
      console.log("------------goodbye--------------");
    } else if (userAnswer != questionsArr[rand].corAnswer) {
      randomQ();
    }
    return;
  }

  function showInConsole(num) {
    console.log(questionsArr[num].ques);
    questionsArr[num].answerArr.forEach((answer, index) => {
      console.log(`${index}- ${answer}`);
    });
  }

  randomQ();
})();
