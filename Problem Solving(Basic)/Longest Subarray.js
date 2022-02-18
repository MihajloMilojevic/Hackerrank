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
 * Complete the 'longestSubarray' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */


function longestSubarray(arr) {
    // Write your code here
    let maxLength = 0;
    console.log("before for")
    for(let i = 0; i < arr.length; i++)
    {
        console.log("i", i)
        let subarray = [arr[i]];
        let different = null;
        for(let j = i + 1; j < arr.length; j++)
        {
            if(arr[j] === arr[i])
            {
                subarray.push(j);
                continue;
            }
            if(Math.abs(arr[i] - arr[j]) > 1 || (different !== null && different !== arr[j]))
            {
                console.log("break", i, different)
                break;
            }
            if(different === null)
                different = arr[j]
            subarray.push(arr[j]);
        }
        console.log(subarray)
        if(maxLength < subarray.length)
            maxLength = subarray.length;
    }
    return maxLength;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine().trim(), 10);

    let arr = [];

    for (let i = 0; i < arrCount; i++) {
        const arrItem = parseInt(readLine().trim(), 10);
        arr.push(arrItem);
    }

    const result = longestSubarray(arr);

    ws.write(result + '\n');

    ws.end();
}
