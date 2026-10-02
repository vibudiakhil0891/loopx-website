import { useState } from "react";
import { LockKeyhole, LogIn, Mail } from "lucide-react";
import "./owner.css";

function OwnerLogin({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/owner/login/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError("Invalid username or password.");
                setLoading(false);
                return;
            }

            localStorage.setItem("loopx_access_token", data.access);
            localStorage.setItem("loopx_refresh_token", data.refresh);

            onLogin();
        } catch (error) {
            console.error(error);
            setError("Unable to connect to the server.");
        }

        setLoading(false);
    }

    return (
        <div className="owner-login-page">
            <div className="owner-login-card">
                <div className="owner-logo">
                    <span>LOOP</span>
                    <span>X</span>
                </div>

                <div className="owner-icon">
                    <LockKeyhole size={28} />
                </div>

                <h1>Owner Login</h1>

                <p className="owner-login-subtitle">
                    Sign in to manage LoopX enquiries
                </p>

                <form onSubmit={handleLogin}>
                    <div className="owner-input-group">
                        <label>Username</label>

                        <div className="owner-input">
                            <Mail size={18} />

                            <input
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="owner-input-group">
                        <label>Password</label>

                        <div className="owner-input">
                            <LockKeyhole size={18} />

                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="owner-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="owner-login-button"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}

                        {!loading && <LogIn size={18} />}
                    </button>
                </form>

                <p className="owner-secure-text">
                    🔒 Secure owner access
                </p>
            </div>
        </div>
    );
}

export default OwnerLogin;