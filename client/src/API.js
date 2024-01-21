"use strict";

const url = "http://localhost:8081";

const simplefetch = async () =>{
    const res = await fetch(url, {
        method: "GET"
    });
    const a = await res.json();
    return a;
};
