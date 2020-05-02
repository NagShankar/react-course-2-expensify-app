console.log("ARRAY DESTRUCTURING EXAMPLES");

const address = ['720 4th main', '2nd block', 'rajajinagar', 'bengaluru 10'];

//const [houseNum, ,area]=address; //not destructuring city
//console.log(`you're in ${houseNum} ${area}`);

//default value
//const [houseNum, ,area='subramnayanagar']=address; 
//console.log(`you're in ${houseNum} ${area}`);

//You cannot use Numbers for destructuring. Numbers will throw an error because numbers cannot be variable names.
//const [1,2,3,4]=address;
//console.log(1);

//Declaration and assignment can be done separately in destructuring.
//var first, second;
//[first, second] = ["Male", "Female"];
//console.log(first);


//If the number of variables passed to the destructuring array literals are more than the elements in the array, then the variables which aren’t mapped to any element in the array return undefined
//var things = ["Table", "Chair", "Fan", "Rug"];
//var [a, b, c, d, e] = things;
//console.log(e);//Output: undefined

//Destructuring makes working with a function that returns an array as a value more precise. It works for all iterables.
//function runners(){  
//    return ["Sandra", "Ola", "Chi"];
//}
//
//var [a, b, c] = runners();
//console.log(a); //Output: Sandra  console.log(b); //Output: Ola  console.log(c); //Output: Chi

//Default values can also refer to other variables including the one in the same array literal.
//var [first = "Cotlin", second = first] = [];
//console.log(first); //Output: Cotlin, console.log(second); //Output: Cotlin



//If the (…) operator appear on the left-hand side in destructuring then it is a REST PARAMETER. A Rest parameter is used to map all the remaining elements in the array that have not been mapped to the rest variable itself. It is like gathering what is left behind. The Rest variable must always be the last otherwise a SyntaxError is thrown.

//var planets = ["Mercury", "Earth", "Venus", "Mars", "Pluto", "Saturn"];
//var [first, , third, ...others] = planets;
//console.log(others);

//If the (…) operator appears on the right-hand in destructuring then it is a SPREAD SYNTAX. It takes all the other elements in the array which have no variable mapped to them and then maps it to the rest variable.
var planets = ["Mercury", "Earth", "Venus", "Mars", "Pluto", "Saturn"];
var [first, second, ...rest] = ["Mercury", "Earth", ...planets, "Saturn"]; //right hand side will now become ["Mercury", "Earth", "Mercury", "Earth", "Venus", "Mars", "Pluto", "Saturn", "Saturn"] then first="Mercury", second="Earth" then ...rest= "Mercury", "Earth", "Venus", "Mars", "Pluto", "Saturn", "Saturn"
console.log(rest); //["Mercury", "Earth", "Venus", "Mars", "Pluto", "Saturn", "Saturn"]

//When you can have more variables on the left-hand side, it maps the single elements in the array equally to the variables.
var planets = ["Mercury", "Earth", "Venus", "Mars", "Pluto", "Saturn"];
var [first, second, ...rest] = ["Mercury", ...planets];
console.log(first); //Output: Mercury
console.log(second); //Output: Mercury
console.log(rest); //Output: ["Earth", "Venus", "Mars", "Pluto", "Saturn"]

//interchanging Or Swapping Variables
var a, b;
[a, b] = ["Male", "Female"];
[a, b] = [b, a];
console.log(a); //Output: Female
console.log(b); //Output: Male

//Nested Array Destructuring
//You can also do nested destructuring with arrays. The corresponding item must be an array in order to use a nested destructuring array literal to assign items in it to local variables.
var numbers = [8, [1, 2, 3], 10, 12];
var  [a, [d, e, f]] = numbers;
console.log(a); // Output: 8
console.log(d); // Output: 1
console.log(e); // Output: 2

//Multiple Array Destructuring
//You can destructure an array more than once in the same code snippet.

var places = ["first", "second", "third", "fourth"];
var [a, b, , d] = [f, ...rest] = places;
console.log(a); //Output: first
console.log(b); //Output: second
console.log(d); //Output: fourth
console.log(f); //Output: first
console.log(rest); //Output: ["second", "third", "fourth"]

//here it looks like it destructures twice, once [a, b, , d] = places, and again [f, ...rest] = places