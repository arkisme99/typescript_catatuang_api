# Catat Uang API

**Aplikasi RESTful API berbasis Node.js & TypeScript**  
Menggunakan pola arsitektur **MVC** dan **Service Pattern**

---

## 1. Deskripsi Singkat

Aplikasi ini menyediakan API untuk **mencatat transaksi keuangan harian**, termasuk registrasi & autentikasi pengguna, manajemen kategori, manajemen transaksi, dan laporan keuangan berbasis periode.

---

## 2. Fitur Utama

- **Autentikasi**
  - Register / Login / Logout / Profile
- **Manajemen Kategori**
  - Create, Read, Update, Delete, serta pencarian kategori
- **Pencatatan Keuangan**
  - Create, Read, Update, Delete, serta pencarian transaksi
- **Laporan Keuangan**
  - Ringkasan laporan berdasarkan periode tanggal

---

## 3. Spesifikasi API

Dokumen spesifikasi API lengkap tersedia di folder `./docs`.

---

## 4. Instalasi & Setup

**Clone repository:**

```bash
git clone https://github.com/arkisme99/typescript_catatuang_api.git
cd typescript_catatuang_api
```

**Installation & Running:**

- Copy .env.example Menjadi .env
- Setup Database di .env
- Jalankan perintah di bawah ini :

```shell
npm install

npx prisma migrate dev

npx prisma generate

npm run test

npm run build

npm run start
```

## 5. Teknologi Yang Digunakan

- Node.js & TypeScript
- Express.js (jika digunakan, tuliskan)
- Prisma untuk ORM
- Jest atau framework testing lainnya
- Pattern arsitektur: MVC + Service Layer
- Implementasi rate limiter di login & register
