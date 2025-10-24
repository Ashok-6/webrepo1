
import React, { useState } from "react";
import logo from "../assets/jnj-logo.png";


const LoginPage = ({ onLogin, ssoUrl = "", loginApi = "" }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ssoStarted, setSsoStarted] = useState(false);
  const [message, setMessage] = useState(""); // error/info messages
  const [loading, setLoading] = useState(false);

  const handleSSOLogin = () => {
    if (!ssoUrl) {
      // Demo fallback
      console.warn("SSO URL not configured — falling back to demo onLogin()");
      onLogin && onLogin(); // call onLogin so app proceeds in demo mode
      return;
    }

    const confirmRedirect = window.confirm(
      "You will be redirected to the corporate SSO page. Continue?"
    );
    if (!confirmRedirect) return;

    // Open SSO in a new tab so user sees DNS/network errors clearly
    const newWin = window.open(ssoUrl, "_blank", "noopener,noreferrer");
    if (!newWin) {
      // Popup blocked — fallback to same-tab redirect
      window.location.href = ssoUrl;
    } else {
      try {
        newWin.focus();
      } catch {
        /* ignore focus errors */
      }
    }

    setSsoStarted(true);
    setMessage(
      "SSO started — if the SSO page fails to load, check VPN/corporate network or contact IT."
    );
  };

  const handleManualLogin = async () => {
    setMessage("");
    if (!username || !password) {
      setMessage("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      if (loginApi) {
        // Call backend API for real authentication
        const res = await fetch(loginApi, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
          // Try to parse error message
          let errText = `Login failed (${res.status})`;
          try {
            const errJson = await res.json();
            if (errJson.message) errText = errJson.message;
          } catch {
            // ignore parse error
          }
          setMessage(errText);
        } else {
          // Success
          let json = {};
          try {
            json = await res.json();
          } catch {
            // no json body — fine
          }
          const user = json.user || username;
          onLogin && onLogin(user);
        }
      } else {
        // Demo fallback authentication
        // NOTE: replace this with proper API in production
        if (username === "admin" && password === "password123") {
          onLogin && onLogin(username);
        } else {
          setMessage("Invalid credentials");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("Network or server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px",
        background: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          background: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header with right-aligned logo */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <img src={logo} alt="JnJ Logo" style={{ height: "25px" }} />
        </div>

        {/* Login Form */}
        <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ marginBottom: "20px", color: "#333" }}>Login</h2>

          {/* SSO button */}
          <button
            onClick={handleSSOLogin}
            disabled={loading}
            style={{
              padding: "12px 20px",
              marginBottom: "15px",
              backgroundColor: "#d60000",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            {loading ? "Please wait..." : "SSO Login"}
          </button>

          {/* Helpful notice after SSO start */}
          {ssoStarted && (
            <div
              style={{
                background: "#fff8e1",
                border: "1px solid #ffd54f",
                color: "#333",
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "12px",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              If the SSO page fails to load:
              <ul style={{ margin: "6px 0 0 18px", padding: 0, color: "#666" }}>
                <li>Check your VPN / corporate network connection.</li>
                <li>Confirm the SSO URL with your IT team.</li>
                <li>Try opening the SSO link in the browser address bar.</li>
              </ul>
            </div>
          )}

          <div style={{ margin: "20px 0", color: "#666", fontWeight: "bold", textAlign: "center" }}>
            OR
          </div>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username or Email ID"
            disabled={loading}
            style={{
              display: "block",
              margin: "10px 0",
              padding: "12px",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={loading}
            style={{
              display: "block",
              margin: "10px 0",
              padding: "12px",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />

          <button
            onClick={handleManualLogin}
            disabled={loading}
            style={{
              padding: "12px 20px",
              backgroundColor: "#0070c9",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              width: "100%",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Message area */}
          {message && (
            <div
              style={{
                color: message.startsWith("Upload") ? "green" : "red",
                marginTop: "15px",
                fontSize: "14px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

