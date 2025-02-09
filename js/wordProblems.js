// js/wordProblems.js
import { randomInt, randomFloat } from './helpers.js';

export function generateTimeMoneyWord() {
  const wage = randomFloat(10, 20, 2);
  let totalHours = 0;
  let hoursDetails = [];
  for (let i = 0; i < 5; i++) {
    const hours = randomFloat(4, 10, 1);
    totalHours += hours;
    hoursDetails.push(hours);
  }
  totalHours = parseFloat(totalHours.toFixed(1));
  const totalWage = parseFloat((totalHours * wage).toFixed(2));
  const problemText = `A worker earns $${wage}/hour and worked ${hoursDetails.join(", ")} hours from Monday to Friday. Calculate their total weekly wage.`;
  return {
    problemText,
    answer: totalWage,
    explanation: `Total hours = ${totalHours}. Total wage = ${totalHours} × $${wage} = $${totalWage}.`
  };
}

export function generateRateCarTravel() {
  const problemText = "The car travels 98 kilometers in 1.4 hours. How many kilometers will it travel in 2 hours?";
  const rate = 98 / 1.4;
  const answer = Math.round(rate * 2 * 100) / 100;
  const explanation = `98 ÷ 1.4 = ${rate.toFixed(2)} km per hour, then ${rate.toFixed(2)} × 2 = ${answer} km.`;
  return { problemText, answer, explanation };
}

export function generateSubtractionWord() {
  const problemText = "After working for the summer, Winston pays off $187.47 of his $375.00 credit card debt. How much credit card debt does Winston have after making this payment?";
  const answer = 375.00 - 187.47;
  const explanation = `Subtract: 375.00 - 187.47 = ${answer.toFixed(2)}.`;
  return { problemText, answer: parseFloat(answer.toFixed(2)), explanation };
}

export function generateDivisionWord() {
  const problemText = "Jim runs the same distance every day for 8 days in a row. If Jim ran a total of 96 km in 8 days, what distance does he run each day?";
  const answer = 96 / 8;
  const explanation = `Divide: 96 ÷ 8 = ${answer}.`;
  return { problemText, answer, explanation };
}