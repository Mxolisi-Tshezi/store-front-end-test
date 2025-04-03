// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";

// export default function MainLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       <html lang="en">

//         <Header />
//         <body>
//           <main className="min-h-screen p-4">{children}</main>
//         </body>
//         <Footer />
//       </html>

//     </>
//   );
// }


import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
