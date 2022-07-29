const exp = require("express");
const bp = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = exp();

app.use(bp.urlencoded({
    extended:true
}));
app.use(exp.static("public"));

/**Strings */
let posts = [];

let homeString = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed odit illum, non cumque ipsa ut error, perspiciatis ratione vero a maiores eos quasi corrupti totam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, incidunt enim, quibusdam assumenda a distinctio omnis necessitatibus sit vero voluptas fugit repudiandae dolor eum, accusantium maiores magnam nostrum qui alias. Aut maiores doloremque, laboriosam ex adipisci minima, cupiditate pariatur nam accusantium quae vitae, nostrum mollitia fugiat non. Ratione error eos repudiandae quaerat voluptatum. Sunt aut impedit minima mollitia fugit ipsam quis nemo neque obcaecati?"
let aboutString = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed odit illum, non cumque ipsa ut error, perspiciatis ratione vero a maiores eos quasi corrupti totam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, incidunt enim, quibusdam assumenda a distinctio omnis necessitatibus sit vero voluptas fugit repudiandae dolor eum, accusantium maiores magnam nostrum qui alias. Aut maiores doloremque, laboriosam ex adipisci minima, cupiditate pariatur nam accusantium quae vitae, nostrum mollitia fugiat non. Ratione error eos repudiandae quaerat voluptatum. Sunt aut impedit minima mollitia fugit ipsam quis nemo neque obcaecati?"
let contactString = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed odit illum, non cumque ipsa ut error, perspiciatis ratione vero a maiores eos quasi corrupti totam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, incidunt enim, quibusdam assumenda a distinctio omnis necessitatibus sit vero voluptas fugit repudiandae dolor eum, accusantium maiores magnam nostrum qui alias. Aut maiores doloremque, laboriosam ex adipisci minima, cupiditate pariatur nam accusantium quae vitae, nostrum mollitia fugiat non. Ratione error eos repudiandae quaerat voluptatum. Sunt aut impedit minima mollitia fugit ipsam quis nemo neque obcaecati?"

/**Engine and extension */
app.set("view engine","ejs");

/**Server */
app.listen(process.env.PORT ||3000,function(){
    console.log("Server is up and running");
});

/**GET Requests */

app.get("/", function(req,res){
    res.render("home",{homeString:homeString, content:posts});
});

app.get("/compose",function(req,res){
    res.render("compose");
});

app.get("/about",function(req,res){
    res.render("about",{aboutString:aboutString});
});

app.get("/contact",function(req,res){
    res.render("contact",{contactString:contactString});
});

app.get("/posts/:newRoute",function(req,res){
    let bodyText = _.lowerCase(req.params.newRoute);
    posts.forEach(function(element) {
        let postText = _.lowerCase(element.title);
        if(postText==bodyText){
            res.render("posts",{title:element.title,data:element.data});
        }
    });
});
/**Post requests */

app.post("/compose",function(req,res){
    let publish = {
        title : req.body.title,
        data : req.body.postData
    };
    posts.push(publish);
    res.redirect("/");
})