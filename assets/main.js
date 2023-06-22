var upclicks = 0;
var downclicks = 0;

function increment() {
    upclicks += 1;
    document.getElementById("upclicks").innerHTML = upclicks;
};
function decrement() {
    downclicks += 1;
    document.getElementById("downclicks").innerHTML = downclicks;
};