import { motion } from "framer-motion";

export function Brands() {
  const brands = ["EPSON", "CITIZEN", "BIXOLON", "ZEBRA", "TSC", "XPRINTER"];

  return (
    <section className="py-16 bg-white border-b border-border/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-8">
        <h3 className="text-center text-sm font-semibold text-muted-foreground tracking-widest uppercase">
          Đối tác tin cậy - Thương hiệu uy tín
        </h3>
      </div>
      
      {/* Auto-scrolling container */}
      <div className="relative w-full flex overflow-x-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        
        <motion.div 
          className="flex items-center gap-16 whitespace-nowrap px-8"
          animate={{ x: [0, -1035] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 20 
          }}
        >
          {/* Double array for seamless loop */}
          {[...brands, ...brands, ...brands].map((brand, idx) => (
            <div 
              key={idx} 
              className="font-display font-extrabold text-3xl md:text-5xl text-slate-200 tracking-tighter"
            >
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
