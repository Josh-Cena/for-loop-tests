"use strict";

var _loop = function _loop(i) {
  setTimeout(function () {
    console.log(i);
  }, 0);
};
for (var i = 0; i < 3; i++) {
  _loop(i);
}