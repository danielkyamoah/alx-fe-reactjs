import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

export default function PostsComponent() {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery(['posts'], fetchPosts, {
    staleTime: 1000 * 60 * 2, // 2 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Posts</h2>
        <div>
          <button onClick={() => refetch()} style={{ marginRight: 8 }}>
            Refetch
          </button>
          <span style={{ fontSize: 12, color: '#666' }}>{isFetching ? 'Updating…' : 'Idle'}</span>
        </div>
      </div>

      {isLoading && <p>Loading posts…</p>}
      {isError && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      {data && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
          {data.slice(0, 20).map((post) => (
            <article key={post.id} style={{ background: 'white', padding: 12, borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: 16 }}>{post.title}</h3>
              <p style={{ margin: 0, color: '#333' }}>{post.body}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
