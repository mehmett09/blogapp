const Category = require("../models/category");
const Blog = require("../models/blog");
const slugField = require("../helpers/slugfield");


async function populate() {

    const count = await Category.count();

    if (count ===0 ){
    

         const categories = await Category.bulkCreate(
            [
            { name: "Web Geliştirme" ,url: slugField("Web Geliştirme")},
            { name: "Mobil Programlama" ,url: slugField("Mobil Programlama") },
            { name: "Masaüstü Programlama" ,url: slugField("Masaüstü Programlama") }
            ],
            { returning: true }
        );

            
        const blogs =await Blog.bulkCreate([
            {
            baslik: "Komple Uygulamalı Web Geliştirme Eğitimi",
            url: slugField("Komple Uygulamalı Web Geliştirme Eğitimi"),
            altbaslik: "...",
            aciklama: "...",
            resim: "1.jpg",
            anasayfa: true,
            onay: true,
            // id: categories[0].id
            },
            {
            baslik: "Komple Uygulamalı Mobil Programlama Eğitimi",
            url: slugField("Komple Uygulamalı Mobil Programlama Eğitimi"),
            altbaslik: "...",
            aciklama: "...",
            resim: "2.jpg",
            anasayfa: true,
            onay: true,
            // id: categories[1].id
            },
            {
            baslik: "Komple Uygulamalı Masaüstü Programlama Eğitimi",
            url: slugField("Komple Uygulamalı Masaüstü Programlama Eğitimi"),
            altbaslik: "...",
            aciklama: "...",
            resim: "3.jpg",
            anasayfa: false,
            onay: true,
            // id: categories[2].id
            }
        ]);

        await categories[0].addBlog(blogs[0]);            

    }


  //  Önce kategorileri oluştur
 
}

module.exports = populate;
