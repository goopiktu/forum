// THIS STUFF IS FOR REGISTER + SIGN UP
let errorIncomplete = "Please fill up all the fields";
let errorNotMatch = "The passwords you have entered do not match";
let errorShort = "Your password needs to be at least 8 characters";

//THIS FOR UP AND DOWNVOTE
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

function createPost() {
  var title; 
  title = post_thoughts();
  console.log(title);
  // add_to_screen(title);
}

function post_thoughts() {
  window.location.href="/createPost";
  let title = document.querySelector('#post-title').value;
  let body = document.querySelector('#post-body').value;

  // $(".post-container").load('index.html');
  
  // location.replace("logged_in.html");
  // console.log(title);
  // console.log(body);
  // loadIndex();
  add(title,body);
  

}

function loadIndex() {
  fetch('logged_in.html')
  .then(response=> response.text())
  .then(text => document.getElementsByClassName('.post-container').innerHTML = text)
  
}

function add_to_screen(title) {

  const post = "<div class='post-fit'>" +
                  "<a class='opener'>" +
                    "<div class='post-item'>" +
                      "<div class='header-post-item'>" +

                        "<div>" +
                          "<p class='post-title left-align'>"+ title + "</p>" +
                          "<div class='author-date'>" +
                            "<p class='author left-align'>posted by #</p>" +
                            "<p class='outer-date-posted left-align'>1 Day Ago</p>" +
                          "</div>" +
                        "</div>" +

                        "<div class='outer-total-votes'>" +
                            "<button id='outer-upvote' class='outer-arrow' type='button' onclick='increment()'></button>" +
                            "<p class='outer-count'></p>" +
                            "<span class='spacer'></span>" +
                            "<button id='outer-downvote' class='outer-arrow' type='button' onclick='decrement()'></button>" +
                            "<p class='outer-count'></p>" +
                        "</div>" +
                    "</div>" +
                    "<div class='comment-section'>" +
                          
                    "</div>" +
                  "</a>" +
                "</div>";

  document.querySelector(".post-container").innerHTML += post
}

// function getQueryParameter(name) {
//   const urlParams = new URLSearchParams(window.location.search);
//   return urlParams.get(name);
// }
// let post = (event) => {
//     // console.log(post.value);
//     var postFit = document.createElement('div');
//     postFit.classList.add('post-fit');

//     var link = document.createElement('a');
//     linkElement.href = '#';

//     var postItem = document.createElement('div');
//     postItem.classList.add('post-item');


//     var headerPost = document.createElement('div');
//     headerPost.classList.add('header-post-item');
//     headerPost.innerHTML += event;
// }







/* <div class="post-fit">
        <a href="viewpostA.html">
          <div class="post-item">
            <div class="header-post-item">
              <div>
                <p class="post-title left-align">Gobblin</p> ## relies on user input
                <p class="date-posted left-align">1 Day Ago</p> ## needs the system time?
              </div>
              <div class="total-votes"> ## depends on how many clicks it has accumelated not sure with how to do this yet
                  <p class="count">34</p><img class="arrow" src="assets/voting-arrow/up-arrow.png" alt="Up-Arrow">
                  <p class="count">5</p> <img class="arrow" src="assets/voting-arrow/down-arrow.png" alt="Down-Arrow">
              </div>
          </div>
          <div class="comment_section">
                <div class="comment" >
                  <p class="top-comment">Turtle</p>
                  <p></p>
                </div>
                <!-- <div class="comment">
                  <p class="top-comment">Top2</p>
                  <p>Owgei </p>
                </div>
                <div class="comment">
                  <p class="top-comment">Top1</p>
                  <p>Ur Gei </p>
                </div> -->
           </div>
        </a>
</div> */



// THIS STUFF IS FOR REGISTER + SIGN UP

/*  validateFields
    function: checks if the input is complete & if passwords match
*/

function validateFieldsReg(email, username, password, confirm) {
  if (email === "" || username === "") {
      // showError(errorIncomplete);
      return false;
  }
  if (password === "" || password.length < 8) {
      // showError(errorIncomplete);
      return false;
  }
  if (confirm === "") {
      // showError(errorIncomplete);
      return false;
  }
  if (password !== confirm) {
      // showError(errorNotMatch);
      return false;
  }
  // if (!uniqueUsername(username)){
  //   return false;
  // }
  return true;
}

function validateFieldCreatePost(title, body) {
  if (title === "") {
      return false;
  }
  if (body === "") {
      return false;
  }
  return true;
}

function validateFieldSignIn(username, password) {
  if (username === "") {
      showError(errorIncomplete);
      return false;
  }
  if (password === "") {
      showError(errorIncomplete);
      return false;
  }
  return true;
}

function showError(errorTxt) {
    // document.querySelector("#post-error").innerHTML = errorSep + "[ERROR]    " + "<span>" + errorText + "</span>" + "    !     ";
    document.querySelector("#error-container").innerHTML = errorTxt;
    alert(errorTxt);
}

function signUp(){
    let input_email = document.querySelector("input#new-email").value;
    let input_username = document.querySelector("input#new-username").value;
    let input_password = document.querySelector("input#new-password").value;
    let input_confirm = document.querySelector("input#new-confirm").value;
    if (validateFieldsReg(input_email, input_username, input_password, input_confirm)) {
      const fd = new FormData
      alert("UY GUMANA YUNG SUBMIT up");
    }
}

function signIn(){
  let username = document.querySelector("input#username").value;
  let password = document.querySelector("input#password").value;
  if (validateFieldSignIn(username, password)) {
      alert("UY GUMANA YUNG SUBMIT for signin");
  }
}

function createPost(){
  let input_title = document.querySelector("input#post-title").value;
  let textarea_postBody = document.querySelector("textarea#post-body").value;
  if (validateFieldCreatePost(input_title, textarea_postBody)) {
    const fd = new FormData
    alert("UY GUMANA YUNG CreatePost");
  }
}

module.exports = {validateFieldsReg,  validateFieldCreatePost}

console.log("imported main");