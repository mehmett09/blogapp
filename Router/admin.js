const express = require('express');

const router = express.Router();

const db = require('../data/db');

const fs = require('fs');

const path = require('path');
const { title } = require('process');


const imageUpload = require('../helpers/image-upload');






// router.use("/admin/blog/create", function (req, res) {
//     res.sendFile(path.join(__dirname, '../views/admin', 'blog-create.html'));

// });

// router.use("/admin/blog/:blogid", function (req, res) {
//     res.sendFile(path.join(__dirname, '../views/admin', 'blog-edit.html'));

// });

// router.use("/admin/blog", function (req, res) {
//     res.sendFile(path.join(__dirname, '../views/admin', 'blog-list.html'));

// });



router.get("/admin/blog/delete/:blogid", async function (req, res ) {
    const blogid = req.params.blogid;

    try {

        const [blogs, ] = await db.execute("select * from blog where blogid=?", [blogid]);
        const blog = blogs[0];

        res.render('admin/blog-delete', {
            title: "Blog Silme",
            blog:blog
        });

    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }
});


router.post("/admin/blog/delete/:blogid", async function (req, res) {
    const blogid = req.body.blogid;
    try{
        await db.execute("delete from blog where blogid=?", [blogid]);
        res.redirect('/admin/blog?action=delete');
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }
});



router.get("/admin/category/delete/:categoryid", async function (req, res ) {
    const categoryid = req.params.categoryid;

    try {

        const [categories, ] = await db.execute("select * from category where categoryid=?", [categoryid]);
        const category = categories[0];

        res.render('admin/category-delete', {
            title: "Kategori Silme",
            category:category
        });

    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }
});


router.post("/admin/category/delete/:categoryid", async function (req, res) {
    const categoryid = req.body.categoryid;
    try{
        await db.execute("delete from category where categoryid=?", [categoryid]);
        res.redirect('/admin/categories?action=delete');
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }
});




router.get("/admin/blog/create", async function (req, res) {

    try {

        const [categories, ] = await db.execute('select * from category');

        res.render('admin/blog-create', {
            title: "Yeni Blog Ekle",
            categories: categories
        });
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }

    

});

router.post("/admin/blog/create", imageUpload.upload.single("resim"), async (req, res) => {

    const baslik = req.body.baslik ?? null;
    const aciklama = req.body.aciklama ?? null;

    let kategori = req.body.kategori ? Number(req.body.kategori) : null;

    const anasayfa = req.body.anasayfa === "on" ? 1 : 0;
    const onay = req.body.onay === "on" ? 1 : 0;

    const resim = req.file ? req.file.filename : null;

    try {
        

        await db.execute(
            "INSERT INTO blog (baslik, aciklama, resim, categoryid, anasayfa, onay) VALUES (?, ?, ?, ?, ?, ?)",
            [baslik, aciklama, resim, kategori, anasayfa, onay]
        );

        res.redirect("/admin/blog?action=create");
    } catch (err) {
        console.error("⛔ CREATE HATA:", err);
    }
});




router.get("/admin/category/create", async function (req, res) {

    try {
        

        res.render('admin/category-create', {
            title: "Yeni Kategori Ekle",
            
        });
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }

    

});

router.post("/admin/category/create", async function (req, res) {
    
    const name = req.body.name;
    

    try {


        await db.execute('insert into category (name) values (?)', [name]);

        

        res.redirect('/admin/categories?action=create');
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }

});

// dinamik sayfalar icin boyle yazilir

router.get("/admin/blogs/:blogid", async function (req, res) {

    const blogid = req.params.blogid;

    try {
        const [blogs, ] = await db.execute('select * from blog where blogid=?', [blogid]);
        const [categories, ] = await db.execute('select * from category');
        const blog = blogs[0];

        if (blog) {
            return res.render('admin/blog-edit', {
                title:blog.baslik,
                blog:blog,
                categories:categories
            });
        }

        res.redirect('/admin/blog');
    }

    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }

    

});


router.post("/admin/blogs/:blogid", imageUpload.upload.single("resim"), async (req, res) => {

    const blogid = Number(req.params.blogid);
    if (isNaN(blogid)) return res.status(400).send("Geçersiz blog id");

    const baslik = req.body.baslik;
    const aciklama = req.body.aciklama;
    const kategori = req.body.kategori ? Number(req.body.kategori) : null;
    const anasayfa = req.body.anasayfa === "on" ? 1 : 0;
    const onay = req.body.onay === "on" ? 1 : 0;

    let resim = req.body.eskiResim;

    if (req.file) {
        resim = req.file.filename;

        if (req.body.eskiResim) {
            fs.unlink("public/images/" + req.body.eskiResim, () => {});
        }
    }

    try {
        await db.execute(
            `UPDATE blog
             SET baslik=?, aciklama=?, resim=?, categoryid=?, anasayfa=?, onay=?
             WHERE blogid=?`,
            [baslik, aciklama, resim, kategori, anasayfa, onay, blogid]
        );

        res.redirect("/admin/blog?action=edit");
    } catch (err) {
        console.error("⛔ EDIT HATA:", err);
    }
});



router.get("/admin/categories/:categoryid", async function (req, res) {

    const categoryid = req.params.categoryid;

    try {
        const [categories, ] = await db.execute('select * from category where categoryid=?', [categoryid]);
        const category = categories[0];

        if (category) {
            return res.render('admin/category-edit', {
                title:category.name,
                category:category
            });
        }

        res.redirect('/admin/categories');
    }

    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }

    

});


router.post("/admin/categories/:categoryid", async function (req, res) {

    const categoryid = req.body.categoryid;
    const name = req.body.name;
    

    try {
        await db.execute('UPDATE category SET name = ? WHERE categoryid = ?', [ name, categoryid ]);
        res.redirect(`/admin/categories?action=edit&categoryid=${categoryid}`);
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }

});

router.get("/admin/blog", async function (req, res) {

    try {
        
        
        const [blogs, ] = await db.execute('select blogid, baslik, resim from blog');

        


        res.render( 'admin/blog-list', {
            title: "Blog Listesi",
            blogs: blogs,
            action: req.query.action,
            blogid: req.query.blogid
        });
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }

    

});


router.get("/admin/categories", async function (req, res) {

    try {

        const [categories, ] = await db.execute('select * from category');
        
        res.render( 'admin/category-list', {
            title: "Kategori Listesi",
            categories: categories,
            action: req.query.action,
            categoryid: req.query.categoryid
        });
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }

    

});




module.exports = router;

