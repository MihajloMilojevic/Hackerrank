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
 * Complete the 'stringAnagram' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY dictionary
 *  2. STRING_ARRAY query
 */

function areAnagrams(str1, str2) {
    const sorted1 = str1.split("").sort().join();
    const sorted2 = str2.split("").sort().join();
    return sorted1 === sorted2
}

function sortString(str) {
    return str.split("").sort().join()
}

function stringAnagram(dictionary, query) {
    // Write your code here
    let res = [];
    let dic = {};
    for(let i of dictionary)
    {
        const sortedItem = sortString(i);
        if(!dic.hasOwnProperty(sortedItem))
            dic[sortedItem] = 0;
        dic[sortedItem]++;
    }
    for(let i = 0; i < query.length; i++)
    {
        const sorted = sortString(query[i]);
        if(dic.hasOwnProperty(sorted))
            res.push(dic[sorted])
        else
            res.push(0);
    }
    
    return res;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const dictionaryCount = parseInt(readLine().trim(), 10);

    let dictionary = [];

    for (let i = 0; i < dictionaryCount; i++) {
        const dictionaryItem = readLine();
        dictionary.push(dictionaryItem);
    }

    const queryCount = parseInt(readLine().trim(), 10);

    let query = [];

    for (let i = 0; i < queryCount; i++) {
        const queryItem = readLine();
        query.push(queryItem);
    }

    const result = stringAnagram(dictionary, query);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
