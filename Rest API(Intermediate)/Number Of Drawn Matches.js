'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


/*
 * Complete the 'getNumDraws' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER year as parameter.
 */

const request = require("request")

function myFetch(url) {
    return new Promise((resolve, reject) => {
        request(url, function(error, response, body) {
            if(error) 
                reject(error)
            resolve(body);
        })
    })
}

async function useFetch(year, page = 1, goals)
{
    try {
        let response = await myFetch(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}&page=${page}&team1goals=${goals}&team2goals=${goals}`);
        //console.log(response);
        return JSON.parse(response);
    }
    catch(error)
    {
        return error
    }
}

async function calculatePerGoal(year, goal)
{
    const page1 = await useFetch(year, 1, goal);
    return page1.total;
}

async function getNumDraws(year) {
    let res = 0;
    for(let goal = 0; goal <= 10; goal++)
        res += await calculatePerGoal(year, goal);
    return res;
}
async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const year = parseInt(readLine().trim(), 10);

    const result = await getNumDraws(year);

    ws.write(result + '\n');

    ws.end();
}
