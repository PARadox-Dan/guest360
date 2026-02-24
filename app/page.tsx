import Link from 'next/link';

export default function RootPage() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>Guest 360</h1>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        <Link href="/guest-insights">Guest Insights</Link>
      </p>
    </div>
  );
}
