// js/conversions.js
import { randomInt, randomFloat } from './helpers.js';

export function generateUnitConversions() {
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

export function generateUnitConversionsWeight() {
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
      // Randomize an ounce value and output the result in pounds and ounces.
      const totalOunces = randomInt(50, 200);
      const pounds = Math.floor(totalOunces / 16);
      const remainder = totalOunces % 16;
      problemText = `How many pounds are there in ${totalOunces} ounces? (Answer should be in pounds and ounces)`;
      answer = `${pounds} pounds ${remainder} ounces`;
      explanation = `1 pound = 16 ounces, so ${totalOunces} ÷ 16 = ${pounds} with a remainder of ${remainder}, i.e., ${pounds} pounds ${remainder} ounces.`;
      break;
    }
    case 5: {
      // Randomize kilograms between 10 and 50 and convert to pounds.
      const kilograms = randomFloat(10, 50, 2);
      const pounds = parseFloat((kilograms * 2.20462).toFixed(2));
      problemText = `${kilograms} kilograms of fertilizer were bought for the garden. How many pounds of fertilizer were bought?`;
      answer = pounds;
      explanation = `1 kilogram = 2.20462 pounds, so ${kilograms} × 2.20462 ≈ ${pounds} pounds.`;
      break;
    }
    case 6: {
      // Randomize grams between 500,000 and 1,000,000 and convert to kilograms.
      const grams = randomInt(500000, 1000000);
      const kilograms = parseFloat((grams * 0.001).toFixed(2));
      problemText = `An elevator can lift ${grams} grams. Calculate its lifting capacity in kilograms.`;
      answer = kilograms;
      explanation = `1 gram = 0.001 kilogram, so ${grams} × 0.001 = ${kilograms} kg.`;
      break;
    }
  }
  return { problemText, answer, explanation };
}

export function generateUnitConversionsLength() {
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