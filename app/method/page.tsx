import NavBar from "@/components/NavBar";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata = {
  title: "The Altiora method — how we digitise an ops business in 6–12 weeks",
  description:
    "Discovery, scoping, build, deploy. Working software every Friday, on your vocabulary, in your timezone.",
};

export default function MethodPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}
