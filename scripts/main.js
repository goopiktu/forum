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


const title = document.querySelector('post-title');
console.log(title);


if (title) {
  title.addEventListener('input', function handleChange(event) {
    console.log(event.target);
  
    console.log(event.target.value);
  });

}

