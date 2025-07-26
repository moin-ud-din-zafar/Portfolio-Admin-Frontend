import { useState } from 'react';
import API from '../api/api';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      await API.post('/messageroutes', form);
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Contact Us</h2>
      {status === 'sent' && (
        <div className="p-3 bg-green-100 text-green-800 rounded">
          Thanks! Your message has been sent.
        </div>
      )}
      {status === 'error' && (
        <div className="p-3 bg-red-100 text-red-800 rounded">
          Oops, something went wrong. Please try again.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name','email','subject'].map(field => (
          <input
            key={field}
            type={field === 'email' ? 'email' : 'text'}
            name={field}
            required
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={e =>
              setForm(f => ({ ...f, [field]: e.target.value }))
            }
            className="w-full border px-3 py-2 rounded"
          />
        ))}

        <textarea
          name="message"
          required
          placeholder="Message"
          rows={6}
          value={form.message}
          onChange={e =>
            setForm(f => ({ ...f, message: e.target.value }))
          }
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:opacity-90"
        >
          {status === 'loading' ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
