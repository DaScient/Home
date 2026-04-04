import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search — DaScient",
  description:
    "DaScient Search — AI-powered search for insights, analytics, and intelligent assistance.",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
