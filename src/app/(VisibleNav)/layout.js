import Navbar from "@/components/NavBar";

export default function ShowNavLayout({ children }) {
  return (
    <>
      <main>
      <Navbar />
        {children}
      </main>
    </>
  );
}
