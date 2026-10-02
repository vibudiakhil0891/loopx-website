import { useEffect, useState } from "react";
import {
    Bell,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    LogOut,
    Menu,
    MessageSquare,
    RefreshCw,
    Search,
    Trash2,
    Users,
    X,
} from "lucide-react";

import "./owner.css";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://127.0.0.1:8000";

function OwnerDashboard({ onLogout }) {
    const [enquiries, setEnquiries] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    async function loadEnquiries() {
        const token = localStorage.getItem("loopx_access_token");

        if (!token) {
            onLogout();
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/owner/enquiries/`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 401) {
                handleLogout();
                return;
            }

            const data = await response.json();

            if (response.ok) {
                setEnquiries(data.data || []);
            } else {
                console.error("Failed to load enquiries:", data);
            }
        } catch (error) {
            console.error("Failed to load enquiries:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadEnquiries();
    }, []);

    function handleLogout() {
        localStorage.removeItem("loopx_access_token");
        localStorage.removeItem("loopx_refresh_token");

        onLogout();
    }

    async function updateStatus(id, status) {
        const token = localStorage.getItem("loopx_access_token");

        if (!token) {
            handleLogout();
            return;
        }

        setUpdatingId(id);

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/owner/enquiries/${id}/`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: status,
                    }),
                }
            );

            if (response.status === 401) {
                handleLogout();
                return;
            }

            const data = await response.json();

            if (response.ok) {
                setEnquiries((previous) =>
                    previous.map((item) =>
                        item.id === id
                            ? {
                                ...item,
                                status: data.data.status,
                            }
                            : item
                    )
                );
            } else {
                console.error("Failed to update status:", data);
                alert("Unable to update enquiry status.");
            }
        } catch (error) {
            console.error("Status update error:", error);
            alert("Unable to connect to the server.");
        } finally {
            setUpdatingId(null);
        }
    }

    async function deleteEnquiry(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this enquiry?"
        );

        if (!confirmed) {
            return;
        }

        const token = localStorage.getItem("loopx_access_token");

        if (!token) {
            handleLogout();
            return;
        }

        setDeletingId(id);

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/owner/enquiries/${id}/`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 401) {
                handleLogout();
                return;
            }

            if (response.ok || response.status === 204) {
                setEnquiries((previous) =>
                    previous.filter((item) => item.id !== id)
                );
            } else {
                const data = await response.json();
                console.error("Delete failed:", data);
                alert("Unable to delete enquiry.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Unable to connect to the server.");
        } finally {
            setDeletingId(null);
        }
    }

    const filteredEnquiries = enquiries.filter((item) => {
        const searchText = search.toLowerCase();

        return (
            (item.name || "").toLowerCase().includes(searchText) ||
            (item.email || "").toLowerCase().includes(searchText) ||
            (item.service || "").toLowerCase().includes(searchText) ||
            (item.message || "").toLowerCase().includes(searchText) ||
            (item.status || "").toLowerCase().includes(searchText)
        );
    });

    const uniqueCustomers = new Set(
        enquiries.map((item) => item.email).filter(Boolean)
    ).size;

    const uniqueServices = new Set(
        enquiries.map((item) => item.service).filter(Boolean)
    ).size;

    const newEnquiries = enquiries.filter(
        (item) => item.status === "New"
    ).length;

    const contactedEnquiries = enquiries.filter(
        (item) => item.status === "Contacted"
    ).length;

    const completedEnquiries = enquiries.filter(
        (item) => item.status === "Completed"
    ).length;

    return (
        <div className="owner-dashboard">
            <aside
                className={`owner-sidebar ${sidebarOpen ? "owner-sidebar-open" : ""
                    }`}
            >
                <div className="owner-sidebar-logo">
                    <span>LOOP</span>
                    <span>X</span>
                </div>

                <div className="owner-sidebar-title">
                    OWNER PANEL
                </div>

                <nav>
                    <button
                        type="button"
                        className="owner-nav-active"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <MessageSquare size={19} />
                        Enquiries
                    </button>

                    <button type="button">
                        <BriefcaseBusiness size={19} />
                        Projects
                    </button>

                    <button type="button">
                        <Users size={19} />
                        Customers
                    </button>
                </nav>

                <button
                    type="button"
                    className="owner-sidebar-logout"
                    onClick={handleLogout}
                >
                    <LogOut size={19} />
                    Logout
                </button>
            </aside>

            {sidebarOpen && (
                <div
                    className="owner-sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <main className="owner-main">
                <header className="owner-header">
                    <button
                        type="button"
                        className="owner-mobile-menu"
                        onClick={() =>
                            setSidebarOpen(!sidebarOpen)
                        }
                    >
                        {sidebarOpen ? <X /> : <Menu />}
                    </button>

                    <div>
                        <h1>Enquiries</h1>

                        <p>
                            Manage enquiries received from your website.
                        </p>
                    </div>

                    <div className="owner-header-actions">
                        <button
                            type="button"
                            className="owner-notification"
                            title="New enquiries"
                        >
                            <Bell size={20} />

                            {newEnquiries > 0 && (
                                <span>{newEnquiries}</span>
                            )}
                        </button>

                        <button
                            type="button"
                            className="owner-refresh-button"
                            onClick={loadEnquiries}
                            disabled={loading}
                            title="Refresh enquiries"
                        >
                            <RefreshCw
                                size={18}
                                className={
                                    loading
                                        ? "owner-refresh-spinning"
                                        : ""
                                }
                            />
                        </button>

                        <button
                            type="button"
                            className="owner-header-logout"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </header>

                <section className="owner-stats">
                    <div className="owner-stat-card">
                        <div className="owner-stat-icon">
                            <MessageSquare />
                        </div>

                        <div>
                            <p>Total Enquiries</p>
                            <h2>{enquiries.length}</h2>
                        </div>
                    </div>

                    <div className="owner-stat-card">
                        <div className="owner-stat-icon">
                            <Users />
                        </div>

                        <div>
                            <p>Customers</p>
                            <h2>{uniqueCustomers}</h2>
                        </div>
                    </div>

                    <div className="owner-stat-card">
                        <div className="owner-stat-icon">
                            <BriefcaseBusiness />
                        </div>

                        <div>
                            <p>Services</p>
                            <h2>{uniqueServices}</h2>
                        </div>
                    </div>

                    <div className="owner-stat-card">
                        <div className="owner-stat-icon">
                            <CheckCircle2 />
                        </div>

                        <div>
                            <p>Completed</p>
                            <h2>{completedEnquiries}</h2>
                        </div>
                    </div>
                </section>

                <section className="owner-status-summary">
                    <div>
                        <span className="status-dot status-new"></span>
                        <span>New</span>
                        <strong>{newEnquiries}</strong>
                    </div>

                    <div>
                        <span className="status-dot status-contacted"></span>
                        <span>Contacted</span>
                        <strong>{contactedEnquiries}</strong>
                    </div>

                    <div>
                        <span className="status-dot status-completed"></span>
                        <span>Completed</span>
                        <strong>{completedEnquiries}</strong>
                    </div>
                </section>

                <section className="owner-enquiries-card">
                    <div className="owner-enquiries-top">
                        <div>
                            <h2>Recent Enquiries</h2>

                            <p>
                                All enquiries submitted through LoopX website.
                            </p>
                        </div>

                        <div className="owner-search">
                            <Search size={18} />

                            <input
                                type="text"
                                placeholder="Search enquiries..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {loading && (
                        <div className="owner-loading">
                            Loading enquiries...
                        </div>
                    )}

                    {!loading &&
                        filteredEnquiries.length === 0 && (
                            <div className="owner-empty">
                                <MessageSquare size={40} />

                                <h3>No enquiries found</h3>

                                <p>
                                    Website enquiries will appear here.
                                </p>
                            </div>
                        )}

                    {!loading &&
                        filteredEnquiries.length > 0 && (
                            <div className="owner-table-wrapper">
                                <table className="owner-table">
                                    <thead>
                                        <tr>
                                            <th>Customer</th>
                                            <th>Email</th>
                                            <th>Service</th>
                                            <th>Message</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredEnquiries.map(
                                            (item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <div className="customer-name">
                                                            <div className="customer-avatar">
                                                                {(
                                                                    item.name ||
                                                                    "?"
                                                                )
                                                                    .charAt(0)
                                                                    .toUpperCase()}
                                                            </div>

                                                            {item.name ||
                                                                "Unknown"}
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <a
                                                            href={`mailto:${item.email}`}
                                                        >
                                                            {item.email ||
                                                                "No email"}
                                                        </a>
                                                    </td>

                                                    <td>
                                                        <span className="service-badge">
                                                            {item.service ||
                                                                "General"}
                                                        </span>
                                                    </td>

                                                    <td className="message-cell">
                                                        {item.message ||
                                                            "No message"}
                                                    </td>

                                                    <td>
                                                        <div className="date-cell">
                                                            <CalendarDays
                                                                size={16}
                                                            />

                                                            {item.created_at
                                                                ? new Date(
                                                                    item.created_at
                                                                ).toLocaleDateString()
                                                                : "N/A"}
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <select
                                                            className={`owner-status-select ${item.status ===
                                                                    "New"
                                                                    ? "status-select-new"
                                                                    : item.status ===
                                                                        "Contacted"
                                                                        ? "status-select-contacted"
                                                                        : "status-select-completed"
                                                                }`}
                                                            value={
                                                                item.status ||
                                                                "New"
                                                            }
                                                            onChange={(e) =>
                                                                updateStatus(
                                                                    item.id,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            disabled={
                                                                updatingId ===
                                                                item.id
                                                            }
                                                        >
                                                            <option value="New">
                                                                New
                                                            </option>

                                                            <option value="Contacted">
                                                                Contacted
                                                            </option>

                                                            <option value="Completed">
                                                                Completed
                                                            </option>
                                                        </select>
                                                    </td>

                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="owner-delete-button"
                                                            onClick={() =>
                                                                deleteEnquiry(
                                                                    item.id
                                                                )
                                                            }
                                                            disabled={
                                                                deletingId ===
                                                                item.id
                                                            }
                                                            title="Delete enquiry"
                                                        >
                                                            <Trash2
                                                                size={17}
                                                            />

                                                            {deletingId ===
                                                                item.id
                                                                ? "Deleting..."
                                                                : "Delete"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                </section>
            </main>
        </div>
    );
}

export default OwnerDashboard;