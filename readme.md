# Catat Uang API

Aplikasi nodejs - typescript, dengan pattern MVC + Service Pattern

## 1. Overview

Aplikasi Catat Keuangan Harian menyediakan API untuk:

- Authentication API (Register, Login, Logout, Profile)
- Manajemen User (Create, Get, Search, Update, Delete)
- Pencatatan Keuangan Harian (Create, Get, Search, Update, Delete)
- Laporan Keuangan (Summary Reports By Period Date)

## Silahkan lihat API Spec di Folder **./docs**

## 2. Authentication

Autentikasi menggunakan **Token**.  
Endpoint yang membutuhkan autentikasi harus menambahkan header:

```
Authorization: <token>
```

## 3. Installation & Running

- Copy .env.example Menjadi .env
- Setup Database di .env
- Jalankan perintah di bawah ini :

```shell
npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run start
```
