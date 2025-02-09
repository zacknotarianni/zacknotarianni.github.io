// js/algebra.js
import { randomInt } from './helpers.js';

export function generateAlgebraicExpressions() {
  const a = randomInt(1, 5);
  const b = randomInt(-5, 5);
  const c = randomInt(-5, 5);
  const d = randomInt(-10, 10);
  const x = randomInt(-5, 5);
  const y = randomInt(-5, 5);
  const problemText = `Evaluate ${a}x² ${b >= 0 ? "+ " + b + "xy" : "- " + Math.abs(b) + "xy"} ${c >= 0 ? "+ " + c + "y²" : "- " + Math.abs(c) + "y²"} ${d >= 0 ? "+ " + d : "- " + Math.abs(d)} for x = ${x} and y = ${y}.`;
  let answer = a * x * x + b * x * y + c * y * y + d;
  return {
    problemText,
    answer,
    explanation: `Substitute x = ${x} and y = ${y} into the expression: ${a}×${x}² + ${b}×${x}×${y} + ${c}×${y}² + ${d} = ${answer}.`
  };
}

export function generateSolvingForX() {
  const type = randomInt(0, 4);
  let problemText = "";
  let answer;
  let explanation = "";
  if (type === 0) {
    const coeff = randomInt(1, 10);
    const constant = randomInt(1, 20);
    const rhs = randomInt(20, 50);
    problemText = `Solve for x: ${coeff}x - ${constant} = ${rhs}.`;
    answer = (rhs + constant) / coeff;
    explanation = `Add ${constant} to both sides: ${coeff}x = ${rhs + constant}. Then, x = (${rhs + constant}) / ${coeff} = ${answer}.`;
  } else if (type === 1) {
    const constant = randomInt(1, 20);
    const coeff = randomInt(1, 10);
    const rhs = randomInt(20, 50);
    problemText = `Solve for x: ${constant} - ${coeff}x = ${rhs}.`;
    answer = (constant - rhs) / coeff;
    explanation = `Subtract ${constant} from both sides: -${coeff}x = ${rhs - constant}. Then, x = (${constant} - ${rhs}) / ${coeff} = ${answer}.`;
  } else if (type === 2) {
    const constant1 = randomInt(1, 10);
    const constant2 = randomInt(1, 10);
    const rhs = randomInt(10, 20);
    problemText = `Solve for x: ${constant1} - (x - ${constant2}) = ${rhs}.`;
    answer = constant1 + constant2 - rhs;
    explanation = `Expand: ${constant1} - x + ${constant2} = ${rhs}. Then, x = ${constant1} + ${constant2} - ${rhs} = ${answer}.`;
  } else if (type === 3) {
    problemText = "Solve for x: 5(4x + 3) - 4(2x + 1) = 47.";
    answer = 3;
    explanation = "Distribute: 20x + 15 - 8x - 4 = 47, combine like terms: 12x + 11 = 47, subtract 11: 12x = 36, then divide by 12: x = 3.";
  } else {
    const multiplier = randomInt(1, 5);
    const coeffInside = randomInt(1, 10);
    const constantInside = randomInt(1, 20);
    problemText = `Solve for x: ${multiplier}(${coeffInside}x - ${constantInside}) = ${multiplier * coeffInside}x - ${multiplier * constantInside}. (Infinite solutions)`;
    answer = "infinite";
    explanation = `Both sides simplify to the same expression, so there are infinitely many solutions.`;
  }
  if (typeof answer === "number") {
    answer = parseFloat(answer.toFixed(2));
  }
  return { problemText, answer, explanation };
}

// In algebra.js, ensure you import randomInt from helpers.js:
// import { randomInt } from './helpers.js';

export function generateSolvingForXQuadratic() {
  const a = randomInt(1, 10);        // coefficient for x²
  const r = randomInt(1, 15);        // the absolute value of the solution
  const c = randomInt(-50, 50);      // a random constant
  const d = c + a * r * r;           // ensure the equation becomes: a x² + c = d

  // Format the constant term for display.
  let cText = "";
  if (c > 0) {
    cText = " + " + c;
  } else if (c < 0) {
    cText = " - " + Math.abs(c);
  }
  
  // In the problem text we instruct the user to enter only the number,
  // because the answer is understood as "±" that number.
  const problemText = `Solve for x: ${a}x²${cText} = ${d}. (Enter only the absolute value; the full answer is ± that number)`;
  
  // Instead of returning "±r", we return the number r.
  const answer = r;
  
  const explanation = `Subtract ${c} from both sides to get ${a}x² = ${d - c}. Then divide by ${a} to find x² = ${(d - c) / a}. Since ${(d - c) / a} = ${r}², the solutions are x = ±${r}. Enter ${r} as your answer.`;
  
  return { problemText, answer, explanation };
}