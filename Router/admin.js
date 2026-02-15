const express = require('express');

const router = express.Router();

// const db = require('../data/db');
//sequelize kullanildigi icin db baglantisi artik gerek kalmadi



const path = require('path');
const { title } = require('process');


const imageUpload = require('../helpers/image-upload');


const adminController = require('../controllers/admin-controller');




// router.use("/admin/blog/create", function (req, res) {
//     res.sendFile(path.join(__dirname, '../views/admin', 'blog-create.html'));

// });

// router.use("/admin/blog/:id", function (req, res) {
//     res.sendFile(path.join(__dirname, '../views/admin', 'blog-edit.html'));

// });

// router.use("/admin/blog", function (req, res) {
//     res.sendFile(path.join(__dirname, '../views/admin', 'blog-list.html'));

// });



router.get("/admin/blog/delete/:id", adminController.get_admin_blog_delete);


router.post("/admin/blog/delete/:id", adminController.post_admin_blog_delete);



router.get("/admin/category/delete/:id", adminController.get_admin_category_delete);

router.post("/admin/category/delete/:id", adminController.post_admin_category_delete);




router.get("/admin/blog/create", adminController.get_admin_blog_create);

router.post("/admin/blog/create", imageUpload.upload.single("resim"), adminController.post_admin_blog_create);





router.get("/admin/category/create", adminController.get_admin_category_create);

router.post("/admin/category/create", adminController.post_admin_category_create);



router.get("/admin/blogs/:id", adminController.get_admin_blog_edit);


router.post("/admin/blogs/:id", imageUpload.upload.single("resim"), adminController.post_admin_blog_edit);

router.post("/admin/categories/remove", adminController.post_admin_category_remove);


router.get("/admin/categories/:id", adminController.get_admin_category_edit);


router.post("/admin/categories/:id", adminController.post_admin_category_edit);

router.get("/admin/blog", adminController.get_admin_blog_list);


router.get("/admin/categories", adminController.get_admin_category_list);




module.exports = router;

