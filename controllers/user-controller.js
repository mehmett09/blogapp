const Blog = require('../models/blog');
const Category = require('../models/category');

const { Op, where } = require('sequelize');
// const  router  = require('../router/users');


exports.blog_by_category = async function (req, res) {
    const slug = req.params.slug;
    console.log("CATEGORY ID:", slug);
    const size = 5;
    const page = parseInt(req.query.page) || 1;

    try {

        const category = await Category.findOne({
            where: { url: slug }
        });

        const totalItems = await Blog.count({
            include: [{
                model: Category,
                as: "categories",
                where: { id: category.id },
                through: { attributes: [] }
            }],
            where: { onay: 1 }
        });

        const blogs = await Blog.findAll({
            include: [{
                model: Category,
                as: "categories",
                where: { url: slug },
                attributes: ['name'],
                through: { attributes: [] },
                
            }],
            where: { onay: 1 },
            limit: size,
            offset: (page - 1) * size
        });

        const categories = await Category.findAll();

        const selectedCategory = categories.find(c => c.id == slug);
        const totalPages = Math.ceil(totalItems / size);

        res.render('users/blog', {
            title: category.name,
            blogs: blogs,
            categories: categories,
            selectedCategory: slug,
            currentPage: page,
            totalPages: totalPages
        });

    } catch (err) {
        console.error('Veri tabani hatasi: ', err);
    }
};


exports.blog_details = async function (req, res) {

    const slug = req.params.slug;

    try {
        // const [blogs,] = await db.execute('select * from blog where id = ? ', [id]);
        
        // const blog = blogs[0];

        const blog = await Blog.findOne({
            where: {
                url: slug
            },
            raw: true
        })

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

      
};


exports.blog_list = async function (req, res) {
    const size = 5;
    const page = parseInt(req.query.page) || 1;
    try {
        // const [blog,] = await db.execute('select * from blog where onay = 1')
        // const [category, ] = await db.execute('select * from category')
        

        const totalItems = await Blog.count({
            where: { onay: 1}
        })

        const blog = await Blog.findAll({
            where: {
                onay: 1
            },
            raw: true,
            limit: size,
            offset: (page - 1) * size
        });

        const category = await Category.findAll({ raw: true });
        const totalPages = Math.ceil(totalItems / size);
        
        res.render( 'users/blog',{
            title: "Tüm Bloglar",
            blogs: blog,
            categories: category,
            selectedCategory: null,
            currentPage: page,
            totalPages: totalPages
        });
        console.log("PAGE:", page);
        console.log("totalItems:", totalItems);
        console.log("totalPages:", totalPages);

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

};


exports.home_page = async function (req, res) {

    try {
        // const [blog,] = await db.execute('select * from blog where anasayfa = 1 ');
        // const [category, ] = await db.execute('select * from category')

        const blog = await Blog.findAll({
            where: {
                // anasayfa: true,
                // onay: true
                [Op.and]: [
                    { anasayfa: true },
                    { onay: true }
                ]
            },
            
            raw: true
            
        });

        const category = await Category.findAll({ raw: true });

        console.log(blog);
        console.log(category);

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
    
};


