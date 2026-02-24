import Link from "next/link";

export default function NavBar() {
  return (
    <nav
      style={{
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1f1f2e",
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
    >
      <Link href="/" className="flex items-center gap-2 no-underline">
        <span className="text-2xl">📻</span>
        <span
          className="text-xl font-bold tracking-widest"
          style={{ color: "#00d4ff", letterSpacing: "0.2em" }}
        >
          RADIA
        </span>
      </Link>
      <div className="flex items-center gap-6 text-sm" style={{ color: "#9999bb" }}>
        <Link
          href="/"
          className="hover:text-white transition-colors no-underline"
          style={{ color: "inherit" }}
        >
          Globe
        </Link>
        <Link
          href="/continent/europe"
          className="hover:text-white transition-colors no-underline"
          style={{ color: "inherit" }}
        >
          Explore
        </Link>
        <Link
          href="/city/new-york"
          className="hover:text-white transition-colors no-underline"
          style={{ color: "inherit" }}
        >
          Cities
        </Link>
      </div>
    </nav>
  );
}
