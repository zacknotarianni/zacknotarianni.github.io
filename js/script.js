// --- Math Practice App JavaScript ---
let correctCount = 0;
let attemptedCount = 0;
let currentAnswer = null;
let currentProblem = {};

function updateScore() {
  document.getElementById('scoreDisplay').textContent =
    `Score: ${correctCount} correct out of ${attemptedCount} attempted.`;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
}

// Basic Arithmetic
function generateBasicArithmetic() {
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

// Order of Operations
function generateOrderOfOperations() {
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

// Fractions and Decimals (Conversions)
function generateFractionsDecimals() {
  const conversionType = Math.random() < 0.5 ? 'fractionToDecimal' : 'decimalToFraction';
  if (conversionType === 'fractionToDecimal') {
    const numerator = randomInt(1, 10);
    const denominator = randomInt(numerator + 1, 15);
    const decimalVal = parseFloat((numerator / denominator).toFixed(2));
    const percentVal = Math.round(decimalVal * 100);
    const problemText = `Express ${numerator}/${denominator} as a decimal and percent. (Format: decimal, percent)`;
    return {
      problemText,
      answer: `${decimalVal}, ${percentVal}%`,
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
      answer: `${numerator}/${denominator}, ${percentVal}%`,
      explanation: `${decimalVal} = ${numerator}/${denominator} and ${decimalVal} × 100 = ${percentVal}%.`
    };
  }
}

// Fractions Operations (Subtracting Mixed Fractions and Dividing Fractions)
function generateFractionsOperations() {
  const type = randomInt(0, 1);
  if (type === 0) {
    const problemText = "Solve: 7 - 2 ½";
    const answer = "4.5 or 4 ½";
    const explanation = "Convert 2 ½ to 5/2. Write 7 as 14/2. Then, 14/2 - 5/2 = 9/2 = 4.5 (or 4 ½).";
    return { problemText, answer, explanation };
  } else {
    const problemText = "Solve: 3/7 ÷ 2/11";
    const answer = "2 5/14";
    const explanation = "Flip the second fraction and multiply: 3/7 × 11/2 = 33/14, which is 2 5/14.";
    return { problemText, answer, explanation };
  }
}

// Ratios and Proportions
function generateRatiosProportions() {
  const type = randomInt(0, 1);
  if (type === 0) {
    const problemText = "In 18 hours, 42 trains pass near Emma’s house. How many trains pass near her house in 12 hours?";
    const answer = 28;
    const explanation = "Find trains per hour: 42 ÷ 18 ≈ 2.33, then multiply by 12: 2.33 × 12 ≈ 28.";
    return { problemText, answer, explanation };
  } else {
    const a = randomInt(1, 20);
    const b = randomInt(1, 20);
    const problemText = `${a}:${b} :: x:100. Solve for x.`;
    const answer = parseFloat(((a * 100) / b).toFixed(2));
    return {
      problemText,
      answer,
      explanation: `x = (a × 100) / b = (${a} × 100) / ${b} = ${answer}.`
    };
  }
}

// Percentage Problems (updated to be more random)
function generatePercentageProblems() {
  const type = randomInt(0, 2);
  if (type === 0) {
    // Randomize the harvest problem
    const firstDay = randomInt(100, 300);
    const percentLess = randomInt(10, 50);
    const secondDay = Math.round(firstDay / (1 - percentLess / 100));
    const problemText = `On the first day of harvest, ${firstDay} boxes of oranges were collected. This is ${percentLess}% less than what was collected on the second day. How many boxes were collected on the second day?`;
    const answer = secondDay;
    const explanation = `Let x be the number of boxes on the second day. Since the first day's count is ${percentLess}% less, we have ${firstDay} = (1 - ${percentLess}/100)x, so x = ${firstDay} / (1 - ${percentLess}/100) ≈ ${secondDay}.`;
    return { problemText, answer, explanation };
  } else if (type === 1) {
    const births = randomInt(50, 100);
    const percentGirls = randomInt(40, 60);
    const percentBoys = 100 - percentGirls;
    const problemText = `A hospital had ${births} births, and ${percentGirls}% were girls. How many were boys?`;
    const boys = Math.round(births * percentBoys / 100);
    return {
      problemText,
      answer: boys,
      explanation: `Boys = ${births} × (${percentBoys}/100) = ${boys}.`
    };
  } else {
    const coffee = randomInt(20, 50);
    const reduction = randomInt(10, 30);
    const problemText = `A patient drinks ${coffee} oz of coffee daily but needs to reduce by ${reduction}%. How many ounces can they drink now?`;
    const reduced = parseFloat((coffee * (1 - reduction / 100)).toFixed(2));
    return {
      problemText,
      answer: reduced,
      explanation: `Reduced amount = ${coffee} × (1 - ${reduction}/100) = ${reduced} oz.`
    };
  }
}

// Unit Conversions (Volume) – already existing
function generateUnitConversions() {
  const type = randomInt(0, 5);
  let problemText = "";
  let answer;
  let explanation = "";
  switch (type) {
    case 0: {
      const quarts = randomFloat(1, 10, 2);
      const pints = parseFloat((quarts * 2).toFixed(2));
      problemText = `Convert ${quarts} quart${quarts !== 1 ? "s" : ""} to pints.`;
      answer = pints;
      explanation = `${quarts} quart${quarts !== 1 ? "s" : ""} × 2 = ${pints} pints.`;
      break;
    }
    case 1: {
      const pints = randomFloat(1, 10, 2);
      const cups = parseFloat((pints * 2).toFixed(2));
      problemText = `Convert ${pints} pint${pints !== 1 ? "s" : ""} to cups.`;
      answer = cups;
      explanation = `${pints} pint${pints !== 1 ? "s" : ""} × 2 = ${cups} cups.`;
      break;
    }
    case 2: {
      const cups = randomFloat(1, 10, 2);
      const flOz = parseFloat((cups * 8).toFixed(2));
      problemText = `Convert ${cups} cup${cups !== 1 ? "s" : ""} to fluid ounces.`;
      answer = flOz;
      explanation = `${cups} cup${cups !== 1 ? "s" : ""} × 8 = ${flOz} fl oz.`;
      break;
    }
    case 3: {
      const flOz = randomFloat(1, 10, 2);
      const mL = parseFloat((flOz * 30).toFixed(2));
      problemText = `Convert ${flOz} fluid ounce${flOz !== 1 ? "s" : ""} to milliliters.`;
      answer = mL;
      explanation = `${flOz} fl oz × 30 = ${mL} mL.`;
      break;
    }
    case 4: {
      const mL = randomFloat(100, 1000, 0);
      const liters = parseFloat((mL / 1000).toFixed(2));
      problemText = `Convert ${mL} milliliters to liters.`;
      answer = liters;
      explanation = `${mL} mL ÷ 1000 = ${liters} L.`;
      break;
    }
    case 5: {
      const quarts = randomFloat(1, 10, 2);
      const liters = parseFloat((quarts * 0.96).toFixed(2));
      problemText = `Convert ${quarts} quart${quarts !== 1 ? "s" : ""} to liters.`;
      answer = liters;
      explanation = `${quarts} quart${quarts !== 1 ? "s" : ""} × 0.96 ≈ ${liters} L.`;
      break;
    }
  }
  return { problemText, answer, explanation };
}

// Unit Conversions (Weight) – Updated to include fixed examples
function generateUnitConversionsWeight() {
  const type = randomInt(0, 6);
  let problemText, answer, explanation;
  switch (type) {
    case 0: {
      const grams = randomFloat(50, 500, 2);
      answer = parseFloat((grams * 0.001).toFixed(4));
      problemText = `Convert ${grams} grams to kilograms.`;
      explanation = `1 gram = 0.001 kg, so ${grams} × 0.001 = ${answer} kg.`;
      break;
    }
    case 1: {
      const kilograms = randomFloat(0.5, 10, 2);
      answer = parseFloat((kilograms * 1000).toFixed(2));
      problemText = `Convert ${kilograms} kilograms to grams.`;
      explanation = `1 kilogram = 1000 grams, so ${kilograms} × 1000 = ${answer} grams.`;
      break;
    }
    case 2: {
      const ounces = randomFloat(16, 160, 2);
      answer = parseFloat((ounces / 16).toFixed(2));
      problemText = `Convert ${ounces} ounces to pounds.`;
      explanation = `1 pound = 16 ounces, so ${ounces} ÷ 16 = ${answer} pounds.`;
      break;
    }
    case 3: {
      const pounds = randomFloat(1, 20, 2);
      answer = parseFloat((pounds * 16).toFixed(2));
      problemText = `Convert ${pounds} pounds to ounces.`;
      explanation = `1 pound = 16 ounces, so ${pounds} × 16 = ${answer} ounces.`;
      break;
    }
    case 4: {
      problemText = "How many pounds are there in 106 ounces? (Answer should be in pounds and ounces)";
      answer = "6 pounds 10 ounces";
      explanation = "1 pound = 16 ounces, so 106 ÷ 16 = 6 with a remainder of 10, i.e., 6 pounds 10 ounces.";
      break;
    }
    case 5: {
      problemText = "29 kilograms of fertilizer were bought for the garden. How many pounds of fertilizer were bought?";
      answer = 63.93;
      explanation = "1 kilogram = 2.20462 pounds, so 29 × 2.20462 ≈ 63.93 pounds.";
      break;
    }
    case 6: {
      problemText = "An elevator can lift 720,000 grams. Calculate its lifting capacity in kilograms.";
      answer = 720;
      explanation = "1 gram = 0.001 kilogram, so 720,000 × 0.001 = 720 kg.";
      break;
    }
  }
  return { problemText, answer, explanation };
}

// Unit Conversions (Length) – Updated to include fixed centimeters to millimeters
function generateUnitConversionsLength() {
  const type = randomInt(0, 3);
  if (type === 0) {
    const meters = randomInt(50, 500);
    const feet = parseFloat((meters * 3.28084).toFixed(2));
    const problemText = `The length of Janelle’s garden is ${meters} meters. What is the length in feet? (Round to the nearest hundredth)`;
    const answer = feet;
    const explanation = `1 meter = 3.28084 feet, so ${meters} × 3.28084 ≈ ${feet} feet.`;
    return { problemText, answer, explanation };
  } else if (type === 1) {
    const yards = randomInt(10, 200);
    const inches = yards * 3 * 12;
    const problemText = `A model car travels ${yards} yards during a trial run. How many inches does it travel?`;
    const answer = inches;
    const explanation = `1 yard = 3 feet and 1 foot = 12 inches, so ${yards} × 3 × 12 = ${inches} inches.`;
    return { problemText, answer, explanation };
  } else if (type === 2) {
    const cm = randomInt(50, 300);
    const meters = parseFloat((cm * 0.01).toFixed(2));
    const problemText = `Mary has a plant that is ${cm} cm tall. Convert to meters.`;
    const answer = meters;
    const explanation = `1 cm = 0.01 m, so ${cm} × 0.01 = ${meters} meters.`;
    return { problemText, answer, explanation };
  } else {
    const problemText = "Convert 15.64 centimeters to millimeters.";
    const answer = 156.4;
    const explanation = "1 cm = 10 mm, so 15.64 × 10 = 156.4 mm.";
    return { problemText, answer, explanation };
  }
}

// New: Rate and Proportion (Car Travel)
function generateRateCarTravel() {
  const problemText = "The car travels 98 kilometers in 1.4 hours. How many kilometers will it travel in 2 hours?";
  const rate = 98 / 1.4;
  const answer = Math.round(rate * 2 * 100) / 100;
  const explanation = `98 ÷ 1.4 = ${rate.toFixed(2)} km per hour, then ${rate.toFixed(2)} × 2 = ${answer} km.`;
  return { problemText, answer, explanation };
}

// New: Subtraction (Credit Card Debt)
function generateSubtractionWord() {
  const problemText = "After working for the summer, Winston pays off $187.47 of his $375.00 credit card debt. How much credit card debt does Winston have after making this payment?";
  const answer = 375.00 - 187.47;
  const explanation = `Subtract: 375.00 - 187.47 = ${answer.toFixed(2)}.`;
  return { problemText, answer: parseFloat(answer.toFixed(2)), explanation };
}

// New: Division (Distance Per Day)
function generateDivisionWord() {
  const problemText = "Jim runs the same distance every day for 8 days in a row. If Jim ran a total of 96 km in 8 days, what distance does he run each day?";
  const answer = 96 / 8;
  const explanation = `Divide: 96 ÷ 8 = ${answer}.`;
  return { problemText, answer, explanation };
}

// Evaluating Algebraic Expressions
function generateAlgebraicExpressions() {
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

// Solving for x (Linear Equations) – Modified to include a fixed example.
function generateSolvingForX() {
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

// Solving for x (Quadratic Equations) – New Section
function generateSolvingForXQuadratic() {
  const problemText = "Solve for x: 4x² - 61 = 135.";
  const answer = "±7";
  const explanation = "Add 61 to both sides: 4x² = 196, divide by 4: x² = 49, then take the square root: x = ±7.";
  return { problemText, answer, explanation };
}

// New: Rate and Proportion (Car Travel)
function generateRateCarTravel() {
  const problemText = "The car travels 98 kilometers in 1.4 hours. How many kilometers will it travel in 2 hours?";
  const rate = 98 / 1.4;
  const answer = Math.round(rate * 2 * 100) / 100;
  const explanation = `98 ÷ 1.4 = ${rate.toFixed(2)} km per hour, then ${rate.toFixed(2)} × 2 = ${answer} km.`;
  return { problemText, answer, explanation };
}

// New: Subtraction (Credit Card Debt)
function generateSubtractionWord() {
  const problemText = "After working for the summer, Winston pays off $187.47 of his $375.00 credit card debt. How much credit card debt does Winston have after making this payment?";
  const answer = 375.00 - 187.47;
  const explanation = `Subtract: 375.00 - 187.47 = ${answer.toFixed(2)}.`;
  return { problemText, answer: parseFloat(answer.toFixed(2)), explanation };
}

// New: Division (Distance Per Day)
function generateDivisionWord() {
  const problemText = "Jim runs the same distance every day for 8 days in a row. If Jim ran a total of 96 km in 8 days, what distance does he run each day?";
  const answer = 96 / 8;
  const explanation = `Divide: 96 ÷ 8 = ${answer}.`;
  return { problemText, answer, explanation };
}

// Evaluating Algebraic Expressions
function generateAlgebraicExpressions() {
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

// Solving for x (Linear Equations) – Modified to include a fixed example.
function generateSolvingForX() {
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

// Solving for x (Quadratic Equations) – New Section
function generateSolvingForXQuadratic() {
  const problemText = "Solve for x: 4x² - 61 = 135.";
  const answer = "±7";
  const explanation = "Add 61 to both sides: 4x² = 196, divide by 4: x² = 49, then take the square root: x = ±7.";
  return { problemText, answer, explanation };
}

// New: Rate and Proportion (Car Travel)
function generateRateCarTravel() {
  const problemText = "The car travels 98 kilometers in 1.4 hours. How many kilometers will it travel in 2 hours?";
  const rate = 98 / 1.4;
  const answer = Math.round(rate * 2 * 100) / 100;
  const explanation = `98 ÷ 1.4 = ${rate.toFixed(2)} km per hour, then ${rate.toFixed(2)} × 2 = ${answer} km.`;
  return { problemText, answer, explanation };
}

// New: Subtraction (Credit Card Debt)
function generateSubtractionWord() {
  const problemText = "After working for the summer, Winston pays off $187.47 of his $375.00 credit card debt. How much credit card debt does Winston have after making this payment?";
  const answer = 375.00 - 187.47;
  const explanation = `Subtract: 375.00 - 187.47 = ${answer.toFixed(2)}.`;
  return { problemText, answer: parseFloat(answer.toFixed(2)), explanation };
}

// New: Division (Distance Per Day)
function generateDivisionWord() {
  const problemText = "Jim runs the same distance every day for 8 days in a row. If Jim ran a total of 96 km in 8 days, what distance does he run each day?";
  const answer = 96 / 8;
  const explanation = `Divide: 96 ÷ 8 = ${answer}.`;
  return { problemText, answer, explanation };
}

// Generate a new problem based on the selected type.
function generateProblem() {
  const problemType = document.getElementById("problemType").value;
  let problemObj;
  switch (problemType) {
    case "basicArithmetic":
      problemObj = generateBasicArithmetic();
      break;
    case "orderOfOperations":
      problemObj = generateOrderOfOperations();
      break;
    case "fractionsDecimals":
      problemObj = generateFractionsDecimals();
      break;
    case "fractionsOperations":
      problemObj = generateFractionsOperations();
      break;
    case "ratiosProportions":
      problemObj = generateRatiosProportions();
      break;
    case "percentageProblems":
      problemObj = generatePercentageProblems();
      break;
    case "unitConversions":
      problemObj = generateUnitConversions();
      break;
    case "unitConversionsWeight":
      problemObj = generateUnitConversionsWeight();
      break;
    case "unitConversionsLength":
      problemObj = generateUnitConversionsLength();
      break;
    case "timeMoneyWord":
      problemObj = generateTimeMoneyWord();
      break;
    case "algebraicExpressions":
      problemObj = generateAlgebraicExpressions();
      break;
    case "solvingForX":
      problemObj = generateSolvingForX();
      break;
    case "solvingForXQuadratic":
      problemObj = generateSolvingForXQuadratic();
      break;
    case "rateCarTravel":
      problemObj = generateRateCarTravel();
      break;
    case "subtractionWord":
      problemObj = generateSubtractionWord();
      break;
    case "divisionWord":
      problemObj = generateDivisionWord();
      break;
    default:
      problemObj = {
        problemText: "Problem type not found.",
        answer: null,
        explanation: ""
      };
  }
  currentProblem = problemObj;
  currentAnswer = problemObj.answer;
  document.getElementById("problemText").textContent = problemObj.problemText;
  document.getElementById("feedback").textContent = "";
  document.getElementById("hint").textContent = "";
  document.getElementById("answerInput").value = "";
}

// Check the user's answer.
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

// Event listeners for the Practice App.
document.getElementById("submitAnswer").addEventListener("click", checkAnswer);
document.getElementById("nextProblem").addEventListener("click", generateProblem);
document.getElementById("problemType").addEventListener("change", generateProblem);

// Generate an initial problem on page load.
generateProblem();

// --- Cheat Sheet Toggle JavaScript ---
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