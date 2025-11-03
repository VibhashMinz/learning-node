const fname = "Vic"; // value cant be change
let age = 28; // value can be change
const isActive = true;
let phoneNumber = 1234567890;
let countrycode = "+91";
const nationality = "Indian";

age = 27;

function summerizeUser(userName, userAge, userActive) {
  return (
    "Name is " +
    userName +
    ", age is " +
    userAge +
    " and the user is active: " +
    userActive
  );
}

///Arrow function

///const sum = (a,b,c)=> a+b+c;
const userDetail = function (userName, userAge, phone, code, nationality) {
  return (
    "Name is " +
    userName +
    ", age is " +
    userAge +
    " and the phone number is " +
    code +
    "-" +
    phone +
    " has " +
    nationality +
    " citizenship"
  );
};

///PROBLEM 1

//Given an array of temperatures of one day,
// calculate the temperature amplitude.Keep in mind that sometimes
// there might be a sensor error.

const temperatures = [
  null,
  3,
  -2,
  -6,
  -1,
  -21,
  "error",
  9,
  13,
  17,
  15,
  14,
  9,
  5,
];
const temperatures1 = [null, 3, -2, 20, -1, "error", 9, 13, 19, 15, 14, 9, 5];

/* 1) Understanding the problem
- what is temp amplitude? -- difference between highest and lowest temp.
-How to compute max and min temp?
-What's a sensor error? And what to do? 

2)Breaking up into sub problems
-How to ignore error?
-Find max value in temp array
-Find min value in tem array
-Substract min from max and return it


3) Research

*/

///PROBLEM 2
/*
//We will recieve two array of temps

1) understanding the problem 
- With 2 arrays, should we implement functionality twice? 
NO! Just merge two array

2) Breaking up into sub-problems
- How to merge 2 arrays?

3) Research

 */
const calcTempAmplitude = function (temps1, temps2) {
  //merge the arrays by using spread operator or concat method o
  const temps = [...temps1, ...temps2]; //const temps = temps.concat(temps2);
  //find max value from the array
  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const currentTemp = temps[i]; // since we were using temps[i] every where so define a variable

    //check for error
    if (typeof currentTemp !== "number") continue;

    if (currentTemp > max) max = currentTemp;
    if (currentTemp < min) min = currentTemp;
  }
  console.log({ max, min });
  return max - min;
};

console.log(calcTempAmplitude(temperatures, temperatures1));
console.log(summerizeUser(fname, age, isActive));
console.log(userDetail(fname, age, phoneNumber, countrycode, nationality));
