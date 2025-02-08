# 📌 Number Classification API  

A HNG-Backend-stage-one simple Express.js API that takes a number and returns interesting mathematical properties along with a fun fact.

---

## 🚀 Features  

- Identifies if a number is:
  - **Prime**
  - **Perfect**
  - **Armstrong**
  - **Even/Odd**
- Computes the **sum of its digits**
- Fetches a **fun fact** about the number using the [Numbers API](http://numbersapi.com/#42)
- Returns results in **JSON format**
- Handles **CORS** for cross-origin requests

---

## 📌 API Endpoint  

### **GET /api/classify-number**  

**Query Parameter:**  

| Parameter | Type    | Required | Description                     |
|-----------|---------|----------|---------------------------------|
| `number`  | Integer | ✅ Yes   | The number to classify         |

### ✅ Example Request  

```bash
GET https://your-api.onrender.com/api/classify-number?number=5000

### 📤 Example Response (200 OK)  
### 📤 Example Response (200 OK)

```json
{
    "number": 5000,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["even", "composite"],
    "digit_sum": 5,
    "fun_fact": "5000 is a round number often used to estimate large values."
}

