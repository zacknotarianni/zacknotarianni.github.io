// js/app.js
import { randomInt } from './helpers.js';
import * as arithmetic from './arithmetic.js';
import * as fractions from './fractions.js';
import * as conversions from './conversions.js';
import * as wordProblems from './wordProblems.js';
import * as algebra from './algebra.js';

let correctCount = 0;
let attemptedCount = 0;
let currentAnswer = null;
let currentProblem = {};

// Update score display
function updateScore() {
  document.getElementById('scoreDisplay').textContent =
    `Score: ${correctCount} correct out of ${attemptedCount} attempted.`;
}

// Category mapping: each broad dropdown value returns a random problem from its module(s)
const categoryMap = {
  arithmeticAlgebra: () => {
    // Choose from basic arithmetic, order of operations, or algebra problems.
    const funcs = [
      arithmetic.generateBasicArithmetic,
      arithmetic.generateOrderOfOperations,
      algebra.generateAlgebraicExpressions,
      algebra.generateSolvingForX,
      algebra.generateSolvingForXQuadratic
    ];
    return funcs[randomInt(0, funcs.length - 1)]();
  },
  fractionsDecimals: () => {
    // Choose from fraction conversion or fraction operations problems.
    const funcs = [
      fractions.generateFractionsDecimals,
      fractions.generateFractionsOperations
    ];
    return funcs[randomInt(0, funcs.length - 1)]();
  },
  unitConversions: () => {
    // Choose from volume, weight, or length conversions.
    const funcs = [
      conversions.generateUnitConversions,
      conversions.generateUnitConversionsWeight,
      conversions.generateUnitConversionsLength
    ];
    return funcs[randomInt(0, funcs.length - 1)]();
  },
  wordProblems: () => {
    // Choose from time & money, rate & proportion, subtraction, or division word problems.
    const funcs = [
      wordProblems.generateTimeMoneyWord,
      wordProblems.generateRateCarTravel,
      wordProblems.generateSubtractionWord,
      wordProblems.generateDivisionWord
    ];
    return funcs[randomInt(0, funcs.length - 1)]();
  }
};

// Main problem generator function
function generateProblem() {
  const category = document.getElementById("problemType").value;
  // Use the categoryMap to select a problem
  const problemObj = categoryMap[category]();
  currentProblem = problemObj;
  currentAnswer = problemObj.answer;
  document.getElementById("problemText").textContent = problemObj.problemText;
  document.getElementById("feedback").textContent = "";
  document.getElementById("hint").textContent = "";
  document.getElementById("answerInput").value = "";
}

// Check the user's answer
function checkAnswer() {
  const userAnswerRaw = document.getElementById("answerInput").value.trim();
  const feedbackElem = document.getElementById("feedback");
  let isCorrect = false;
  if (typeof currentAnswer === "number") {
    const userAnswer = parseFloat(userAnswerRaw);
    if (!isNaN(userAnswer) && Math.abs(userAnswer - currentAnswer) < 0.01) {
      isCorrect = true;
    }
  } else {
    const normalizedUserAnswer = userAnswerRaw.replace(/\s+/g, '').toLowerCase();
    const normalizedCorrectAnswer = currentAnswer.toString().replace(/\s+/g, '').toLowerCase();
    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      isCorrect = true;
    }
  }
  
  attemptedCount++;
  if (isCorrect) {
    correctCount++;
    const motivationMessages = [
      "Great job, Cassie! Keep it up!",
      "Excellent work, Cassie! You're doing amazing!",
      "Awesome, Cassie! Your math skills are on point!",
      "Way to go, Cassie! Every problem conquered!",
      "Fantastic effort, Cassie! Keep shining!",
      "You're a math superstar, Cassie! Well done!",
      "Brilliant work, Cassie! You're making progress!",
      "Keep rocking it, Cassie! You're unstoppable!",
      "Outstanding, Cassie! Your hard work shows!",
      "Superb, Cassie! Every answer counts!",
      "You're crushing it, Cassie! Keep the momentum!",
      "Impressive, Cassie! Your skills keep growing!",
      "Kudos, Cassie! Your dedication is inspiring!",
      "Amazing job, Cassie! Keep challenging yourself!",
      "Remarkable, Cassie! You're a problem-solving pro!",
      "Keep it up, Cassie! You're mastering these problems!",
      "You did it, Cassie! Another one down!",
      "Incredible work, Cassie! You're on the right track!",
      "Bravo, Cassie! Your efforts are paying off!",
      "Fantastic, Cassie! You're truly talented!"
    ];
    const randomIndex = randomInt(0, motivationMessages.length - 1);
    const message = motivationMessages[randomIndex];
    feedbackElem.textContent = "Correct! " + message;
    feedbackElem.style.color = "green";
  } else {
    feedbackElem.textContent = `Incorrect. ${currentProblem.explanation}`;
    feedbackElem.style.color = "red";
  }
  updateScore();
}

// Event listeners
document.getElementById("submitAnswer").addEventListener("click", checkAnswer);
document.getElementById("nextProblem").addEventListener("click", generateProblem);
document.getElementById("problemType").addEventListener("change", generateProblem);

// Generate an initial problem on page load
generateProblem();

// Toggle cheat sheet functionality
const toggleButton = document.getElementById("toggleCheatSheet");
toggleButton.addEventListener("click", function() {
  const cheatSheetDiv = document.getElementById("formulas");
  if (cheatSheetDiv.style.display === "none" || cheatSheetDiv.style.display === "") {
    cheatSheetDiv.style.display = "block";
    this.textContent = "Hide Cheat Sheet";
  } else {
    cheatSheetDiv.style.display = "none";
    this.textContent = "Show Cheat Sheet";
  }
});