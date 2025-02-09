// js/arithmetic.js
import { randomInt, randomFloat } from './helpers.js';

export function generateBasicArithmetic() {
  const operators = ['+', '-', '*', '/'];
  const op = operators[randomInt(0, operators.length - 1)];
  let num1 = randomFloat(1, 100, 2);
  let num2 = randomFloat(1, 100, 2);
  if (op === '/') {
    num2 = randomFloat(1, 10, 2);
  }
  const problemText = `${num1} ${op} ${num2} = ?`;
  let answer;
  switch (op) {
    case '+': answer = num1 + num2; break;
    case '-': answer = num1 - num2; break;
    case '*': answer = num1 * num2; break;
    case '/': answer = num1 / num2; break;
  }
  answer = parseFloat(answer.toFixed(2));
  return {
    problemText,
    answer,
    explanation: `Computed as ${num1} ${op} ${num2} = ${answer}.`
  };
}

export function generateOrderOfOperations() {
  const a = randomInt(10, 50);
  const b = randomInt(10, 50);
  const c = randomInt(1, 10);
  const d = randomInt(1, 10);
  const problemText = `${a} - ${b} ÷ ${c} × ${d} = ?`;
  let intermediate = (b / c) * d;
  let answer = a - intermediate;
  answer = parseFloat(answer.toFixed(2));
  return {
    problemText,
    answer,
    explanation: `Compute ${b} ÷ ${c} = ${(b / c).toFixed(2)}, then multiply by ${d} to get ${(b / c * d).toFixed(2)}, and finally subtract from ${a}.`
  };
}