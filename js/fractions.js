// js/fractions.js
import { randomInt, randomFloat } from './helpers.js';

export function generateFractionsDecimals() {
  const conversionType = Math.random() < 0.5 ? 'fractionToDecimal' : 'decimalToFraction';
  if (conversionType === 'fractionToDecimal') {
    const numerator = randomInt(1, 10);
    const denominator = randomInt(numerator + 1, 15);
    const decimalVal = parseFloat((numerator / denominator).toFixed(2));
    const percentVal = Math.round(decimalVal * 100);
    const problemText = `Express ${numerator}/${denominator} as a decimal and percent. (Format: decimal, percent)`;
    return {
      problemText,
      answer: [`${decimalVal}, ${percentVal}%`], // Answer wrapped in an array
      explanation: `${numerator}/${denominator} = ${decimalVal} and ${decimalVal} × 100 = ${percentVal}%.`
    };
  } else {
    const decimalVal = randomFloat(0.1, 0.9, 2);
    let denominator = 100;
    let numerator = Math.round(decimalVal * denominator);
    function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
    const divisor = gcd(numerator, denominator);
    numerator = numerator / divisor;
    denominator = denominator / divisor;
    const percentVal = Math.round(decimalVal * 100);
    const problemText = `Convert ${decimalVal} to a fraction and percent. (Format: fraction, percent)`;
    return {
      problemText,
      answer: [`${numerator}/${denominator}, ${percentVal}%`], // Answer wrapped in an array
      explanation: `${decimalVal} = ${numerator}/${denominator} and ${decimalVal} × 100 = ${percentVal}%.`
    };
  }
}

export function generateFractionsOperations() {
  // Choose one of four operations: 0: subtraction, 1: division, 2: addition, 3: multiplication.
  const type = randomInt(0, 3);

  if (type === 0) {
    // SUBTRACTION (Mixed Fraction Subtraction)
    const A = randomInt(10, 20);
    const B = randomInt(1, A - 1);
    const D = randomInt(2, 10);
    const C = randomInt(1, D - 1);
    const problemText = `Solve: ${A} - ${B} ${C}/${D}`;
    // Compute result: A - (B + C/D) = ((A - B)*D - C) / D
    const numerator = (A - B) * D - C;
    const denominator = D;
    const decimalAnswer = parseFloat((numerator / denominator).toFixed(2));
    
    // Compute a mixed fraction answer:
    const wholePart = Math.floor(numerator / denominator);
    const remainder = numerator % denominator;
    let mixedFractionAnswer;
    if (remainder === 0) {
      mixedFractionAnswer = `${wholePart}`;
    } else {
      mixedFractionAnswer = `${wholePart} ${remainder}/${denominator}`;
    }
    
    // Both answers are acceptable.
    const acceptedAnswers = [`${decimalAnswer}`, `${mixedFractionAnswer}`];
    
    const explanation = `First, convert ${B} ${C}/${D} to an improper fraction: (${B * D + C})/${D}. Then, subtract: ${A} - (${B * D + C})/${D} = ((${A} - ${B})×${D} - ${C})/${D} = ${numerator}/${denominator} = ${decimalAnswer} (or ${mixedFractionAnswer}).`;
    
    return { problemText, answer: acceptedAnswers, explanation };
    
  } else if (type === 1) {
    // DIVISION (Fraction Division)
    const a = randomInt(1, 10);
    const b = randomInt(2, 12);
    const c = randomInt(1, 10);
    const d = randomInt(2, 12);
    const problemText = `Solve: (${a}/${b}) ÷ (${c}/${d})`;
    // Division: (a/b) ÷ (c/d) = (a/b) × (d/c)
    const numerator = a * d;
    const denominator = b * c;
    const decimalAnswer = parseFloat((numerator / denominator).toFixed(2));
    const fractionAnswer = `${numerator}/${denominator}`;
    
    // Both answers are acceptable.
    const acceptedAnswers = [`${decimalAnswer}`, fractionAnswer];
    
    const explanation = `Flip the second fraction and multiply: (${a}/${b}) ÷ (${c}/${d}) = (${a}/${b}) × (${d}/${c}) = (${a * d})/(${b * c}) = ${decimalAnswer} (or ${fractionAnswer}).`;
    
    return { problemText, answer: acceptedAnswers, explanation };
    
  } else if (type === 2) {
    // ADDITION (Fraction Addition)
    const a = randomInt(1, 10);
    const b = randomInt(2, 12);
    const c = randomInt(1, 10);
    const d = randomInt(2, 12);
    const problemText = `Solve: (${a}/${b}) + (${c}/${d})`;
    // (a/b) + (c/d) = (a*d + c*b) / (b*d)
    const numerator = a * d + c * b;
    const denominator = b * d;
    const decimalAnswer = parseFloat((numerator / denominator).toFixed(2));
    const fractionAnswer = `${numerator}/${denominator}`;
    
    // Both answers are acceptable.
    const acceptedAnswers = [`${decimalAnswer}`, fractionAnswer];
    
    const explanation = `Find a common denominator: (${a}/${b}) + (${c}/${d}) = (${a}×${d} + ${c}×${b})/(${b}×${d}) = (${a * d} + ${c * b})/(${b * d}) = ${numerator}/${denominator}, which is approximately ${decimalAnswer}.`;
    
    return { problemText, answer: acceptedAnswers, explanation };
    
  } else {
    // MULTIPLICATION (Fraction Multiplication)
    const a = randomInt(1, 10);
    const b = randomInt(2, 12);
    const c = randomInt(1, 10);
    const d = randomInt(2, 12);
    const problemText = `Solve: (${a}/${b}) × (${c}/${d})`;
    // Multiplication: (a/b) × (c/d) = (a*c) / (b*d)
    const numerator = a * c;
    const denominator = b * d;
    const decimalAnswer = parseFloat((numerator / denominator).toFixed(2));
    const fractionAnswer = `${numerator}/${denominator}`;
    
    // Both answers are acceptable.
    const acceptedAnswers = [`${decimalAnswer}`, fractionAnswer];
    
    const explanation = `Multiply the numerators and denominators: (${a}/${b}) × (${c}/${d}) = (${a}×${c})/(${b}×${d}) = ${numerator}/${denominator}, which equals approximately ${decimalAnswer}.`;
    
    return { problemText, answer: acceptedAnswers, explanation };
  }
}
