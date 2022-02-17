
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
 * Complete the 'getWinnerTotalGoals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING competition
 *  2. INTEGER year
 */
const request = require("request")

function myFetch(url) {
    //console.log(url)
    return new Promise((resolve, reject) => {
        request(url, function(error, response, body) {
            if(error) 
                reject(error)
            resolve(body);
        })
    })
}


async function useFetch(url)
{
    try {
        let response = await myFetch(url);
        //console.log(response);
        return JSON.parse(response);
    }
    catch(error)
    {
        return error
    }
}

async function calculateGoals(cometition, year, team, teamNumber)
{
    const page1 = await useFetch(`https://jsonmock.hackerrank.com/api/football_matches?competition=${cometition}&year=${year}&team${teamNumber}=${team}&page=1`);
    //console.log(page1)
    const totalPages = page1.total_pages;
    //console.log(totalPages);
    let count = 0;
    if(totalPages > 0)
    {
        for(let i = 0; i < page1.data.length; i++)
        {
            //console.log(page1.data[`team${teamNumber}goals`])
            count += Number(page1.data[i][`team${teamNumber}goals`]);
        }
        for(let page = 2; page <= totalPages; page++)
        {
            const pageDetails = await useFetch(`https://jsonmock.hackerrank.com/api/football_matches?competition=${cometition}&year=${year}&team${teamNumber}=${team}&page=${page}`);
            for(let i = 0; i < pageDetails.data.length; i++)
                count += Number(pageDetails.data[i][`team${teamNumber}goals`]);
        }
    }
    //console.log(count);
    return count;
}

async function getWinnerTotalGoals(competition, year) {
    const competitionDetails = await useFetch(`https://jsonmock.hackerrank.com/api/football_competitions?name=${competition}&year=${year}`);
    const winner = competitionDetails.data[0].winner
    //console.log(competitionDetails)
    const goals1 = await calculateGoals(competition, year, winner, 1);
    const goals2 = await calculateGoals(competition, year, winner, 2);
    return goals1 + goals2;
}

async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const competition = readLine();

    const year = parseInt(readLine().trim(), 10);

    const result = await getWinnerTotalGoals(competition, year);

    ws.write(result + '\n');

    ws.end();
}
