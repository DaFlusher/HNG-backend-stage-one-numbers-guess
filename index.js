import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from 'dotenv';
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
  const digits = num.toString().split("");
  const power = digits.length;
  return (
    digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), power), 0) ===
    num
  );
};


const isPerfectNum = (num) => {
    let sum = 1;
    for (let i = 2; i <= num / 2; i++) {
      if (num % i === 0) sum += i;
    }
    return sum === num;
  };
// API Endpoints
app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;
  const num = parseInt(number, 10);

  if (isNaN(num)) {
    return res.status(400).json({ number, error: true });
  }

  const numProperties = [];
  if (num % 2 === 0) numProperties.push("even");
  else numProperties.push("odd");
  if (isPrimeNum(num)) numProperties.push("prime");
  if (isPerfectNum(num)) numProperties.push("perfect");
  if (isArmstrongNum(num)) numProperties.push("armstrong");

  const digitSum = num
    .toString()
    .split("")
    .reduce((sum, digit) => sum + parseInt(digit, 10), 0);

  // Fetching fun fact
  let funFact;
  try {
    const response = await axios.get(`http://numbersapi.com/${num}?json`);
    funFact = response.data.text;
  } catch (error) {
    funFact = "OOPS! No fun fact could be found.";
  }

  res.json({
    number: num,
    is_prime: isPrimeNum(num),
    is_perfect: isPerfectNum(num),
    numProperties,
    digit_sum: digitSum,
    fun_fact: funFact,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
