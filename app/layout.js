import './globals.css';

export const metadata = {
  title: 'Arcana ? Tarot Reader',
  description: 'Draw tarot cards for quick, insightful readings.',
  metadataBase: new URL('https://agentic-8ada25cd.vercel.app'),
  openGraph: {
    title: 'Arcana ? Tarot Reader',
    description: 'Draw tarot cards for quick, insightful readings.',
    url: 'https://agentic-8ada25cd.vercel.app',
    siteName: 'Arcana',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="container">
          {children}
        </main>
        <footer className="footer">
          <span>Arcana ? Tarot Reader</span>
          <a href="https://agentic-8ada25cd.vercel.app" target="_blank" rel="noreferrer">agentic-8ada25cd</a>
        </footer>
      </body>
    </html>
  );
}
