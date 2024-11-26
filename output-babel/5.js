"use strict";

for (var i = 0, getI = function getI() {
    return i;
  }, incrementI = function incrementI() {
    return i++;
  }; getI() < 3; incrementI()) {
  console.log(i);
}