import { Outlet, Link } from 'react-router-dom';

const Layout = () => (
  <>
    <nav style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '20px' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/profile">Profile (Protected)</Link></li>
        <li><Link to="/blog/react-router-v6">Dynamic Post Example</Link></li>
        <li><Link to="/profile/details">Profile Details (Nested)</Link></li>
      </ul>
    </nav>
    <hr />
    {/* Outlet renders the current route's component */}
    <div className="content">
      <Outlet />
    </div>
  </>
);
export default Layout;