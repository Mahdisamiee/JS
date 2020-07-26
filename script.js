let box = {
  color: "green",
  position: 1,
  clickme() {
    document.querySelector(".green").addEventListener("click", (event) => {
      console.log(
        "this is " + this.position + " box and its color is " + this.color
      );
    });
  },
};

box.clickme();
//output:>> this is 1 box and its color is green.
