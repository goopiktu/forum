const user_register = {
    email: "",
    text: "",
    password: "",
    confirm_pass: "",
};


// function home() {
//     window.location.href="/logged_in.html";
// }

// function editPost() {
//     window.location.href="/editPost.html";
// }

// function createPost() {
//     window.location.href="/createPost.html";
// }

// function editProfile() {
//     window.location.href="/editProfile.html";
// }

// function editReply() {
//     window.location.href="//"
// }

// function openProfile() {
//     window.location.href="/profile.html"
// }

// function back() {
//     window.location.href="/profile.html"
// }

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



// document.querySelector("#submit-post").addEventListener("click", function(e) {
//     e.preventDefault();  // Prevents page refresh

//     let name = currentUser.name;
//     let user = new User(name);  // Create a user based on the current name

//     let title = document.querySelector("input#post-title").value;
//     let content = document.querySelector("textarea#post-body").value;
//     let date = document.querySelector("input#post-date").value;

    
//     if (validateFields(title, content)) {
//         // HINT: If the number of Posts is ZERO, clear post-container first
//         if (postCtr === 0) {
//             document.querySelector("div#post-container").textContent = "";
//         }
//         resetFilter();
//         postCtr = postCtr + 1;
//         let post = new Post(postCtr, title, content, date, user);
//         posts.push(post);

//         refreshDisplay(posts);
//         resetCreatePost();  // Reset the contents of Create Post
//     }
// });




// register
let user = [];

var button = document.querySelector("#submit-button");
var email = document.getElementById("email");
var usernmae = document.getElementById("username");
var password = document.getElementById("password");
var confirm_pass = document.getElementById("confirm-pass");


button.addEventListener("click", function() {
    
    

    var data = {
        "email": email.value,
        "text": username.value,
        "password": password.value,
        "confirm-pass": confirm_pass.value,
    }

    user.push(data);

    document.forms[0].reset();
    console.log(data);
    // console.log("Hello");
});

