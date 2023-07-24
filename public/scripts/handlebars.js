
//edit post 
let postTemp = document.querySelector("#postTemp").innerHTML; 

let posttempFunc = Handlebars.compile(postTemp);

let postCont = {
    username: "nootdoot", 
    title: "Goblin",
    datePosted: "June 7, 2023",
    body:"This part here can ow HTML tags",
    edited:"(edited)", 
    upvote: 3, 
    downvote: 35
  };

let tempPostCont = posttempFunc(postCont);

document.querySelector("#postContent").innerHTML = tempPostCont;


const Comment = function(commentID)
{
    

}

// edit comment

let commentTemp = document.querySelector("#commentTemp").innerHTML; 

let commenttempFunc = Handlebars.compile(commentTemp);

let commentCont = {
    username: "pootTroot", 
    datePosted: "Dat", 
    body: "my PrEciOussss", 
    edited: Number, 
    upvote: 0, 
    downvote: 0
  };

let tempCommentCont = commenttempFunc(commentCont);

document.querySelector("#commentBox").innerHTML += tempCommentCont;
document.querySelector("#commentBox").innerHTML += tempCommentCont;


