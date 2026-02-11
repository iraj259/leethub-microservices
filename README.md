# 🚀 Leethub Microservices

**Leethub** is a **high-performance LeetCode-style online judge** built with **TypeScript, Fastify, Node.js, and Docker**, designed for **speed, scalability, and reliability**.  
It can handle **100+ submissions per minute** and provides **real-time execution feedback** for Python, Java, and C++ code. 💻⚡  

---

## ✨ Features

- **Decoupled Microservices:** Each service is independent, making the system easy to maintain and scale. 🛠️  
- **Asynchronous & Synchronous Workflows:** Queue-based async pipelines handle multiple submissions efficiently, with sync calls for critical tasks. ⏱️  
- **Secure Docker Sandboxing:** Runs user code in isolated containers for safety. 🐳  
- **Redis Caching & Queues:** Optimizes throughput and reduces latency under high submission load. ⚡  
- **Real-Time Updates:** Socket.IO integration provides live execution feedback. 📡  
- **Optimized Workers:** Efficient job processing for ~95% faster code evaluation. 🚀  

---

## 🛠️ Tech Stack

- **Backend:** Node.js, TypeScript, Fastify  
- **Real-Time:** Socket.IO  
- **Caching/Queue Management:** Redis, BullMQ  
- **Containerization:** Docker, Docker Compose  
- **Languages Supported:** JavaScript, TypeScript, Python, Java, C++  

---

## 🏗️ Microservices Overview

| Service Name   | Responsibility |
| -------------- | -------------- |
| **Submission** | Receives user submissions and pushes them to queues for evaluation. 📨 |
| **Evaluator**  | Executes code inside Docker sandboxes and pushes results back to the queue. 🐳 |
| **Problem**    | Manages problem definitions, test cases, and validates submissions. 📚 |
| **Socket**     | Sends real-time status updates to clients via WebSockets. 📡 |

---

## 🖼️ System Design

![System Design](systemdesign.png)

The architecture is **independent services connected via Redis queues and async pipelines**, allowing **scalable and fault-tolerant** handling of large submission volumes. ⚡  

---

## 🎯 Goal

Build a **robust, secure, and scalable online judge** suitable for:  

- Learning and practicing competitive coding  
- Running coding assessments for teams or contests  
- Real-time problem-solving and debugging  

---


## ⚙️ Setup & Installation

### 1️⃣ Clone the Repositories

Ensure all microservices and frontend are in your workspace.

```bash
git clone https://github.com/yourusername/leethub-microservices.git
```

### 2️⃣ Environment Variables

Create a `.env` file in each service directory based on requirements.


**Problem Service:**

```
PORT=3002
MONGODB_URI="mongodb://..."
```

**Submission Service:**

```
PORT=3005
MONGODB_URI="mongodb://..."
REDIS_HOST="localhost"
REDIS_PORT=6379
```

**Evaluator Service:**

```
REDIS_HOST="localhost"
REDIS_PORT=6379
```

**Socket Service:**

```
PORT=3004
REDIS_HOST="localhost"
REDIS_PORT=6379
```

### 3️⃣ Install Dependencies

```bash
npm install
```

Run this in each service directory.

### 4️⃣ Start the Services

Run all services concurrently for full functionality:

```bash
# In each service directory
npm run dev
```

### 🧪 Running a Test

1. Sign in via the Frontend.
2. Navigate to a problem or create a new one using the Create Problem UI.
3. Write your solution in the code editor.
4. Click **Run** to test or **Submit** for full evaluation.
5. Watch real-time updates via the Socket Service! ⚡

### 🛡️ Security

User code is executed in **isolated Docker containers** with limited resources and no network access to prevent malicious activity. 🔒

---

## 📄 License
This project is licensed under the ISC License.

This project is licensed under the ISC License.
