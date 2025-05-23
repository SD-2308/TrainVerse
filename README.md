
# 🚀 TrainVerse - Next-Gen E-Learning Platform

<div align="center">
  <img src="https://img.shields.io/badge/Java-17-%23ED8B00?style=for-the-badge&logo=openjdk&logoColor=white">
  <img src="https://img.shields.io/badge/Spring_Boot-3.1-%236DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  <img src="https://img.shields.io/badge/Angular-15-%23DD0031?style=for-the-badge&logo=angular&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-8.0-%234479A1?style=for-the-badge&logo=mysql&logoColor=white">
</div>

<div align="center">
  <img width="80%" src="https://user-images.githubusercontent.com/62628408/165703934-5c71a5e4-6a7a-4b5a-9c1c-0c4a8b5d1b9a.gif" alt="TrainVerse Demo">
</div>

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 👨‍🎓 **Role-Based Access** | Three distinct dashboards for Students, Professors, and Admins |
| 📚 **Course Management** | Create, enroll, and track courses with intuitive UI |
| 🔐 **Secure Auth** | JWT authentication with role-based permissions |
| 📱 **Responsive Design** | Works flawlessly on all devices |
| 🚀 **Modern Stack** | Built with Spring Boot & Angular |

## 🛠️ Tech Stack

```mermaid
pie
    title Technology Stack
    "Java/Spring Boot" : 45
    "Angular" : 35
    "MySQL" : 15
    "Other" : 5
```

## 🚀 Getting Started

### Prerequisites

✔️ Java 17+  
✔️ Node.js 16+  
✔️ MySQL 8.0+  
✔️ Angular CLI 15+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/TrainVerse.git
cd TrainVerse

# 2. Start backend
cd backend
mvn spring-boot:run

# 3. Start frontend (in new terminal)
cd ../frontend
npm install && ng serve
```

🌐 Access the app at: [http://localhost:4200](http://localhost:4200)

## 📂 Project Structure

```bash
TrainVerse/
├── backend/          # Spring Boot Application
│   ├── src/
│   │   ├── main/java/com/trainverse/
│   │   │   ├── config/       # Security config
│   │   │   ├── controllers/  # REST APIs
│   │   │   └── models/       # JPA Entities
│   └── pom.xml
│
├── frontend/         # Angular Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/        # Admin modules
│   │   │   ├── professor/    # Professor modules
│   │   │   └── student/      # Student modules
│   └── package.json
└── README.md
```

## 🤝 Want to Contribute?

We love contributors! Here's how you can help:

1. 🐛 Found a bug? [Open an issue](https://github.com/yourusername/TrainVerse/issues)
2. 💡 Have a feature idea? Start a discussion
3. 👩‍💻 Fork the repo and submit a PR

## 📜 License

MIT © [TrainVerse Team]

---

<div align="center">
  Made with ❤️ by Us | 📧 sdinesh7038@gmail.com
</div>
