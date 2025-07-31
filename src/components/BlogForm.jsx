// src/components/BlogForm.jsx
import { useState, useEffect } from 'react'
import API from '../api/api'             // baseURL → https://…/api
import { useNavigate, useParams } from 'react-router-dom'

export function BlogForm() {
  const { id } = useParams()            // present if editing
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: [],
    publishDate: '',
    file: null,           // keep it as `file`
  })

  // If editing, fetch the blog
  useEffect(() => {
    if (!id) return
    API.get(`/blogs/${id}`)
      .then(res => {
        const b = res.data
        setForm({
          title:       b.title,
          excerpt:     b.excerpt,
          content:     b.content,
          tags:        b.tags,
          publishDate: b.publishDate.slice(0, 10),
          file:        null,  // never preload the file input
        })
      })
      .catch(console.error)
  }, [id])

  const handleSubmit = async e => {
    e.preventDefault()

    // Build FormData with `file`
    const data = new FormData()
    data.append('title',       form.title)
    data.append('excerpt',     form.excerpt)
    data.append('content',     form.content)
    data.append('publishDate', form.publishDate)
    data.append('tags',        JSON.stringify(form.tags))
    if (form.file) {
      data.append('file', form.file)     // ⚠️ use `file`, not `image`
    }

    try {
      if (id) {
        // EDIT
        await API.put(`/blogs/${id}`, data)
      } else {
        // CREATE
        await API.post(`/blogs`, data)
      }
      navigate('/blogs')
    } catch (err) {
      console.error(err.response?.data || err)
      alert(
        'Save failed: ' +
          (err.response?.data?.error ||
            (err.response?.data?.details?.join(', ')) ||
            err.message)
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold">{id ? 'Edit' : 'New'} Blog</h2>

      <input
        type="text"
        required
        placeholder="Title"
        value={form.title}
        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        required
        placeholder="Excerpt"
        value={form.excerpt}
        onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
        className="w-full border px-3 py-2 rounded"
      />

      <textarea
        required
        placeholder="Content"
        value={form.content}
        onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
        className="w-full border px-3 py-2 rounded h-32"
      />

      <input
        type="date"
        required
        value={form.publishDate}
        onChange={e => setForm(f => ({ ...f, publishDate: e.target.value }))}
        className="border px-3 py-2 rounded"
      />

      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={form.tags.join(', ')}
        onChange={e =>
          setForm(f => ({
            ...f,
            tags: e.target.value
              .split(',')
              .map(t => t.trim())
              .filter(Boolean),
          }))
        }
        className="w-full border px-3 py-2 rounded"
      />

      <div>
        <label className="block mb-1">Featured Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setForm(f => ({ ...f, file: e.target.files[0] }))}
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
        {id ? 'Update' : 'Create'}
      </button>
    </form>
  )
}

export default BlogForm
