import db from "./db.js";
import express from "express";
import bcrypt from "bcrypt";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function getUser() {
  try {
    const result = await db.query("SELECT * FROM users");
    return result.rows > 0 ? result.rows : [{ message: `No results` }];
  } catch (err) {
    console.error("Error", err);
    throw new Error("Database query failed");
  }
}

async function getSpecificUser(id) {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] || { message: `Can't find user id ${id}` };
  } catch (err) {
    console.error("Error", err);
    throw new Error("Database query failed");
  }
}

function trimInputs(req) {
  const { email, username, password, firstName, lastName, sex } = req.body;
  const trimEmail = email.trim();
  const trimUsername = username.trim();
  const trimPassword = password.trim();
  const trimFirstName = firstName.trim();
  const trimlastName = lastName.trim();
  const trimSex = sex.trim();

  return {
    email: trimEmail,
    username: trimUsername,
    password: trimPassword,
    firstName: trimFirstName,
    lastName: trimlastName,
    sex: trimSex,
  };
}

function checkInputs(inputs) {
  const invalid = [" ", "/", ".", ",", "*", "-", "+", "'", '"'];

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
    invalid.includes(inputs.email.slice(-1)) ||
    invalid.includes(inputs.username.slice(-1))
  ) {
    return {
      message: "Invalid type of email or username",
      invalid: `${inputs.email.slice(-1)}`,
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

app.post("/api/register/user", async (req, res) => {
  const trim = trimInputs(req);

  try {
    if (!checkInputs(trim).status) {
      return res
        .status(checkInputs(trim).code)
        .json({ message: checkInputs(trim).message });
    }

    return res.json({
      message: "Successfully created",
      insertedData: trim,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

app.listen(5000);
