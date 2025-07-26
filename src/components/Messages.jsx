// src/components/Messages.jsx
import React, { useState, useEffect } from 'react';
import API from '../api/api';

// UI components inlined...
function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-4 ${className}`.trim()}>
      {children}
    </div>
  );
}
function CardContent({ children, className = '' }) {
  return <div className={`space-y-4 ${className}`.trim()}>{children}</div>;
}
function Table({ children, className = '' }) {
  return <table className={`min-w-full divide-y divide-gray-200 ${className}`.trim()}>{children}</table>;
}
function TableHeader({ children }) { return <thead className="bg-gray-50">{children}</thead>; }
function TableBody({ children })   { return <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>; }
function TableRow({ children, className = '' }) { return <tr className={className}>{children}</tr>; }
function TableHead({ children })   { return <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>; }
function TableCell({ children, className = '' }) { return <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${className}`.trim()}>{children}</td>; }
function Input({ className = '', ...props }) {
  return <input className={`px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`.trim()} {...props} />;
}

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch]   = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/messageroutes')
      .then(res => setMessages(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = messages.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Client Messages</h2>
        <Input
          placeholder="Search by name, email or subject..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {loading ? (
        <p>Loading messages...</p>
      ) : filtered.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(msg => (
                  <TableRow key={msg._id} className="hover:bg-gray-50">
                    <TableCell>{msg.name}</TableCell>
                    <TableCell>{msg.email}</TableCell>
                    <TableCell>{msg.subject}</TableCell>
                    <TableCell className="max-w-lg truncate">{msg.message}</TableCell>
                    <TableCell>{new Date(msg.receivedAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
