import db from "./db.js";
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const saltRounds = 10;

const API_KEY = process.env.API_KEY;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", (req, res, next) => {
  const apiKey = req.headers["authorization"];

  if (apiKey !== API_KEY) {
    return res.status(403).json({ message: "Forbidden Access", code: 403 });
  }

  return next();
});

async function getUser() {
  try {
    const result = await db.query("SELECT * FROM users");
    return result.rowCount > 0 ? result.rows : [{ message: `No results` }];
  } catch (err) {
    console.error("Error", err);
    throw new Error("Database query failed");
  }
}

async function getSpecificUser(id) {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return (
      result.rows[0] || {
        message: `Can't find user id ${id}`,
        status: false,
        code: 404,
      }
    );
  } catch (err) {
    console.error("Error", err);
    throw new Error("Database query failed");
  }
}

async function getSpecificUserUserByUsernameOrEmail(input) {
  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 OR username = $1",
      [input]
    );

    if (!result.rowCount > 0) {
      return {
        message: "No account was found",
        code: 404,
      };
    }

    return result.rows;
  } catch (err) {
    console.error("Error", err);
    throw new Error("Database query failed");
  }
}

function trimInputs(req) {
  function capitalizeWord(word) {
    const full = word.toLowerCase();
    const first = full.slice(0, 1).toUpperCase();
    return first + full.slice(1);
  }
  const { email, username, password, firstName, lastName, sex } = req.body;
  const trimEmail = email.trim();
  const trimUsername = username.trim();
  const trimPassword = password.trim();
  const trimFirstName = firstName.trim();
  const trimLastName = lastName.trim();
  const trimSex = sex.trim();

  const fixedFName = capitalizeWord(trimFirstName);
  const fixedLName = capitalizeWord(trimLastName);

  return {
    email: trimEmail,
    username: trimUsername,
    password: trimPassword,
    firstName: fixedFName,
    lastName: fixedLName,
    sex: trimSex,
  };
}

function checkInputs(inputs) {
  const invalid = [" ", "/", ".", ",", "*", "-", "+", "'", '"'];
  const invalid2 = [
    " ",
    "/",
    ".",
    ",",
    "*",
    "-",
    "+",
    "'",
    '"',
    "1",
    "2",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  if (
    inputs.email.includes(" ") ||
    inputs.email.length < 10 ||
    inputs.email.length > 50 ||
    inputs.username.includes(" ") ||
    inputs.username.length < 10 ||
    inputs.username.length > 50
  ) {
    return {
      message:
        "Do not include whitespace. Check Email or Username must be 10 characters long.",
      email_length: inputs.email.length,
      username_length: inputs.username.length,
      status: false,
      code: 400,
    };
  }

  if (
    invalid2.includes(inputs.email.slice(-1)) ||
    invalid.includes(inputs.username.slice(-1))
  ) {
    return {
      message: "Invalid type of email or username",
      invalid: invalid2.includes(inputs.email.slice(-1))
        ? `${inputs.email.slice(-1)}`
        : `${inputs.username.slice(-1)}`,
      status: false,
      code: 400,
    };
  }

  if (inputs.password.length < 10 || inputs.password.length > 50) {
    return {
      message: "Password should be greater than 10 or less than 50",
      invalid: inputs.password.length,
      status: false,
      code: 400,
    };
  }

  return {
    message: "Accepted",
    status: true,
    code: 200,
  };
}

async function checkAccounts(req, res, next) {
  try {
    const inputs = trimInputs(req);
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      inputs.email,
    ]);
    const result2 = await db.query("SELECT * FROM users WHERE username = $1", [
      inputs.username,
    ]);

    if (!checkInputs(inputs).status) {
      return res.status(checkInputs(inputs).code).json({
        message: checkInputs(inputs).message,
        invalid: checkInputs(inputs)?.invalid,
      });
    }

    if (result.rowCount > 0 || result2.rowCount > 0) {
      return res.status(409).json({
        message: "Email or Username already exist",
        status: false,
        code: 409,
      });
    }

    // Inserting to DB
    const hashedPassword = await bcrypt.hash(inputs.password, saltRounds);
    await db.query(
      "INSERT INTO users (email, username, password, first_name, last_name, sex) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        inputs.email,
        inputs.username,
        hashedPassword,
        inputs.firstName,
        inputs.lastName,
        inputs.sex,
      ]
    );

    return res.status(201).json({
      message: "Created Account",
      status: true,
      code: 201,
      inserted: inputs,
    });
  } catch (err) {
    console.error("Error", err);
    throw new Error("Database query failed");
  }
}

app.get("/api/get/all", async (req, res) => {
  try {
    const all = await getUser();
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const specificItem = await getSpecificUser(id);
    if (specificItem.message) {
      res.status(404).json(specificItem);
    } else {
      res.json(specificItem);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/find/acc/", async (req, res) => {
  try {
    const { acc, id } = req.query;

    if (acc) {
      const check = await getSpecificUserUserByUsernameOrEmail(acc);

      if (check?.message) {
        return res.json(check);
      }

      return res.json(check);
    }

    const check = await getSpecificUser(id);
    console.log(id);
    if (check?.message) {
      return res.json(check);
    }
    console.log(check);
    return res.json(check);
  } catch (err) {
    console.error(err);
  }
});

app.post("/api/register/user", async (req, res) => {
  try {
    checkAccounts(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

app.listen(process.env.API_PORT || 5000);
