console.log("OBJECT DESTRUCTURING EXAMPLES");

const person = {
    name:'nag',
    age:27,
    location: {
       city:'bengaluru',
        temp:49
    }
};

const person2 = {
    name:'mithun',
    age:21,
    location: {
       city: {
               area:'rajajkumar road',
               pincode:560010
             },
        temp:30
    }
};


//simple destructuring
//const {name, age} = person;
//console.log(`${name} is ${age}`);


//destructuring with default value for name
//const {name = 'marc', age} = person;
//console.log(`${name} is ${age}`);


//renaming name property of the object
//const {name : firstName, age} = person;
//console.log(`${firstName} is ${age}`);

//combining both default value and renaming
//const {name : firstName = 'marquez', age} = person;
//console.log(`${firstName} is ${age}`);



//nested destructuring - level 1
//const {city : mycity = 'BLR', temp} = person.location;
//console.log(`${mycity} has ${temp}`);

//--------------OR------------------

//nested destructuring - level 1
//const {location : {city, temp}} = person;
//console.log(`${city} has ${temp}`);

//nested destructuring and default value - level 1
//const {location : {city = 'mysore', temp}} = person;
//console.log(`${city} has ${temp}`);

//nested destructuring - level 2
//const {name, location : {city : {area}, temp}} = person2;
//console.log(`${name} lives in ${area} which has ${temp} temperature`);

//nested destructuring and default value - level 2
//const {name, location : {city : {area = 'rajajinagar'}, temp}} = person2;
//console.log(`${name} lives in ${area} which has ${temp} temperature`);

//nested destructuring and default value and renaming - level 2
const {name:myname, location : {city : {area : myarea = 'rajajinagar'}, temp}} = person2;
console.log(`${myname} lives in ${myarea} which has ${temp} degree temperature`);

//destructuring with functions
function add({a, b}){
  return a+b
}

console.log(add({a:10,b:2}));