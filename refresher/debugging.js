"use strict";

const measureKelvin = function () {
  const measurement = {
    type: "temp",
    unit: "celcius",
    //C) FIX THE BUG
    value: Number(prompt("Degrees celsius")),
  };

  //B) FIND THE BUG
  // console.log(measurement);
  console.table(measurement);
  //console.log(measurement.value);
  //   console.warn(measurement.value);
  //   console.error(measurement.value);

  const kelvin = measurement.value + 273;
  return kelvin;
};

//A) IDENTIFY THE BUG
console.log(measureKelvin());
