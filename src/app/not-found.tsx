import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#0a1a2e",
          color: "#ffffff",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "3rem", fontWeight: 600, color: "#ab8752" }}>404</p>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Page not found</h1>
          <Link
            href="/"
            style={{ color: "#c7a66f", marginTop: "1rem", display: "inline-block" }}
          >
            Back to Island Horizons
          </Link>
        </div>
      </body>
    </html>
  );
}
