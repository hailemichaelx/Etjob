//jshint esversion:6

const express = require("express");
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")
const multer = require("multer")

const homeStartingContent = "Simple and ..... Ethiopian Job vacancy website.Ethiopian Reporter Jobs Vacancy in Ethiopia";
const aboutContent = "Find latest Jobs in Ethiopia, vacancies in Ethiopia on Ethiojobs. Apply now for Ethiopian NGO jobs, accounting and finance jobs and IT jobs Find latest Jobs in Ethiopia, vacancies in Ethiopia on Ethiojobs. Apply now for Ethiopian NGO jobs, accounting and finance jobs and IT jobs";
const contactContent = "1111122222222222233333333333333444";

const app = express();



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
 res.render("home", {
   startingContent: homeStartingContent,
   posts: posts
      });     //views/home.ejs
});
app.get("/about", function(req, res){
 res.render("about", { aboutCon: aboutContent });     //views/home.ejs
});
app.get("/contact", function(req, res){
 res.render("contact", { contactCon: contactContent });     //views/home.ejs
});
app.get("/compose", function(req, res){
 res.render("compose");     //views/home.ejs
});


app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    
    content: req.body.postBody
  };

  // console.log(req.body.postTitle);
  // console.log(req.body.postBody);

  app.get("/post", function(req, res){
   res.render("post");
  });

  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
      posts.forEach(function(post){
        const storedTitle = _.lowerCase(post.title) ;

                   if (storedTitle === requestedTitle){
                      res.render("post", {
                        title: post.title,
                        content: post.content
                      });
                   }
                   });
      //   if (storedTitle === requestedTitle){
      //     console.log("match found");
      //   } else {
      //     console.log("not found");
      //   }
      // });
});
app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
