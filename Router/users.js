const express = require('express');

const router = express.Router();

const path = require('path');

const data = {
    title: "Populer Bloglar",
    categories: ["Web Gelistirme", "Mobil Programlama", "Veri Analizi", "Programlama"," Yapay Zeka"],
    blogs: [
        { 
            blogid: 1,
            baslik: "Komple Uygulamali Web Gelistirme ",
            aciklama: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            resim: "1.jpeg",
            anasayfa: true,
            onay: true
        },
        { 
            blogid: 2,
            baslik: "Python Programlama",
            aciklama: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            resim: "2.jpeg",
            anasayfa: true,
            onay: true

        },
        { 
            blogid: 3,
            baslik: "Veri Analizi",
            aciklama: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            resim: "3.jpeg",
            anasayfa: true,
            onay: true


        },
        { 
            blogid: 4,
            baslik: "Mobil Programlama",
            aciklama: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            resim: "4.jpeg",
            anasayfa: false,
            onay: true

        }
    ]
}


// router.use("/blog/:blogid", function (req, res) {
//     // console.log(req.params);
//     // console.log(req.params.blogid);
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


router.get("/blog/category/:categorid", async function (req, res) {
    const id = req.params.categorid;

    try {
        const [blogs,] = await db.execute('select * from blog where categoryid = ?', [id]);
        const [category, ] = await db.execute('select * from category')
        res.render('users/blog', {
            title: category.find(c => c.categoryid == id).name,
            blogs: blogs,
            categories: category,
            selectedCategory: id
        } )

    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }
})



router.get("/blog/:blogid", async function (req, res) {

    const id = req.params.blogid;

    try {
        const [blogs,] = await db.execute('select * from blog where blogid = ? ', [id]);
        
        const blog = blogs[0];

        if (blog) {
            return res.render('users/blog-details',{
            title: blog.baslik,
            blog: blog
        });
        }

        res.redirect('/');       

    }
    catch (err){
        console.error('Veri tabani hatasi: ', err);
    }

      
});

router.get("/blog", async function (req, res) {


    try {
        const [blog,] = await db.execute('select * from blog where onay = 1')
        const [category, ] = await db.execute('select * from category')
        res.render( 'users/home',{
            title: "Tüm Bloglar",
            blogs: blog,
            categories: category,
            selectedCategory: null
        });
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }


    // db.execute('select * from blog where  onay = 1')
    // .then(result => {
    //     db.execute('select * from category')
        
    //     .then(sonuc => {
    //         res.render( 'users/home',{
    //         title: "Populer Bloglar",
    //         blogs: result[0],
    //         categories: sonuc[0]
    //     });
    //     })
           
    //     .catch(err => {
    //         console.error('Veri tabani hatasi: ', err);
    //     });
    // })
    // .catch(err => {
    //     console.error('Veri tabani hatasi: ', err);
    // });

});

router.get("/", async function (req, res) {

    try {
        const [blog,] = await db.execute('select * from blog where anasayfa = 1 ');
        const [category, ] = await db.execute('select * from category')
        res.render( 'users/home',{
            title: "Populer Bloglar",
            blogs: blog,
            categories: category,
            selectedCategory: null
        });

    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }


    // db.execute('select * from blog where anasayfa = 1 ')
    // .then(result => {

    //     db.execute('select * from category')
        
    //     .then(sonuc => {
    //         res.render( 'users/home',{
    //         title: "Populer Bloglar",
    //         blogs: result[0],
    //         categories: sonuc[0]
    //     });
    //     })
           
    //     .catch(err => {
    //         console.error('Veri tabani hatasi: ', err);
    //     });
    
    //     })
        
    // .catch(err => console.error('Veri tabani hatasi: ', err));
    
});

module.exports = router;

