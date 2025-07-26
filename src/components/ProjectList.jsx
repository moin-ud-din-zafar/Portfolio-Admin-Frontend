import { useState, useEffect } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get('/projectroutes')
      .then(res => setProjects(res.data))
      .catch(console.error);
  }, []);

  const del = id => {
    if (!window.confirm('Delete this project?')) return;
    API.delete(`/projectroutes/${id}`)
      .then(() => setProjects(p => p.filter(x => x._id !== id)))
      .catch(console.error);
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Link
          to="/projects/new"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + New Project
        </Link>
      </div>

      {projects.map(p => (
        <div key={p._id} className="border p-4 rounded space-y-2">
          <h3 className="text-xl font-semibold">{p.title}</h3>
          <p className="text-gray-600">{p.description}</p>
          {p.tags?.length > 0 && (
            <div className="space-x-2 text-xs">
              {p.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-gray-200 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="space-x-4">
            <Link
              to={`/projects/edit/${p._id}`}
              className="text-blue-600 hover:underline"
            >
              Edit
            </Link>
            <button
              onClick={() => del(p._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
