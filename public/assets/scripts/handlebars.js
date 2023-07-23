

//edit post 
let postTemp = document.querySelector("#contentTemp").innerHTML; 

let posttempFunc = Handlebars.compile(postTemp);

let postCont = {
    title: "Goblin",
    datePosted: "June 7, 2023",
    username: "nootdoot", 
    upvote: "3", 
    downvote: "35",
    body:"This part here can ow HTML tags",
    edited:"(edited)", 
  };

let tempPostCont = posttempFunc(postCont);

document.querySelector("#postContent").innerHTML = tempPostCont;


// edit comment

// let postTemp = document.querySelector("#contentTemp").innerHTML; 

// let posttempFunc = Handlebars.compile(postTemp);

// let temp1obj1 = {
//     title: "Goblin",
//     datePosted: "June 7, 2023",
//     username: "nootdoot", 
//     upvote: "3", 
//     downvote: "35",
//     body:"This part here can ow HTML tags", 

//   };

// let temp1FromObj1 = posttempFunc(temp1obj1);

// document.querySelector("#postContent").innerHTML = temp1FromObj1;