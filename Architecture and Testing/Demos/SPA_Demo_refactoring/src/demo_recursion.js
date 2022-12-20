/**
Recursion is when a function calls itself until someone stops it. 
It can be used instead of a loop. 
If no one stops it, it'll recurse forever and crash your program. 
A base case is a condition that stops the recursion. 

takuv tip function e goTo() -> app.js file
*/

function countdown(start) {
    console.log(start);
    if (start > 0) {
        countdown(start-1);
    }
}

countdown(10); // otgovora e vsichki chisla ot 10 do 0