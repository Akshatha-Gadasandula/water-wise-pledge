import React, { useEffect, useState } from 'react';
import { getTips } from '../lib/firestoreHelpers';

export default function TipOfTheDay() {
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadTips() {
      try {
        const tips = await getTips();
        if (!mounted) return;
        if (Array.isArray(tips) && tips.length > 0) {
          setTip(tips[0]);
        } else {
          setTip(null);
        }
      } catch (err) {
        console.error('Failed to load tips:', err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadTips();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section aria-labelledby="tip-of-day" className="max-w-xl mx-auto p-4">
      <h2 id="tip-of-day" className="text-lg font-semibold mb-2">Tip of the Day</h2>

      <div aria-live="polite" aria-busy={loading}>
        {loading && <p className="text-sm text-gray-600">Loading tip...</p>}

        {!loading && error && (
          <p className="text-sm text-red-600">Could not load tip. Please try again later.</p>
        )}

        {!loading && !error && tip && (
          <article className="p-3 bg-white rounded border">
            <p className="text-base text-gray-800">{tip.text}</p>
            {tip.date && (
              <time className="text-xs text-gray-500 block mt-2">
                {typeof tip.date === 'object' && tip.date.toDate ? tip.date.toDate().toLocaleString() : String(tip.date)}
              </time>
            )}
          </article>
        )}

        {!loading && !error && !tip && (
          <div className="p-3 bg-gray-50 rounded border text-sm text-gray-700">
            No tips available yet. Check back later or contribute a tip!
          </div>
        )}
      </div>
    </section>
  );
}
