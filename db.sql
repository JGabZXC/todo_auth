CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR (50),
    username VARCHAR (50),
    password VARCHAR(100),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    sex VARCHAR(30),
    account_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    user_firstname VARCHAR(50),
    description VARCHAR (100),
    category VARCHAR(50),
    todo_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR (20)
)

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    category VARCHAR(50)
)