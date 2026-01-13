
const express = require('express');

const app = express();
const path = require('path');

const userRoutes = require('./Router/users');
const adminRoutes = require('./Router/admin');





app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: false}))



app.use("/libs",express.static(path.join(__dirname,'node_modules')));
app.use(express.static(path.join(__dirname,'public')));


app.use(adminRoutes);

app.use(userRoutes);
// app.use("libs",express.static('node_modules'));
// app.use("static",express.static('public'));



// app.use(function (req, res, next) {
//     console.log('Middleware 1');
//     next();
// })

// app.use(function (req, res, next) {
//     console.log('Middleware 2');
//     next();
// })

// app.use(function (req, res) {
//     console.log('Middleware 3');
//     res.send('<h1>Home Page</h1>');
// })


// app.use("/about", function (req, res) {
    
//     res.send('<h1>This is about page</h1>'); 
// });  

// app.use("/blog/:blogid", function (req, res) {
//     // console.log(req.params);
//     // console.log(req.params.blogid);
//     // console.log(req.params.username);
//     // res.send('<h1>This is blog detail page</h1>');
//     // console.log(__dirname);
//     // console.log(__filename);
//     // res.end();
//     res.sendFile(path.join(__dirname, '/views/users', 'blog-details.html'));
// });

// app.use("/blog", function (req, res) {
//     res.sendFile(path.join(__dirname, '/views/users', 'blog.html'));

// });

// app.use("/", function (req, res) {
//     res.sendFile(path.join(__dirname, '/views/users', 'home.html'));
// });
   


app.listen(3000, () => {
  console.log('Blog app is running on http://localhost:3000');
});


