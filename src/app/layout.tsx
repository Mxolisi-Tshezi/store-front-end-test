import "@/styles/globals.css";

export const metadata = {
    title: "Sumer Store",
    description: "Your one-stop shop for everything!",
  };
  
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
  