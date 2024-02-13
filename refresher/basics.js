const name = "Vic"; // value cant be change
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

console.log(summerizeUser(name, age, isActive));
console.log(userDetail(name, age, phoneNumber, countrycode, nationality));
