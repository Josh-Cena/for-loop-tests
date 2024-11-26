for(var i = 0, getI = function() {
    return i;
}; i < 3; i++, getI = function() {
    return i;
}){
    console.log(getI());
}
