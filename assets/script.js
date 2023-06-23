function home() {
    window.location.href="../forum/logged_in.html";
}

function editPost() {
    window.location.href="../forum/editPost.html";
}

function editProfile() {
    window.location.href="../forum/editProfile.html"
}

function back() {
    window.location.href="../forum/profile.html"
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

document.getElementById("delete").addEventListener("click", (e) => {
    remove = !remove;
});

