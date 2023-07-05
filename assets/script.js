function home() {
    window.location.href="/logged_in.html";
}

function editPost() {
    window.location.href="/editPost.html";
}

function createPost() {
    window.location.href="/createPost.html";
}

function editProfile() {
    window.location.href="/editProfile.html";
}

function editReply() {
    window.location.href="//"
}

function openProfile() {
    window.location.href="/profile.html"
}

function back() {
    window.location.href="/profile.html"
}

// would it be better/possible to use this function instead of the several diff functions?
/*  openPage
    function: Changes the window location to the location indicated by the parameter
    fileName - file name of the html page you're going to
*/
function openPage(fileName){
    window.location.href="/"+fileName+".html";
}

let remove = false;
let a = document.getElementsByClassName("content");

for(let i = 0; i < a.length; i += 1) {
    a[i].addEventListener("click", (e) => {
        if (remove === false){
            return;
        }
        let x = e.target;
        let y = document.getElementsByClassName("box")[0];
        y.removeChild(x);
    });
}

// document.getElementById("delete").addEventListener("click", (e) => {
//     remove = !remove;
// });