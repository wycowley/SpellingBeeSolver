import fetch from "node-fetch";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const prompt = require("prompt-sync")();

const outer = prompt("Enter all outer letters (ex. pecant): ");
const inner = prompt("Enter all inner letters (ex. m): ");

const total = outer + inner;
console.log(total);
// imports all english words hahahaha
const result = await fetch("https://raw.githubusercontent.com/dolph/dictionary/master/unix-words");
const text = await result.text();

for (let length = 4; length < 12; length++) {
    let regexString = `[\\s]` + `[${total}]`.repeat(length) + `[\\s]`;
    let regex = new RegExp(regexString, "g");

    // console.log(regex);
    let initialMatches = text.match(regex);
    let finalMatches = [];
    initialMatches.forEach((match, index) => {
        if (match.includes(inner) && initialMatches.indexOf(match) == index) {
            finalMatches.push(match.trim());
        }
    });
    // let finalMatches = initialMatches.filter((match, index) => match.includes(inner) && initialMatches.indexOf(match) == index);
    if (finalMatches.length > 0) {
        console.log("Length: " + length);
        console.log(finalMatches.join(" "));
    }
}
