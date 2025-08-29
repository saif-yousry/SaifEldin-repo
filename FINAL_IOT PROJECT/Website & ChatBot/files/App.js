// src/App.js
import React, { useState } from "react";

// Components
import Login from "./components/login";
import SignUp from "./components/signup";
import Dashboard from "./components/dashboard";
import DoorControl from "./components/doorcontrol";
import ChatBot from "./components/chatbot";
import History from "./components/history";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [activityHistory, setActivityHistory] = useState([]);
  const [view, setView] = useState("login"); // login, signup, dashboard

  // تسجيل كل الأحداث
  const recordActivity = (email, action) => {
    setActivityHistory(prev => [...prev, { email, action, time: new Date().toLocaleString() }]);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    if (!users.find(u => u.email === user.email)) {
      setUsers(prev => [...prev, user]);
    }
    recordActivity(user.email, "login");
    setView("dashboard");
  };

  const handleLogout = () => {
    if (currentUser) {
      recordActivity(currentUser.email, "logout");
      setCurrentUser(null);
    }
    setView("login");
  };

  return (
    <div>
      {view === "login" && <Login handleLogin={handleLogin} setView={setView} />}
      {view === "signup" && <SignUp handleLogin={handleLogin} setView={setView} />}
      {view === "dashboard" && (
        <>
          <Dashboard handleLogout={handleLogout} currentUser={currentUser} />
          <DoorControl currentUser={currentUser} logActivity={recordActivity} />
          <History activityHistory={activityHistory} />
          <ChatBot 
            currentUser={currentUser} 
            users={users} 
            activityHistory={activityHistory} 
          />
        </>
      )}
    </div>
  );
}

export default App;
