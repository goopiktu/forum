

let postTemp = document.querySelector("#contentTemp").innerHTML; 

let posttempFunc = Handlebars.compile(postTemp);

let temp1obj1 = {
    content:"This part here can incorporate HTML tags",
  };

let temp1FromObj1 = posttempFunc(temp1obj1);

document.querySelector("#content").innerHTML = temp1FromObj1;