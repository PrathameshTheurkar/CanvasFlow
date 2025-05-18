# CanvasFlow 🎨: Real-Time Multi-User Drawing Canvas

A real-time collaborative drawing and editing web application that allows multiple users to draw and edit on a shared canvas simultaneously.  
Built with React, Node.js, WebSocket, and TypeScript (backend).

## 🚀 Features
- Real-time multi-user drawing and editing
- Smooth and responsive canvas interactions
- Synchronized updates across all connected users
- Lightweight and efficient WebSocket-based communication
- Clean and interactive UI

## 🛠️ Tech Stack
- 💻 **Frontend:** [React.js](https://reactjs.org/) (JavaScript)
- 🌐 **Backend:** [Node.js](https://nodejs.org/) with TypeScript
- 🔗 **Real-time Communication:** [WebSocket](https://www.npmjs.com/package/websocket)

---

## 🧑‍💻 How to Run the Project

### 🔧 Option 1: Run Without Docker

Make sure you have **Node.js (v18 or higher)** installed on your machine.

<details>
<summary><strong>Frontend</strong></summary>

1. Open a terminal and navigate to the `frontend` folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. The frontend will start on [http://localhost:5173](http://localhost:5173)
</details>

<details>
<summary><strong>Backend</strong></summary>

1. Open a new terminal and navigate to the `server` folder:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   npm run dev
   ```

4. The backend will start on [http://localhost:3000](http://localhost:3000)
</details>

---

### 🐳 Option 2: Run With Docker (Recommended)

Make sure you have **Docker** and **Docker Compose** installed.

1. In the root of the project (where `docker-compose.yaml` is located), build and start the containers:

   ```bash
   docker-compose up --build
   ```

2. Access the app:

   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3000](http://localhost:3000)

---


## Join Canvas Page:
![image](https://github.com/user-attachments/assets/e6e3ccce-bae3-4d6c-9f8c-c5e6b1a5b1c7)

## Canvas Page:
![image](https://github.com/user-attachments/assets/6d20367d-f6a6-4184-8b01-ba6332a2466b)

