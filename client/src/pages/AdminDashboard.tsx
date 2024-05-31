    import { Link } from "react-router-dom";
    import "../styles/adminDashboard.css";

    export const AdminDashboard = () => {
        return (
            <>
            <div className="admin-dashboard">
            
                <header className="admin-header">
                    <h1>Admin Panel</h1>
                    <nav className="admin-nav">
                        <ul className="navlinks">
                            <li><Link to="create-newsletter">Create Newsletter</Link></li>
                            <li><Link to="list-newsletters">List Newsletters</Link></li>
                           
                
                        </ul>
                    </nav>
            
                </header>
                </div>
                
                <div className="admin-dashboard">
                <main className="admin-main">
                    <section className="dashboard-section-welcome">
                        <h2>Welcome, Admin!</h2>
                        <p>Here you can manage content, user access, and view site analytics.</p>
                    </section>
                    <section className="dashboard-section-quickstats">
                        <h3>Quick Stats</h3>
                        <div >
                            <div className="stat-item">
                                <h4>Total Users</h4>
                                <p>1,234</p>
                            </div>
                            <div className="stat-item">
                                <h4>Active Sessions</h4>
                                <p>56</p>
                            </div>
                            <div className="stat-item">
                                <h4>New Articles</h4>
                                <p>12</p>
                            </div>
                        </div>
                    </section>
                    <section className="dashboard-section">
                        <h3>Recent Activities</h3>
                        <ul className="activity-list">
                            <li>User JohnDoe updated the article "How to Learn JavaScript".</li>
                            <li>New user JaneDoe registered.</li>
                            <li>Team started coding.</li>
                        </ul>
                    </section>
                    
                </main>
                </div>
                
                </>
            
        );
    };
