// src/components/BlogForm.jsx
import { useState, useEffect } from 'react'
import API from '../api/api'         // baseURL → https://…/api
import { useNavigate, useParams } from 'react-router-dom'

export function BlogForm() {
  const { id } = useParams()        // if editing
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: [],
    publishDate: '',
    file: null,
  })

  // Load existing post when editing
  useEffect(() => {
    if (!id) return
    API.get(`/blogs/${id}`)          // ← GET /api/blogs/:id
      .then(res => {
        const b = res.data
        setForm({
          title: b.title,
          excerpt: b.excerpt,
          content: b.content,
          tags: b.tags,
          publishDate: b.publishDate.slice(0, 10),
          file: null,
        })
      })
      .catch(console.error)
  }, [id])

  const handleSubmit = async e => {
    e.preventDefault()

    // Build FormData
    const data = new FormData()
    data.append('title', form.title)
    data.append('excerpt', form.excerpt)
    data.append('content', form.content)
    data.append('publishDate', form.publishDate)
    data.append('tags', JSON.stringify(form.tags))
    if (form.file) data.append('file', form.file)

    try {
      if (id) {
        // EDIT
        if (!form.file) {
          // JSON update
          await API.put(`/blogs/${id}`, {
            title: form.title,
            excerpt: form.excerpt,
            content: form.content,
            publishDate: form.publishDate,
            tags: form.tags,
          })
        } else {
          // multipart update
          await API.put(`/blogs/${id}`, data)
        }
      } else {
        // CREATE
        await API.post('/blogs', data)   // ← POST /api/blogs
      }
      navigate('/blogs')
    } catch (err) {
      console.error(err.response?.data || err)
      alert('Save failed: ' + (err.response?.data?.error || err.message))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold">{id ? 'Edit' : 'New'} Blog</h2>
      {/* …the rest of your inputs, unchanged… */}
    </form>
  )
}

export default BlogForm
