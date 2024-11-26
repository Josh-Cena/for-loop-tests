var _loop = function(i) {
    setTimeout(function() {
        console.log(i);
    }, 0);
};
for(var i = 0; i < 3; i++)_loop(i);
