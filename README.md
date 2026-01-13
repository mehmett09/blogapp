[readme.md](https://github.com/user-attachments/files/24600694/readme.md)
# Blog Application (Node.js & Express)

Bu proje, **backend geliştirme mantığını öğrenmek** amacıyla geliştirilmiş bir blog uygulamasıdır. Proje boyunca Node.js ve Express kullanılarak routing, CRUD işlemleri, dosya yükleme ve MVC mimarisi gibi temel backend konuları uygulanmıştır.

> ⚠️ Bu proje bir **öğrenme projesidir**. Amaç; profesyonel bir ürün çıkarmaktan ziyade backend mantığını kavramaktır.

---

## 🚀 Özellikler

- Blog oluşturma, düzenleme ve silme (CRUD)
- Kategori yönetimi
- Admin paneli
- Dosya (resim) yükleme
- Sayfalama (pagination)
- Server-side rendering (EJS)
- MVC mimari yapısı

---

## 🛠️ Kullanılan Teknolojiler

- **Node.js**
- **Express.js**
- **MySQL**
- **EJS** (Template Engine)
- **Multer** (Dosya yükleme)
- **dotenv**
- **Git & GitHub**

---

## 📁 Proje Yapısı

```
blog-app/
│
├─ Router/          # Route tanımları
├─ data/            # Database bağlantısı
├─ helpers/         # Yardımcı fonksiyonlar
├─ views/           # EJS view dosyaları
│   ├─ admin/
│   ├─ users/
│   └─ partials/
├─ public/          # Statik dosyalar
├─ index.js         # Uygulama başlangıç noktası
└─ package.json
```

---

## ⚙️ Kurulum

1. Repoyu klonla:
```bash
git clone https://github.com/mehmett09/blogapp.git
```

2. Proje klasörüne gir:
```bash
cd blogapp
```

3. Bağımlılıkları yükle:
```bash
npm install
```

4. `.env` dosyasını oluştur:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blogdb
```

5. Uygulamayı çalıştır:
```bash
npm start
```

---

## 🧠 Bu Projede Öğrendiklerim

- Express.js ile routing mantığı
- GET / POST request yapıları
- CRUD işlemleri (Create, Read, Update, Delete)
- Form yönetimi ve validation mantığı
- Dosya upload (Multer)
- MVC mimarisinin backend tarafındaki kullanımı
- Git ile version control ve branch mantığı

---

## 🧪 Versiyonlama

- `main` → Çalışan ve stabil sürüm
- `v1.0` → Sequelize öncesi stabil versiyon
- `sequelize` → ORM geçişi için geliştirme branch’i

---

## 🔮 Gelecek Planları

- Sequelize ORM entegrasyonu
- Authentication / Authorization
- API versiyonu (REST)
- Validation iyileştirmeleri

---

## 📌 Not

Bu proje kişisel öğrenme sürecimin bir parçasıdır. Geri bildirim ve önerilere açıktır.

---

👤 **Geliştirici**: Mehmet Yılmaz

