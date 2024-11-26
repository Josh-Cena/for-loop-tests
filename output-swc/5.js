for(var i = 0, getI = function() {
    return i;
}, incrementI = function() {
    return i++;
}; getI() < 3; incrementI()){
    console.log(i);
}
