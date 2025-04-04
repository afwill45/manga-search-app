// app/layout.js
console.log('Root layout loaded');
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>Manga Search App</title>
      </head>
      <body>
        <header>
          <h1>Manga Search App</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
