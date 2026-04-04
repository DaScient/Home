export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-8 text-sm text-muted sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} DaScient. All rights reserved.</p>
        <p className="font-mono text-xs">
          AI &middot; ML &middot; Data Science &middot; Strategic Analytics
        </p>
      </div>
    </footer>
  );
}
