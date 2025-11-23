# 🌐 MERN Booking App

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Tech Stack](https://img.shields.io/badge/tech%20stack-MERN-orange)
![TypeScript](https://img.shields.io/badge/typescript-ready-3178C6)
![Tests](https://img.shields.io/badge/tests-Playwright-45ba4b)

<p align="center" style="background: #fff; padding: 10px;">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="MongoDB" height="40" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" alt="Express" height="40" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="React" height="40" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="Node.js" height="40" />
</p>

A modern and production-ready **Hotel Booking Application** built with
the MERN stack.\
This project provides a seamless hotel booking experience for customers
and a robust admin dashboard for managing hotel listings with images,
pricing, and details.

---

## 🧭 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [Running e2e Tests](#-running-e2e-tests)
- [API Overview](#-api-overview)
- [Screenshots](#-screenshots)
- [License](#-license)

---

## 🚀 Features

### 👨‍💼 Admin Panel

- Add, update, and delete hotels
- Upload hotel images
- Manage rooms, pricing, availability, and amenities

### 🧑‍💻 User Features

- Create an account & log in
- Browse and search hotels by location
- Complete bookings with secure payment
- View booking history

### 🔐 Security

- Secure auth with **JWT**
- Password hashing with **BcryptJs**
- Protected routes (admin & user)

---

## 🛠️ Tech Stack

### **Frontend**

- React.js
- Typescript
- React Context API
- React Hook Form
- React Router
- TanStack React Query
- TailwindCSS
- Playwright (e2e testing)

### **Backend**

- Node.js & Express
- MongoDB & Mongoose
- Typescript
- Multer (file uploads)
- Cloudinary (image hosting)
- JWT Authentication
- Stripe (payments)
- BcryptJs
- Cookie Parser

---

## 📁 Project Structure

    mern-booking-app/
    │
    ├── backend/            # Express + MongoDB (Typescript)
    │   ├── src/
    │   ├── .env.sample
    │   ├── .env.e2e
    │   └── package.json
    │
    ├── frontend/           # React + TS + Tailwind + React Query
    │   ├── src/
    │   ├── .env.sample
    │   └── package.json
    │
    └── README.md

---

## 🔧 Environment Variables

Both backend and frontend require `.env.local` files.

### Backend (`env.sample`)

    MONGODB_CONNECTION_STRING=
    JWT_SECRET_KEY=
    NODE_ENV=
    PORT=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    STRIPE_SECRET_KEY=

### Frontend (`env.sample`)

    VITE_API_BASE_URL=http://localhost:5000
    VITE_STRIPE_PUBLISHABLE_KEY=

---

## ▶️ Running the Project

### **Frontend**

```bash
cd frontend
cp env.sample env.local
npm install
npm run dev
```

### **Backend**

```bash
cd backend
cp env.sample env.local
npm install
npm run dev
```

Backend runs on:

    http://localhost:PORT

---

## 🧪 Running e2e Tests (Playwright)

> Playwright tests run only in **VSCode**

### Prepare the backend for e2e:

```bash
cd backend
cp env.sample env.e2e
npm run e2e
```

### Run tests in VSCode:

1.  Install **Playwright Test for VSCode**
2.  Open **Test Explorer**
3.  Run tests inside the `e2e-tests` folder

---

## 📘 API Overview (Short)

| Method | Endpoint                        | Description          |
| ------ | ------------------------------- | -------------------- |
| POST   | `/api/users/register`           | Register new user    |
| POST   | `/api/users/login`              | Login user           |
| GET    | `/api/hotels`                   | Get all hotels       |
| POST   | `/api/hotels/search?params`     | Search hotels        |
| POST   | `/api/my-hotels`                | Create hotel (Admin) |
| DELETE | `/api/hotels/:id`               | Delete hotel         |
| POST   | `/api/hotels/:hotelId/bookings` | Create booking       |
| GET    | `/api/my-bookings`              | View user bookings   |

_Full API documentation coming soon..._

---

## 📸 Screenshots (Optional Section)

![Home Page](/screenshots/sc1.png)

![Booking Page](/screenshots/sc2.png)

---

## 📜 License

This project is licensed under the **MIT License**. \
You are free to use, modify, and distribute the code with proper \
attribution.

---

## ⭐ Contributing

Pull requests are welcome!\
For major changes, please open an issue to discuss your ideas.

---

## 💬 Support

If you like this project, please ⭐ the repository! \
email: ***mee.prakash25@gmail.com***

---
