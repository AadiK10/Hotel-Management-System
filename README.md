# 🏨 Hotel Management System

A full-stack **Hotel Management System** built using **Spring Boot** and **React**, implementing secure authentication, role-based authorization, and core hotel management functionalities.

This project is designed to demonstrate **full-stack development skills**, clean architecture, and real-world application features.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Secure REST APIs

### 👤 Roles Supported
- **Admin**
- **Receptionist**
- **Customer**

---

## 👨‍💼 Admin Features
- View all users
- Delete users
- Add rooms
- View all rooms

## 🧑‍💼 Receptionist Features
- View rooms
- Book rooms for customers
- Update customer/user details

## 🧍 Customer Features
- Register & login
- View available rooms
- Book rooms

---

## 🎨 Frontend Highlights
- Modern dashboard UI
- Dark / Light mode toggle
- Role-based navigation
- Responsive and clean design
- Common dashboard layout across roles

---

## 🛠 Tech Stack

### Backend
- Java
- Spring Boot
- Spring Security
- JWT (JSON Web Token)
- Hibernate / JPA
- MySQL

### Frontend
- React
- React Router DOM
- JWT Decode
- Plain CSS
- Dark Mode Support

---

## 📁 Project Structure

```
Hotel-Management-System
├── hotelmanagement   # Spring Boot Backend
├── hotel-ui          # React Frontend
└── README.md
```

---

## ⚙️ How to Run the Project

### 1️⃣ Backend Setup (Spring Boot)

```bash
cd hotelmanagement
mvn spring-boot:run
```

Backend will start at:
```
http://localhost:8080
```

Make sure MySQL is running and database configuration is correct in:
```
application.properties
```

---

### 2️⃣ Frontend Setup (React)

```bash
cd hotel-ui
npm install
npm start
```

Frontend will start at:
```
http://localhost:3000
```

---

## 🔑 Default Roles & Access

| Role | Access |
|----|----|
| Admin | Full system access |
| Receptionist | Booking & user updates |
| Customer | View & book rooms |

---

## 📌 Important Notes
- Admin registration is intentionally disabled
- JWT tokens are used for secure API access
- Backend and frontend are cleanly separated
- Role-based authorization enforced at API level

---

## 🎯 Project Purpose
This project was built as a **full-stack academic and portfolio project**, showcasing:
- Secure backend development
- RESTful API design
- Frontend integration with authentication
- Clean UI and user experience

---

## 👨‍💻 Author

**Aaditya Kini**  
Bachelor of Engineering – Computer Engineering  
