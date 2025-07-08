# 🧠 edugenie

An intelligent and interactive web app that helps students learn better by uploading study materials (PDF, Image, or Text). The platform generates short notes, mind maps, MCQ quizzes, video recommendations, and an AI chatbot to clear doubts — all powered by **Gemini AI**.

---

## 🚀 Features

### 🔐 Authentication
- Supabase authentication with Email & Google login
- User onboarding with name, email, and secure login

### 📂 Upload & Analyze
- Upload **PDF, image, or plain text**
- Automatically extract content and display topic headings/subtopics

### 📘 Notes Section
- Gemini AI generates:
  - Short notes
  - Mind maps
  - Flowcharts
  - Easy memory tricks

### 📝 Quiz Section
- AI-generated MCQs based on uploaded topic
- Quiz with:
  - Timer
  - Score system
  - Detailed explanations
  - Tricks to remember correct answers

### 📺 Video Recommendations
- Smart YouTube video suggestions relevant to the topic

### 🤖 Doubts Chat
- Gemini AI-powered chatbot to clarify any topic-based questions in real time

### 📊 Performance Dashboard
- Shows:
  - Quiz history
  - Accuracy trends
  - Bookmarked notes
  - Flashcards with spaced repetition

---

## 🧪 Tech Stack

| Tech         | Description                              |
|--------------|------------------------------------------|
| **Next.js**  | React framework for frontend              |
| **Tailwind CSS** | Utility-first CSS for clean styling    |
| **Supabase** | Backend-as-a-service for Auth & DB       |
| **Gemini AI**| Content generation (notes, quiz, etc.)   |
| **OCR & PDF Parsing** | For extracting data from uploads |

---

## 🧭 Application Flow

1. **Homepage**  
   - Login button
   - Overview of the platform

2. **Login Page**  
   - Email & Google login via Supabase

3. **Dashboard**  
   - Welcome user
   - Button to upload document

4. **Upload Page**  
   - Accepts PDF, image, or text file
   - On upload → Redirects to Context Page

5. **Context Page**  
   - Displays topic headings from uploaded file
   - Navigation options:
     - 📘 Notes → Detailed notes, mind map, tricks
     - 📝 Take Test → Quiz UI with timer
     - 📺 Videos → YouTube suggestions
     - 🤖 Doubts → AI Chatbot

---

## 🔧 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/ai-learning-platform.git
cd ai-learning-platform
