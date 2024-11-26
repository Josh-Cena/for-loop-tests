"use strict";
var _loop_init_1 = function () {
    var i = 0, getI = function () { return i; };
    out_i_1 = i;
};
var _loop_1 = function (i, getI) {
    if (inc_1)
        i++, getI = function () { return i; };
    else
        inc_1 = true;
    console.log(getI());
    out_i_1 = i;
};
var out_i_1, out_getI_1, inc_1 = false;
_loop_init_1();
for (var i = out_i_1, getI = out_getI_1; i < 3;) {
    _loop_1(i, getI);
    i = out_i_1;
}
