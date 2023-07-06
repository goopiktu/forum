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



const title = document.getElementById('title');

title.addEventListener('input', function handleChange(event) {
  console.log(event.target);

  console.log(event.target.value);
});







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