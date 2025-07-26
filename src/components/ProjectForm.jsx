// src/components/ProjectForm.jsx

import { useState, useEffect } from 'react';
import API from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProjectForm() {
  const { id }      = useParams();
  const navigate    = useNavigate();

  // include `image` (URL) + `file`
  const empty = {
    title: '', description: '',
    tags: [], demoUrl: '', codeUrl: '',
    featured: false,
    stats: { users: '', performance: '', rating: '' },
    image: '',    // existing image URL
    file: null,   // new file if uploading
  };

  const [form, setForm] = useState(empty);

  // Load all projects and find the one with `id`
  useEffect(() => {
    if (!id) return;

    API.get('/projectroutes')
      .then(res => {
        const proj = res.data.find(p => p._id === id);
        if (!proj) throw new Error('Project not found');
        setForm({
          title:       proj.title,
          description: proj.description,
          tags:        proj.tags,
          demoUrl:     proj.demoUrl,
          codeUrl:     proj.codeUrl,
          featured:    proj.featured,
          stats:       proj.stats,
          image:       proj.image,  // show existing
          file:        null,
        });
      })
      .catch(err => {
        console.error(err);
        alert('Failed to load project');
      });
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (id) {
      // === UPDATE ===
      // Backend update only accepts JSON (it doesn't run multer on PUT)
      const payload = {
        title:       form.title,
        description: form.description,
        tags:        form.tags,
        demoUrl:     form.demoUrl,
        codeUrl:     form.codeUrl,
        featured:    form.featured,
        stats:       form.stats,
        // note: image updates via PUT won't work unless you add multer middleware
      };

      try {
        await API.put(`/projectroutes/${id}`, payload);
        navigate('/projects');
      } catch (err) {
        console.error(err);
        alert('Update failed');
      }

    } else {
      // === CREATE ===
      // use FormData so multer can handle `image`
      const data = new FormData();
      data.append('title',       form.title);
      data.append('description', form.description);
      data.append('tags',        JSON.stringify(form.tags));
      data.append('demoUrl',     form.demoUrl);
      data.append('codeUrl',     form.codeUrl);
      data.append('featured',    form.featured);
      data.append('stats',       JSON.stringify(form.stats));
      if (form.file) data.append('image', form.file);

      try {
        await API.post('/projectroutes', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        navigate('/projects');
      } catch (err) {
        console.error(err);
        alert('Create failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold">{id ? 'Edit' : 'New'} Project</h2>

      <input
        type="text" required
        placeholder="Title"
        value={form.title}
        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
        className="w-full border px-3 py-2 rounded"
      />

      <textarea
        required
        placeholder="Description"
        value={form.description}
        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        className="w-full border px-3 py-2 rounded h-24"
      />

      <input
        type="text"
        placeholder="Tags (comma‑separated)"
        value={form.tags.join(', ')}
        onChange={e => setForm(f => ({
          ...f,
          tags: e.target.value
                   .split(',')
                   .map(t => t.trim())
                   .filter(Boolean)
        }))}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="url"
        placeholder="Demo URL"
        value={form.demoUrl}
        onChange={e => setForm(f => ({ ...f, demoUrl: e.target.value }))}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="url"
        placeholder="Code URL"
        value={form.codeUrl}
        onChange={e => setForm(f => ({ ...f, codeUrl: e.target.value }))}
        className="w-full border px-3 py-2 rounded"
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
        />
        <span>Featured</span>
      </label>

      <fieldset className="p-3 border rounded space-y-2">
        <legend>Stats</legend>
        {['users','performance','rating'].map(key => (
          <input
            key={key}
            type="text" required
            placeholder={key.charAt(0).toUpperCase()+key.slice(1)}
            value={form.stats[key]}
            onChange={e =>
              setForm(f => ({
                ...f,
                stats: { ...f.stats, [key]: e.target.value }
              }))
            }
            className="w-full border px-3 py-2 rounded"
          />
        ))}
      </fieldset>

      <div>
        <label className="block mb-1">
          {id ? 'Change Image (create-only)' : 'Image'}
        </label>

        {/* Show existing image when editing */}
        {id && form.image && !form.file && (
          <img
            src={form.image}
            alt="Existing"
            className="mb-2 h-24 w-auto object-cover rounded"
          />
        )}

        {/* File input only really used on create */}
        <input
          type="file"
          accept="image/*"
          disabled={!!id}  // optional: disable on edit since update endpoint won't handle it
          onChange={e => setForm(f => ({ ...f, file: e.target.files[0] }))}
          className="border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        {id ? 'Update' : 'Create'} Project
      </button>
    </form>
  );
}
