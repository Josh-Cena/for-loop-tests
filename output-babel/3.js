"use strict";

for (var i = 0, getI = function getI() {
    return i;
  }; i < 3; i++, getI = function getI() {
  return i;
}) {
  console.log(getI());
}