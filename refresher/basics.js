const name = "Vic"; // value cant be change
let age = 28; // value can be change
const isActive = true;

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

console.log(summerizeUser(name, age, isActive));
