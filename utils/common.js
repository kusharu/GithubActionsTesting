
//Annonymous function kept to the variable "stringFormat"
//First parameter is to read the json file after converting to string format
//Second and other other paramater will be the Data randomly generated from faker for firsst name. last name and additional needs 
export const stringFormat = (str, ...args) =>
    str.replace(/{(\d+)}/g, (match, index) => args[index].toString() || "");


/*
Explanation of above function:

It defines  a JavaScript function called stringFormat which allows us to dynamically insert values 
into a string based on placeholders marked with curly braces ({}) where the number inside the braces 
represents the index of the corresponding value in an array of arguments passed to the function. 
Breakdown:
•	# export const stringFormat:
    •	export: This keyword makes the stringFormat function accessible from other modules in your project.
    •	const: This declares a constant variable named stringFormat.

•	#(string, ...args):
    •	string: The first argument is the string template containing placeholders.
    •	...args: This represents a rest parameter, allowing the function to accept an arbitrary number 
        of additional arguments which will be used to replace the placeholders.

•	#str.replace(/{(\d+)}/g, (match, index) => args[index].toString() || ""):
•	    str.replace: This method is used to replace parts of a string with new values.

•	/{(\d+)}/g:
    •   /{(\d+)}/: This is a regular expression that matches any substring enclosed in curly braces ({}) 
        where the content is a number (\d+).
    •	g: The "global" flag tells the regex to find all occurrences in the string, not just the first.

•	(match, index):
    •	match: The matched substring (e.g., "{0}").
    •	index: The index of the matched substring in the original string.

•	args[index].toString() || "":
    •	args[index]: Accesses the argument from the args array at the position indicated by the index.
    •	.toString(): Converts the value to a string.
    •	|| "": If the value at args[index] is undefined or null, it will be replaced with an empty string. 


*/



// Math.random() - generates random number between 0 and 1
export const rangeNum = (min, max) => {
    //Math is a Javascript library based obkect which has the random() method
    return Math.trunc(Math.random() * (max-min) + min);
}   

// //Call this function
// console.log(getRandomInRange(1, 100));