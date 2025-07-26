import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <nav className="space-x-4">
        <Link to="/blogs"    className="text-blue-600 hover:underline">Blogs</Link>
        <Link to="/projects" className="text-blue-600 hover:underline">Projects</Link>
        <Link to="/messages" className="text-blue-600 hover:underline">Messages</Link>
      </nav>
    </div>
  );
}
