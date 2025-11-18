import React, { useState } from 'react';
import { addPledge } from '../lib/firestoreHelpers';

export default function PledgeForm() {
  const [name, setName] = useState('');
  const [pledgeText, setPledgeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!pledgeText.trim()) {
      setMessage({ type: 'error', text: 'Please enter your pledge.' });
      return;
    }

    setLoading(true);
    try {
      await addPledge({ name: name.trim(), pledgeText: pledgeText.trim() });
      setMessage({ type: 'success', text: 'Pledge submitted — thank you!' });
      setName('');
      setPledgeText('');
    } catch (err) {
      console.error('Pledge submit error:', err);
      setMessage({ type: 'error', text: err?.message || 'Failed to submit pledge.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded-md shadow-sm">
      {message && (
        <div
          className={`mb-4 p-2 rounded text-sm ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
          role="status"
        >
          {message.text}
        </div>
      )}

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Your name (optional)"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Pledge</label>
        <textarea
          value={pledgeText}
          onChange={(e) => setPledgeText(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={4}
          placeholder="Describe your pledge to save water"
        />
      </div>

      <div className="flex items-center space-x-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Pledge'}
        </button>

        <button
          type="button"
          onClick={() => {
            setName('');
            setPledgeText('');
            setMessage(null);
          }}
          className="text-sm text-gray-600"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
