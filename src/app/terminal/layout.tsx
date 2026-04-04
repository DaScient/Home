import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DaScient Terminal",
  description:
    "DaScient Terminal — Strategic Enterprise Intelligence command interface.",
};

export default function TerminalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
