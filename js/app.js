// js/app.js
import { randomInt } from './helpers.js';
import * as arithmetic from './arithmetic.js';
import * as fractions from './fractions.js';
import * as conversions from './conversions.js';
import * as wordProblems from './wordProblems.js';
import * as algebra from './algebra.js';

console.log("app.js loaded");


// Global score and problem variables
let correctCount = 0;
let attemptedCount = 0;
let currentAnswer = null;
let currentProblem = {};

/**
 * parseFraction uses regular expressions to convert a string representing
 * a decimal, a fraction (e.g., "5/7"), or a mixed fraction (e.g., "2 1/3")
 * into a numeric value. If parsing fails, it returns NaN.
 */
function parseFraction(str) {
  str = str.trim();
  
  // Check for mixed fraction: one or more digits, whitespace, then fraction
  let mixedMatch = str.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const whole = parseFloat(mixedMatch[1]);
    const num = parseFloat(mixedMatch[2]);
    const den = parseFloat(mixedMatch[3]);
    if (!isNaN(whole) && !isNaN(num) && !isNaN(den) && den !== 0) {
      return whole + num / den;
    }
  }
  
  // Check for simple fraction: e.g. "5/7"
  let fracMatch = str.match(/^(\d+)\/(\d+)$/);
  if (fracMatch) {
    const num = parseFloat(fracMatch[1]);
    const den = parseFloat(fracMatch[2]);
    if (!isNaN(num) && !isNaN(den) && den !== 0) {
      return num / den;
    }
  }
  
  // Otherwise, try to parse as a normal number (e.g., "0.67")
  let num = parseFloat(str);
  return isNaN(num) ? NaN : num;
}

// Update score display in the DOM
function updateScore() {
  document.getElementById('scoreDisplay').textContent =
    `Score: ${correctCount} correct out of ${attemptedCount} attempted.`;
}

// Category mapping: each dropdown category returns a random problem from its module(s)
const categoryMap = {
  arithmeticAlgebra: () => {
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
    const funcs = [
      fractions.generateFractionsDecimals,
      fractions.generateFractionsOperations
    ];
    return funcs[randomInt(0, funcs.length - 1)]();
  },
  unitConversions: () => {
    const funcs = [
      conversions.generateUnitConversions,
      conversions.generateUnitConversionsWeight,
      conversions.generateUnitConversionsLength
    ];
    return funcs[randomInt(0, funcs.length - 1)]();
  },
  wordProblems: () => {
    const funcs = [
      wordProblems.generateTimeMoneyWord,
      wordProblems.generateRateCarTravel,
      wordProblems.generateSubtractionWord,
      wordProblems.generateDivisionWord
    ];
    return funcs[randomInt(0, funcs.length - 1)]();
  }
};

// Main problem generator function.
function generateProblem() {
  const category = document.getElementById("problemType").value;
  const problemObj = categoryMap[category]();
  currentProblem = problemObj;
  currentAnswer = problemObj.answer; // Expecting an array even for single-answer problems

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
  const tolerance = 0.01;

  // --- Debug Logging Start ---
  console.log("User Answer:", userAnswerRaw);
  console.log("Accepted Answers:", currentAnswer);
  // --- Debug Logging End ---

  if (Array.isArray(currentAnswer)) {
    for (let accepted of currentAnswer) {
      const acceptedStr = accepted.toString();

      // If the accepted answer contains a comma or a percent sign,
      // skip numeric conversion and do only normalized string comparison.
      if (acceptedStr.includes(",") || acceptedStr.includes("%")) {
        const normalizedUserAnswer = userAnswerRaw.replace(/\s+/g, '').toLowerCase();
        const normalizedAccepted = acceptedStr.replace(/\s+/g, '').toLowerCase();
        console.log(`Comparing strings: "${normalizedUserAnswer}" vs "${normalizedAccepted}"`);
        if (normalizedUserAnswer === normalizedAccepted) {
          isCorrect = true;
          console.log("String match found (special case).");
          break;
        }
        // Otherwise, continue to next accepted answer.
        continue;
      }
      
      // Otherwise, try numeric conversion using parseFraction.
      const userNum = parseFraction(userAnswerRaw);
      const acceptedNum = parseFraction(acceptedStr);
      console.log(`Comparing numbers: User: ${userNum}, Accepted: ${acceptedNum}`);
      if (!isNaN(userNum) && !isNaN(acceptedNum)) {
        if (Math.abs(userNum - acceptedNum) < tolerance) {
          isCorrect = true;
          console.log("Numeric match found.");
          break;
        }
      }
      
      // Fallback: normalized string comparison.
      const normalizedUserAnswer = userAnswerRaw.replace(/\s+/g, '').toLowerCase();
      const normalizedAccepted = acceptedStr.replace(/\s+/g, '').toLowerCase();
      console.log(`Fallback string compare: "${normalizedUserAnswer}" vs "${normalizedAccepted}"`);
      if (normalizedUserAnswer === normalizedAccepted) {
        isCorrect = true;
        console.log("Fallback string match found.");
        break;
      }
    }
  }
  // (Optional) If currentAnswer is a standalone number:
  else if (typeof currentAnswer === "number") {
    const userNum = parseFraction(userAnswerRaw);
    if (!isNaN(userNum) && Math.abs(userNum - currentAnswer) < tolerance) {
      isCorrect = true;
    }
  }
  // For non-array answers (typically strings)
  else {
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

// Event listeners for user interaction
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
