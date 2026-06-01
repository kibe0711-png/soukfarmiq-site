import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";

export const metadata = {
  title: "About Altiora — Company Information",
  description:
    "Altiora builds custom operations systems for sectors generic ERPs ignore. Learn about our story, strategy, and team.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <AboutContent />
      <Footer />
    </main>
  );
}
