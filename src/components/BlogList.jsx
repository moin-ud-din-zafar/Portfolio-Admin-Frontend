import { useState, useEffect } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

export function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get('/blogroutes')
      .then(res => setBlogs(res.data))
      .catch(console.error);
  }, []);

  const del = id => {
    if (!window.confirm('Delete this blog?')) return;
    API.delete(`/blogroutes/${id}`)
      .then(() => setBlogs(b => b.filter(x => x._id !== id)))
      .catch(console.error);
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blogs</h2>
        <Link
          to="/blogs/new"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + New Blog
        </Link>
      </div>

      {blogs.map(b => (
        <div key={b._id} className="border p-4 rounded flex space-x-4">
          {b.imageUrl && (
            <img
              src={b.imageUrl}
              alt=""
              className="h-16 w-24 object-cover rounded"
            />
          )}
          <div className="flex-1">
            <Link to={`/blogs/edit/${b._id}`} className="text-xl font-semibold">
              {b.title}
            </Link>
            <p className="text-sm text-gray-600">{b.excerpt}</p>
            <p className="text-xs text-gray-400">
              {new Date(b.publishDate).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => del(b._id)}
            className="text-red-600 hover:underline self-start"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
