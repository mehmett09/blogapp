const Blog = require('../models/blog');
const Category = require('../models/category');
const fs = require('fs');
const sequelize = require("../data/db");
const slugiField = require("../helpers/slugfield");

exports.get_admin_blog_delete = async function (req, res ) {
    const id = req.params.id;

    try {

        // const [blogs, ] = await db.execute("select * from blog where id=?", [id]);
        // const blog = blogs[0];

        const blog = await Blog.findByPk(id);

        if (blog) {
            return res.render('admin/blog-delete', {
            title: "Blog Silme",
            blog:blog
        });
        }
        res.redirect('/admin/blog');

        

    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }
};


exports.post_admin_blog_delete = async function (req, res) {
    const id = req.body.id;
    try{
        // await db.execute("delete from blog where id=?", [id]);

        const blog = await Blog.findByPk(id);
        if (blog) {
            await blog.destroy();
            return res.redirect('/admin/blog?action=delete');
        }

        res.redirect('/admin/blog');
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }
};


exports.get_admin_category_delete = async function (req, res ) {
    const id = req.params.id;

    try {

        // const [categories, ] = await db.execute("select * from category where id=?", [id]);
        // const category = categories[0];

        const category = await Category.findByPk(id);
        if (category) {
            return res.render('admin/category-delete', {
                title: "Kategori Silme",
                category:category
            });
        }

        res.redirect('/admin/categories');

    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }
};


exports.post_admin_category_delete = async function (req, res) {
    const id = req.body.id;
    try{
        // await db.execute("delete from category where id=?", [id]);

        await Category.destroy({
            where: {
                id: id
            }
        })

        res.redirect('/admin/categories?action=delete');
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }
};



exports.get_admin_blog_create = async function (req, res) {

    try {

        // const [categories, ] = await db.execute('select * from category');

        const categories = await Category.findAll({order: [['name', 'ASC']]});

        res.render('admin/blog-create', {
            title: "Yeni Blog Ekle",
            categories: categories
        });
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }

    

};

exports.post_admin_blog_create = async function (req, res) {
    console.log("REQ BODY:", req.body);

    const { baslik, aciklama, altbaslik, anasayfa, onay } = req.body;
   
    const categoryIds = [].concat(req.body.categories || []).map(Number); 

    const resim = req.file ? req.file.filename : null;

    try {
        
        const blog = await Blog.create({
            baslik: baslik,
            url: slugiField(baslik),
            altbaslik: altbaslik,
            aciklama: aciklama,
            resim: resim,
            anasayfa: anasayfa === "on" ? 1 : 0,
            onay: onay === "on" ? 1 : 0
            
        });

        console.log("Seçilen Kategoriler:", req.body.categoryIds);

       
        if (categoryIds.length > 0) {
            await blog.setCategories(categoryIds);
        }

        res.redirect("/admin/blog?action=create");
    } catch (err) {
        console.error("CREATE HATA:", err);
    }
};


exports.get_admin_category_create = async function (req, res) {

    try {
        

        res.render('admin/category-create', {
            title: "Yeni Kategori Ekle",
            
        });
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }

    

};

exports.post_admin_category_create = async function (req, res) {
    
    const name = req.body.name;
    

    try {


        // await db.execute('insert into category (name) values (?)', [name]);

        await Category.create({ name: name });

        res.redirect('/admin/categories?action=create');
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }

};

exports.get_admin_blog_edit = async function (req, res) {

    const id = req.params.id;

    try {
        // const [blogs, ] = await db.execute('select * from blog where id=?', [id]);
        // const [categories, ] = await db.execute('select * from category');
        // const blog = blogs[0];

        const blog = await Blog.findByPk(id, {
            include: {
                model: Category,
                as: 'categories',
                 
            }
        });
        const categories = await Category.findAll({order: [['name', 'ASC']]});

        if (blog) {
            return res.render('admin/blog-edit', {
                title:blog.dataValues.baslik,
                blog:blog.dataValues,
                categories:categories
            });
        }

        res.redirect('/admin/blog');
    }

    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }

    

};

exports.post_admin_blog_edit = async (req, res) => {

    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).send("Geçersiz blog id");

    const baslik = req.body.baslik;
    const aciklama = req.body.aciklama;
    const categoryIds = [].concat(req.body.categories || []).map(Number);
    const anasayfa = req.body.anasayfa === "on" ? 1 : 0;
    const onay = req.body.onay === "on" ? 1 : 0;
    const url = req.body.url;

    let resim = req.body.eskiResim;

    if (req.file) {
        resim = req.file.filename;

        if (req.body.eskiResim) {
            fs.unlink("public/images/" + req.body.eskiResim, () => {});
        }
    }

    try {
        // await db.execute(
        //     `UPDATE blog
        //      SET baslik=?, aciklama=?, resim=?, id=?, anasayfa=?, onay=?
        //      WHERE id=?`,
        //     [baslik, aciklama, resim, kategori, anasayfa, onay, id]
        // );

        const blog = await Blog.findByPk(id);

        if (blog) {
            blog.baslik = baslik;
            blog.altbaslik = req.body.altbaslik;
            blog.aciklama = aciklama;
            blog.resim = resim;
            blog.categoryId = categoryIds;
            blog.anasayfa = anasayfa;
            blog.onay = onay;
            blog.url = url;

            await blog.save();
            await blog.setCategories(categoryIds);
            return res.redirect("/admin/blog?action=edit&id=" + id);

        }

        res.redirect('/admin/blog');

    } catch (err) {
        console.error(" EDIT HATA:", err);
    }
};


exports.post_admin_category_remove = async function(req, res) {
    const blogId = req.body.blogId;
    const categoryId = req.body.categoryId;
    console.log(req.body);
    const blog = await Blog.findByPk(blogId);

    if (!blog) {
        return res.redirect('/admin/categories/' + categoryId);
    }

    await blog.removeCategory(categoryId);

    res.redirect('/admin/categories/' + categoryId);
};




exports.get_admin_category_edit = async function (req, res) {

    const id = req.params.id;
    try {
        // const [categories, ] = await db.execute('select * from category where id=?', [id]);
        // const category = categories[0];

        // const category = await Category.findAll({
        //     where: {
        //         id: id
        //     }
        // })

        const category = await Category.findByPk(id)
        const blogs = await category.getBlogs();
        const countBlogs = await category.countBlogs();

        if (category) {
            return res.render('admin/category-edit', {
                title:category.dataValues.name,
                category:category.dataValues,
                blogs: blogs,
                countBlogs: countBlogs
            });
        }

        res.redirect('/admin/categories');
    }

    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }

    

};

exports.post_admin_category_edit = async function (req, res) {

    const id = req.body.id;
    const name = req.body.name;
    

    

    try {
        // await db.execute('UPDATE category SET name = ? WHERE id = ?', [ name, id ]);
        // res.redirect(`/admin/categories?action=edit&id=${id}`);

        const category = await Category.findByPk(id);
        if (category) {
            category.name = name;
            await category.save();
            return res.redirect(`/admin/categories?action=edit&id=${id}`);
        }
        res.redirect('/admin/categories');
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }

};


exports.get_admin_blog_list = async function (req, res) {

    try {
       
        //const [blogs, ] = await db.execute('select id, baslik, resim from blog');

        const blogs = await Blog.findAll({
            attributes: ['id', 'baslik','altbaslik', 'resim'],
            include: {
                model: Category,
                as: 'categories',
                attributes: ['name'],
                through: { attributes: [] } 
            }
        });
        
        


        res.render( 'admin/blog-list', {
            title: "Blog Listesi",
            blogs: blogs,
            action: req.query.action,
            id: req.query.id
            

        });
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }

    

};

exports.get_admin_category_list = async function (req, res) {

    try {

        const categories = await Category.findAll({order: [['id', 'ASC']]});
        // const [categories, ] = await db.execute('select * from category');
        
        
        res.render( 'admin/category-list', {
            title: "Kategori Listesi",
            categories: categories,
            action: req.query.action,
            id: req.query.id
        });
    }
    catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }

    

};

