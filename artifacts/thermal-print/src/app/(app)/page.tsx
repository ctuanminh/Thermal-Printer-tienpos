import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import Products from "@/components/sections/Products";
import Features from "@/components/sections/Features";
import Brands from "@/components/sections/Brands";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Products />
      <Features />
      <Brands />
      <Contact />
    </>
  );
}
