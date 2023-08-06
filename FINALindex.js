if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// import module `express`
const express = require('express');

// import module `hbs`
const exphbs = require('express-handlebars');

// import module `routes` from `./routes/routes.js`
const routes = require('./routes/route.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

const app = express();
const port = 3000;

//FINALindex.js


// set `hbs` as view engine
app.engine("hbs", exphbs.engine({
    extname: "hbs", 
    helpers: {
        link: function(linkIndex) {
            var result = "viewPost/" + linkIndex;
            return result;
        }, 
        editDelete: function(arg, poster, linkIndex) {
           if (arg === poster){
            return "<button type='submit' form='deletePost' class='bot-button'>Delete</button> <a href='" + linkIndex + "/editPost'><button class='bot-button'>Edit</button></a>"
           }
        }, 
        signUp: function(arg) {
            if (arg){
                return "<a href='/createPost'><button id='sign-up' class='create-post'>Create Post</button></a>"
            }else{
                return "<a href='/signUp'><button id='sign-up' class='create-post'>Sign Up</button></a>"
            }
        }, 
        comment: function(linkIndex) {
            var result = linkIndex + "/createComment";
            return result;
        }, 
        editdeleteComment: function(arg, commenter, linkIndex, index) {
            if (arg === commenter){
             return "<a href='" + linkIndex + "/" + index + "/editComment'><button class='rep-button'>Edit</button></a><button class='rep-button delete-button' data-commentid='{{this._id}}' method='DELETE'>Delete</button>"
            }
        },
        profileLink: function(linkIndex) {
            var result = "/profile/" + linkIndex;
            return result;
        }, 
    }
}));

app.set("view engine", "hbs");
app.set("views", './views');

app.use(express.json());

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));

// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('public'));
// app.use(express.static(__dirname + '/css'));

// handlebar helper 


// exphbs.handlebars.registerHelper('link', function(linkIndex) {
//     var result = "<a href=/viewPost/" + linkIndex + ">";
//     console.log(result);
//     return result;
// });


// define the paths contained in `./routes/routes.js`
app.use('/', routes);

// if the route is not defined in the server, render `../views/error.hbs`
// always define this as the last middleware

// app.use(function (req, res) {
//     res.render('error');
// });

// connects to the database
db.connect();

// binds the server to a specific port
app.listen(port, function () {
    console.log('app listening at port ' + port);
});