# Truly – Anonymous Feedback Platform  
<div align="center">


✨ Share and receive **honest, boundary-free feedback** — built with security, modern design, and AI at its core.  

---

[![Framework: Next.js](https://img.shields.io/badge/Framework-Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![AI Powered: Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?logo=google&logoColor=white)](https://ai.google/)
[![Frontend: React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Backend: Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Database: MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

🔒 **Secure.** Your privacy is protected at every step.  
⚡ **Fast.** Built on cutting-edge frameworks for seamless performance.  
🧠 **Smart.** AI-enhanced insights powered by Google Gemini.  

</div>


---

## 🎯 What is Truly?  

**Truly** is a **modern, anonymous feedback platform** built with **Next.js 15, TypeScript, and AI-powered features**.  
It allows users to **collect honest feedback** securely and effortlessly — with a sleek glassmorphism UI and Gemini AI conversation starters.  

### ✨ Key Highlights  

- 🎨 **Glass UI** – Modern glassmorphism with gradients & animations  
- 🔐 **Authentication** – Secure email/password login with verification  
- 🎭 **Anonymous Messaging** – Send & receive feedback without revealing identity  
- 🤖 **AI Suggestions** – Gemini AI generates engaging feedback prompts  
- ⚡ **Real-time Updates** – Instantly fetch, delete, or toggle messages  
- 📱 **Responsive Design** – Works beautifully on mobile, tablet, and desktop  
- 🌓 **Dark Mode Ready** – Seamless light/dark theme switching  

---

## 🚀 Features  

<table>
<tr>
<td width="50%">

### 🎨 **Modern UI/UX**
- Glassmorphism with blur & gradients  
- Responsive design for all devices  
- Smooth animations with Framer Motion  
- Dark/light theme support  

### 🔐 **Authentication & Security**
- NextAuth.js with credential-based login  
- Secure password hashing with bcrypt  
- Email verification (Resend API)  
- Zod schema validation & CSRF protection  

</td>
<td width="50%">

### ✉️ **Anonymous Feedback**
- Unique profile links (e.g. `/u/username`)  
- Send messages without login  
- Toggle message acceptance ON/OFF  
- Delete or refresh messages in real-time  

### 🤖 **AI-Powered Experience**
- Gemini AI generates conversation starters  
- Real-time streaming of suggestions  
- Encourage meaningful, friendly feedback  

</td>
</tr>
</table>

---

## 🛠️ Tech Stack  

<div align="center">

### Core  
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)  
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)  
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)  

### Backend & Database  
![MongoDB](https://img.shields.io/badge/MongoDB-8-brightgreen?style=for-the-badge&logo=mongodb&logoColor=white)  
![Mongoose](https://img.shields.io/badge/Mongoose-ORM-red?style=for-the-badge)  
![NextAuth.js](https://img.shields.io/badge/Auth-NextAuth.js-000000?style=for-the-badge&logo=auth0&logoColor=white)  

### AI & Email  
![Google Gemini](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)  
![Vercel AI SDK](https://img.shields.io/badge/Vercel%20AI-SDK-black?style=for-the-badge&logo=vercel&logoColor=white)  
![Resend](https://img.shields.io/badge/Resend-Email-orange?style=for-the-badge)  

### UI/UX  
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  
![Shadcn UI](https://img.shields.io/badge/Shadcn/UI-000?style=for-the-badge)  
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-pink?style=for-the-badge&logo=framer&logoColor=white)  

</div>

<details>
<summary><b>📦 Complete Dependencies</b></summary>

- **Auth & Security**: NextAuth.js, bcryptjs, Zod  
- **Database**: MongoDB, Mongoose  
- **AI**: Vercel AI SDK, Google Gemini  
- **UI/UX**: TailwindCSS, Shadcn/ui, Radix UI, Lucide React, React Icons, Sonner, Framer Motion  
- **Forms**: React Hook Form, Hookform Resolvers, Zod  
- **Email**: Resend API, React Email  
- **Dev Tools**: Turbopack, ESLint, PostCSS  

</details>

---

## 🏗️ Project Structure  

```

📦 truly/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── (app)/dashboard/      # User dashboard
│   │   ├── (auth)/sign-in/       # Login & Sign Up
│   │   ├── api/                  # API routes
│   │   └── u/[username]/         # Public profiles
│   ├── 📁 components/            # Reusable components
│   ├── 📁 lib/                   # Utilities (dbConnect, etc.)
│   ├── 📁 models/                # MongoDB schemas
│   ├── 📁 schemas/               # Zod validation
│   └── 📁 types/                 # TypeScript definitions
└── 📄 README.md

````

---

## 🚀 Quick Start  

### Prerequisites  
- **Node.js** v18+  
- **MongoDB** (local or Atlas)  
- **Git**  

### 🔧 Installation  

```bash
# Clone repository
git clone https://github.com/Aksh8t/truly.git
cd truly

# Install dependencies
npm install
````

### ⚙️ Environment Variables

Create `.env.local` in project root:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### 🏃 Run the Application

```bash
npm run dev

```

## 📡 API Reference

<details>
<summary><b>🔐 Authentication</b></summary>

| Method | Endpoint                  | Description   |
| ------ | ------------------------- | ------------- |
| `POST` | `/api/sign-up`            | Register user |
| `POST` | `/api/verify-code`        | Verify email  |
| `POST` | `/api/auth/[...nextauth]` | Auth handler  |

</details>

<details>
<summary><b>✉️ Messages</b></summary>

| Method   | Endpoint                  | Description            |
| -------- | ------------------------- | ---------------------- |
| `POST`   | `/api/send-message`       | Send anonymous message |
| `GET`    | `/api/get-messages`       | Fetch user messages    |
| `DELETE` | `/api/delete-message/:id` | Delete a message       |

</details>

<details>
<summary><b>🤖 AI Suggestions</b></summary>

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| `POST` | `/api/suggest-messages` | Generate AI-based prompts |

</details>

---

## 🎯 Roadmap

* 💬 Message reactions & ratings
* 📊 Advanced analytics dashboard
* 🔍 Message filtering & search
* 🤝 Multi-AI model support
* 🎨 Custom themes & branding
* 📤 Export messages to PDF
* 🔑 Two-factor authentication

---

<div align="center">

**Made with ❤️ by Akshat Tiwari**

⭐ Star this repo if you find it helpful! ⭐

</div>
```
