# Blog Application (Node.js, Express & Sequelize)

Bu proje, backend geliştirme mantığını öğrenmek amacıyla geliştirilmiş
bir blog uygulamasıdır.\
Proje boyunca Node.js ve Express kullanılarak routing, CRUD işlemleri,
dosya yükleme, ORM kullanımı ve MVC mimarisi uygulanmıştır.

⚠️ Bu proje bir öğrenme projesidir. Amaç; profesyonel bir ürün
çıkarmaktan ziyade backend mimarisini ve gerçek dünya geliştirme
süreçlerini kavramaktır.

------------------------------------------------------------------------

## 🚀 Özellikler

-   Blog oluşturma, düzenleme ve silme (CRUD)
-   Kategori yönetimi
-   Admin paneli
-   Dosya (resim) yükleme
-   Sayfalama (Pagination)
-   SEO uyumlu slug yapısı
-   Server-side rendering (EJS)
-   MVC mimari yapısı
-   Sequelize ORM ile ilişkisel modelleme

------------------------------------------------------------------------

## 🛠️ Kullanılan Teknolojiler

-   Node.js
-   Express.js
-   MySQL
-   Sequelize ORM
-   EJS (Template Engine)
-   Multer (Dosya yükleme)
-   dotenv
-   Git & GitHub

------------------------------------------------------------------------

## 📁 Proje Yapısı

bblog-app/
│
├─ controllers/     # Controller katmanı
├─ models/          # Sequelize modelleri
├─ routes/          # Route tanımları
├─ helpers/         # Yardımcı fonksiyonlar (slug vb.)
├─ views/           # EJS view dosyaları
│   ├─ admin/
│   ├─ users/
│   └─ partials/
├─ public/          # Statik dosyalar
├─ data/            # DB bağlantı & seed dosyaları
├─ index.js         # Uygulama başlangıç noktası
└─ package.json

------------------------------------------------------------------------

# 1️⃣ Repoyu klonla
git clone https://github.com/mehmett09/blogapp.git

# 2️⃣ Proje klasörüne gir
cd blogapp

# 3️⃣ Bağımlılıkları yükle
npm install

# 4️⃣ .env dosyasını oluştur ve aşağıdaki bilgileri ekle

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blogdb

# 5️⃣ Uygulamayı başlat
npm start

------------------------------------------------------------------------

## 🧠 Bu Projede Öğrendiklerim

-   Express.js ile routing ve middleware mantığı
-   CRUD işlemleri
-   Sequelize ORM ile model ilişkileri (One-to-Many / Many-to-Many)
-   Slug yapısı ile SEO uyumlu URL oluşturma
-   Pagination sistemi
-   Dosya upload (Multer)
-   MVC mimarisi
-   Git ile versiyonlama ve tag mantığı

------------------------------------------------------------------------

## 🧪 Versiyonlama

-   main → Stabil sürüm
-   v1.0.0 → Sequelize öncesi stabil versiyon
-   v2.0.0 → Sequelize, slug ve pagination eklenmiş stabil sürüm

------------------------------------------------------------------------

## 🔮 Gelecek Planları

-   Authentication / Authorization
-   Role-based access control
-   REST API versiyonu
-   Validation iyileştirmeleri
-   Frontend framework entegrasyonu

------------------------------------------------------------------------

## 👤 Geliştirici

Mehmet Yılmaz
