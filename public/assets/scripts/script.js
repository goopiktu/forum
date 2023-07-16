// function home() {
//     window.location.href="/logged_in.html";
// }

// function editPost() {
//     window.location.href="/editPost.html";
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

$(function() {

    $( "#post-display" ).load('/viewpost/viewpostA.html', function (content) {
        $( "#post-display" ).dialog({
            draggable: false,
            autoOpen: false, 
            modal: true,
            position: {
             my: "center",
             at: "center"
            },
            buttons: {
               OK: function() {$(this).dialog("close");}
            },
            width: "50%",
         });
         $( ".opener" ).on("click", function() {
            $( "#post-display" ).dialog( "open" );
         });
         

    }); 
    
});

