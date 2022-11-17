const answer1Btn = document.querySelector(".answer-1");
const answer2Btn = document.querySelector(".answer-2");
const answer3Btn = document.querySelector(".answer-3");
const question = document.querySelector(".question");

let round = 1;

const Questions = [
  {
    id: 0,
    q: "What is the capital of Bulgaria?",
    a: [
      { text: "Sofia", isCorrect: true },
      { text: "Varna", isCorrect: false },
      { text: "Burgas", isCorrect: false },
    ],
  },
  {
    id: 1,
    q: "Which is the best programming language?",
    a: [
      { text: "C++", isCorrect: false },
      { text: "JS", isCorrect: true },
      { text: "Python", isCorrect: false },
    ],
  },
  {
    id: 2,
    q: "Complete the phrase: I'm ___.",
    a: [
      { text: "Web Developer", isCorrect: false },
      { text: "Student", isCorrect: false },
      { text: "Batman", isCorrect: true },
    ],
  },
];

let roudOne = () => {
  answer2Btn.style.display = "block";
  answer3Btn.style.display = "block";

  question.innerText = `${Questions[0].q}`;

  answer1Btn.innerText = `${Questions[0].a[0].text}`;
  answer2Btn.innerText = `${Questions[0].a[1].text}`;
  answer3Btn.innerText = `${Questions[0].a[2].text}`;

  answer1Btn.addEventListener("click", function () {
    event.target.style.backgroundColor = "lightgreen";
    event.target.style.color = "white";

    setTimeout(() => {
      roudTwo();
    }, 1000);
  });

  answer2Btn.addEventListener("click", function () {
    event.target.style.backgroundColor = "red";
    event.target.style.color = "white";

    setTimeout(() => {
      roudTwo();
    }, 1000);
  });

  answer3Btn.addEventListener("click", function () {
    event.target.style.backgroundColor = " red";
    event.target.style.color = "white";

    setTimeout(() => {
      roudTwo();
    }, 1000);
  });
};
let roudTwo = () => {
  answer2Btn.style.display = "block";
  answer3Btn.style.display = "block";
  answer1Btn.style.backgroundColor = "rgb(236, 236, 236)";
  answer1Btn.style.color = "#000341";
  answer2Btn.style.backgroundColor = "rgb(236, 236, 236)";
  answer2Btn.style.color = "#000341";
  answer3Btn.style.backgroundColor = "rgb(236, 236, 236)";
  answer3Btn.style.color = "#000341";

  question.innerText = `${Questions[1].q}`;

  answer1Btn.innerText = `${Questions[1].a[0].text}`;
  answer2Btn.innerText = `${Questions[1].a[1].text}`;
  answer3Btn.innerText = `${Questions[1].a[2].text}`;

  answer1Btn.addEventListener("click", function () {
    event.target.style.backgroundColor = "red";
    event.target.style.color = "white";

    setTimeout(() => {
      roudThree();
    }, 1000);
  });

  answer2Btn.addEventListener("click", function () {
    event.target.style.backgroundColor = "lightgreen";
    event.target.style.color = "white";
    

    setTimeout(() => {
      roudThree();
    }, 1000);
  });

  answer3Btn.addEventListener("click", function () {
    event.target.style.backgroundColor = "red";
    event.target.style.color = "white";

    setTimeout(() => {
      roudThree();
    }, 1000);
  });
};

let roudThree = () => {
  answer2Btn.style.display = "block";
  answer3Btn.style.display = "block";
  question.innerText = `${Questions[2].q}`;

  answer1Btn.innerText = `${Questions[2].a[0].text}`;
  answer2Btn.innerText = `${Questions[2].a[1].text}`;
  answer3Btn.innerText = `${Questions[2].a[2].text}`;

  answer1Btn.addEventListener("click", function () {
    event.target.style.backgroundColor = "red";
    event.target.style.color = "white";

    setTimeout(() => {
      restart();
    }, 1000);
  });

  answer2Btn.addEventListener("click", function () {
    event.target.style.backgroundColor = "red";
    event.target.style.color = "white";

    setTimeout(() => {
      restart();
    }, 1000);
  });

  answer3Btn.addEventListener("click", function () {
    event.target.style.backgroundColor = "lightgreen";
    event.target.style.color = "white";

    setTimeout(() => {
      restart();
    }, 1000);
  });
};

let restart = () => {
  answer2Btn.style.display = "none";
  answer3Btn.style.display = "none";

  question.innerText = `Great Job!`;
  answer1Btn.innerText = `Try Again`;

  answer1Btn.addEventListener("click", function () {
    event.target.style.backgroundColor = "lightblue";
    event.target.style.color = "white";

    setTimeout(() => {
      roudOne();
    }, 1000);
  });
};

window.addEventListener("load", roudOne);
