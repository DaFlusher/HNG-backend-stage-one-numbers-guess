import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

const isPrimeNum = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const isArmstrongNum = (num) => {
  if (num < 0) return false; // Negative numbers can't be Armstrong
  const digits = Math.abs(num).toString().split("");
  const power = digits.length;
  return (
    digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), power), 0) ===
    Math.abs(num)
  );
};

const isPerfectNum = (num) => {
  if (num < 0) return false; // Negative numbers can't be perfect
  let sum = 1;
  for (let i = 2; i <= num / 2; i++) {
    if (num % i === 0) sum += i;
  }
  return sum === num;
};

// API Endpoints
app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;
  
  // Validate input
  if (!number || isNaN(number)) {
    return res.status(400).json({ number, error: true });
  }

  // Convert to integer
  const num = parseInt(number, 10);

  // Reject floats
  if (number.includes(".")) {
    return res.status(400).json({ number, error: true });
  }

  const properties = [];
  if (num % 2 === 0) properties.push("even");
  else properties.push("odd");

  if (isPrimeNum(num)) properties.push("prime");
  if (isPerfectNum(num)) properties.push("perfect");
  if (isArmstrongNum(num)) properties.push("armstrong");

  // Negative values can't be armstrong, prime, or perfect
  if (num < 0) {
    properties.splice(properties.indexOf("armstrong"), 1);
    properties.splice(properties.indexOf("prime"), 1);
    properties.splice(properties.indexOf("perfect"), 1);
  }

  // Calculate digit sum (negative numbers should return a negative sum)
  const digitSum = num
    .toString()
    .split("")
    .filter(d => d !== "-") // Ignore the negative sign
    .reduce((sum, digit) => sum + parseInt(digit, 10), 0) * Math.sign(num); // Keep negative sum

  // Fetching fun fact
  let funFact;
  try {
    const response = await axios.get(`http://numbersapi.com/${Math.abs(num)}?json`);
    funFact = response.data.text;
  } catch (error) {
    funFact = "OOPS! No fun fact could be found.";
  }

  res.json({
    number: num,
    is_prime: isPrimeNum(num),
    is_perfect: isPerfectNum(num),
    properties,
    digit_sum: digitSum,
    fun_fact: funFact,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
