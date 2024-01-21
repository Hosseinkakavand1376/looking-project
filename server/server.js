"use strict";

const express = require("express");
const cors = require("cors");
const dbfunctions = require("./dbfunctions.js");

const app = express();

app.use(cors());


// Route for getting ranking data
app.get("/api/ranking", async (req, res) => {
    try {
        // Replace 'dbfunctions.getRankingData()' with your actual function to get ranking data
        const rankingData = await dbfunctions.getRankingData();
        res.json(rankingData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.listen(8081, () => {
    console.log("Server running on port 8081");
    }
);

app.get("/api/users", async (req, res) => {
    try {
        const users = await dbfunctions.getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/api/challenges", async (req, res) =>{
    try {
        const challenges = await dbfunctions.getchallenges();
        res.json(challenges);
        console.log(challenges);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});