// src/components/doorcontrol.js
import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import "./doorcontrol.css";

const DoorControl = ({ currentUser, logActivity }) => {
  const [status, setStatus] = useState("unknown");
  const [client, setClient] = useState(null);

  useEffect(() => {
    const mqttClient = mqtt.connect(
      "wss://43e31bb1eb054ef3a8b8a0286ded2a4e.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "Saif__",
        password: "SYrmen77",
      }
    );

    setClient(mqttClient);

    mqttClient.on("connect", () => {
      console.log("✅ Connected to HiveMQ Cloud");
      mqttClient.subscribe("servo/status", (err) => {
        if (!err) console.log("📩 Subscribed to servo/status");
      });
    });

    mqttClient.on("message", (topic, message) => {
      if (topic === "servo/status") {
        const msg = message.toString();
        setStatus(msg);
        if (currentUser && logActivity) {
          logActivity(
            currentUser.email,
            msg === "open" ? "door_open" : "door_close",
            msg
          );
        }
      }
    });

    return () => mqttClient.end();
  }, [currentUser, logActivity]);

  const sendOpenCommand = () => {
    if (client) {
      const command = status === "open" ? "close" : "open";
      client.publish("servo/cmd", command);
      const newStatus = command;
      setStatus(newStatus);
      if (currentUser && logActivity) {
        logActivity(
          currentUser.email,
          newStatus === "open" ? "door_open" : "door_close",
          newStatus
        );
      }
    }
  };

  return (
    <div className="door-control">
      <h2>🚪 Safe Status: {status}</h2>
      <button onClick={sendOpenCommand}>
        {status === "open" ? "Close Safe" : "Open Safe"}
      </button>
    </div>
  );
};

export default DoorControl;
