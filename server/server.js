"use strict";

const express = require("express");
const cors = require("cors");
const dbfunctions = require("./dbfunctions.js");

const app = express();

app.use(express.json());

app.use(cors());

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
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/api/userpoint", async (req, res) =>{
    try {
        const point = await dbfunctions.getMainUserPoint();
        res.json(point);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.post("/api/addpoint", async (req, res) =>{
    try {
        const add = await dbfunctions.addPoint(req);
        res.json(add);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/api/ranking", async (req, res) => {
    try {
        const rankingData = await dbfunctions.getRankingData();
        res.json(rankingData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
