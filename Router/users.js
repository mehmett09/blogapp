const express = require('express');

const router = express.Router();
exports.router = router;

const path = require('path');



const data = {
    title: "Populer Bloglar",
    categories: ["Web Gelistirme", "Mobil Programlama", "Veri Analizi", "Programlama"," Yapay Zeka"],
    blogs: [
        { 
            id: 1,
            baslik: "Komple Uygulamali Web Gelistirme ",
            aciklama: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            resim: "1.jpeg",
            anasayfa: true,
            onay: true
        },
        { 
            id: 2,
            baslik: "Python Programlama",
            aciklama: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            resim: "2.jpeg",
            anasayfa: true,
            onay: true

        },
        { 
            id: 3,
            baslik: "Veri Analizi",
            aciklama: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            resim: "3.jpeg",
            anasayfa: true,
            onay: true


        },
        { 
            id: 4,
            baslik: "Mobil Programlama",
            aciklama: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            resim: "4.jpeg",
            anasayfa: false,
            onay: true

        }
    ]
}




// router.use("/blog/:id", function (req, res) {
//     // console.log(req.params);
//     // console.log(req.params.id);
//     // console.log(req.params.username);
//     // res.send('<h1>This is blog detail page</h1>');
//     // console.log(__dirname);
//     // console.log(__filename);
//     // res.end();
//     res.sendFile(path.join(__dirname, '../views/users', 'blog-details.html'));
// });

// router.use("/blog", function (req, res) {
//     res.sendFile(path.join(__dirname, '../views/users', 'blog.html'));

// });

// router.use("/", function (req, res) {
//     res.sendFile(path.join(__dirname, '../views/users', 'home.html'));
// });





// const connection = mysql.createConnection({
//     host: 'localhost',
//     user:'root',
//     password:'My501160',
//     database:'blogapp'
// });


const db = require('../data/db');
const { title } = require('process');

const userController = require('../controllers/user-controller');

router.get("/blog/category/:slug", userController.blog_by_category);



router.get("/blog/:slug", userController.blog_details);

router.get("/blog", userController.blog_list);

router.get("/", userController.home_page);

module.exports = router;

