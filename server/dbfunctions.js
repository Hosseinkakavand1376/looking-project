"use strict";

const { json } = require("express");
const sqlite3 = require("sqlite3");


const db = new sqlite3.Database("./DB/DB.sqlite", (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
});

exports.getUsers = () => {
    return new Promise ((resolve, reject) =>{
        const sql = "SELECT * FROM Users";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const users = rows.map((user) => ({ id: user.id, name: user.name, surname: user.surname, city: user.city, level: user.level, age: user.age, friends: user.friends, gender: user.gender, point: user.point}));
            // console.log(users);
            resolve(users);
        });
    });
};

exports.getchallenges = () => {
    return new Promise ((resolve, reject) => {
        const sql = "SELECT * FROM challenge";
        db.all(sql, [], (err, rows) =>{
            if (err){
                reject(err);
                return;
            }
            // const challenges = rows.map((challenge) => ({id: challenge.id, type: challenge.type, question: challenge.question, answer: challenge.answers, min_point: challenge.min_point, max_point: challenge.max_point}));
            resolve(rows);
        });
    });
};

exports.getMainUserPoint = () => {
    return new Promise ((resolve, reject) => {
        const sql = "SELECT point FROM mainUser";
        db.all(sql, [], (err, rows) =>{
            if (err){
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}

exports.addPoint = (req) => {
    return new Promise ((resolve, reject) => {
        const sql = "UPDATE mainUser SET point = point + ?";
        db.all(sql, [req.body.points], (err, rows) =>{
            if (err){
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}


exports.getRankingData = () => {
    return new Promise((resolve, reject) => {
        const sqlRanking = "SELECT name, surname, point FROM Users ORDER BY point DESC";
        const sqlMainUser = "SELECT name, point FROM mainUser ORDER BY point DESC";

        db.all(sqlRanking, [], (err, rankingRows) => {
            if (err) {
                reject(err);
                return;
            }
            db.get(sqlMainUser, [], (err, mainUserRow) => {
                if (err) {
                    reject(err);
                    return;
                }
                const combinedResults = [mainUserRow, ...rankingRows];

                resolve(combinedResults);
            });
        });
    });
};