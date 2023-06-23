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

let remove = true;
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

document.getElementById("delete").addEventListener("click", (e) => {
    remove = !remove;
});

