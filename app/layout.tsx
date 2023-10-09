import Nav from "@/components/Nav";
import "@/styles/globals.css";

export const metadata = {
  title: "Promptify",
  description: "Discover and share AI prompts",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
