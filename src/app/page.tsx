import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="flex max-w-2xl flex-col items-center gap-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Da<span className="text-accent">Scient</span>
        </h1>

        <p className="max-w-lg text-lg leading-relaxed text-muted">
          Emerging leaders in Artificial Intelligence, Machine Learning, Data
          Science, and Strategic Analytics — transforming data into actionable
          insights.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/search"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-8 font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Try DaScient Search
          </Link>
        </div>
      </div>
    </div>
  );
}

