# Personal Expense Tracker API

This is a RESTful API for managing personal financial records. Users can record their income and expenses, retrieve past transactions, and get summaries by category or time period. The project uses **Node.js** and **Express.js** for the backend, and **SQLite** for the database.

## Features

- Add, update, and delete income and expense transactions.
- Retrieve past transactions by ID or get all transactions.
- Get a summary of transactions by date range or category.
- User authentication (optional: register, login).
- Supports pagination for retrieving large sets of transactions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Bonus Features](#bonus-features)
- [Postman Collection](#postman-collection)

---

## Installation

1. Clone the repository:

   git clone https://github.com/your-username/personal-expense-tracker.git

2.	Navigate into the project directory:

    cd personal-expense-tracker

3.	Install the necessary dependencies:

    npm install

4.	Set up the database (SQLite):

    npm run init-db

5.	Start the server:

    node server.js

6.	The server will run at http://localhost:3000.

Usage

Once the server is running, you can interact with the API using Postman, curl, or any HTTP client. Ensure you are using the correct routes and methods.



