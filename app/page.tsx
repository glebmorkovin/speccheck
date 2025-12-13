import AsIsToBe from "@/components/AsIsToBe";
import Contacts from "@/components/Contacts";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LeadForm from "@/components/LeadForm";
import Pricing from "@/components/Pricing";
import ProblemStats from "@/components/ProblemStats";
import RoiCalculator from "@/components/RoiCalculator";
import SolutionSteps from "@/components/SolutionSteps";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute -left-10 top-24 h-28 w-56 rotate-6 rounded-full bg-lavender blur-2xl" />
      <div className="absolute right-0 top-80 h-24 w-48 -rotate-6 rounded-full bg-mint blur-2xl" />
      <div className="absolute -right-12 bottom-24 h-32 w-64 rotate-3 rounded-full bg-sky blur-2xl" />
      <div className="relative z-10">
        <Header />
        <main className="space-y-4">
          <Hero />
          <ProblemStats />
          <AsIsToBe />
          <SolutionSteps />
          <TechStack />
          <Features />
          <RoiCalculator />
          <Pricing />
          <FAQ />
          <LeadForm />
          <Contacts />
        </main>
        <Footer />
      </div>
    </div>
  );
}
