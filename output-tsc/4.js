"use strict";
var _loop_init_1 = function () {
    var i = 0, getI = function () { return i; };
    out_i_1 = i;
};
var out_i_1, out_getI_1;
_loop_init_1();
for (var i = out_i_1, getI = out_getI_1; i < 3;) {
    i++;
    console.log(getI());
}
