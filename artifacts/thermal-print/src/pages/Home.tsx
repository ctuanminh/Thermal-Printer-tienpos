import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Categories } from "@/components/sections/Categories";
import { Products } from "@/components/sections/Products";
import { Features } from "@/components/sections/Features";
import { Brands } from "@/components/sections/Brands";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full">
        <Hero />
        <Brands />
        <Categories />
        <Products />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
