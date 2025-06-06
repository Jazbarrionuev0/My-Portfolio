"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function AboutMe() {
  return (
    <section className="flex items-center flex-col md:flex-row min-h-[90vh] px-4 md:px-8 py-20 md:py-24">
      <div className="flex flex-col gap-6 max-w-3xl">
        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm md:text-lg text-portfolio-accent font-bold tracking-widest"
        >
          HELLO, MY NAME IS JAZMIN
        </motion.h4>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          I&apos;m a software AI <span className="text-portfolio-accent">developer</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-portfolio-text-muted leading-relaxed mt-2"
        >
          I specialize in frontend development and artificial intelligence, creating impactful digital experiences that combine beautiful interfaces
          with powerful technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-4 flex flex-col md:flex-row gap-4"
        >
          <Button size="lg" className="bg-portfolio-accent hover:bg-portfolio-accent/90 text-white px-6">
            <Link href="/projects" className="flex items-center gap-2">
              View Projects <ArrowRight size={16} />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white px-6"
          >
            <Link href="/about" className="flex items-center gap-2">
              About Me <ArrowRight size={16} />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 flex flex-row gap-6 text-portfolio-text-muted"
        >
          <Link
            href="https://github.com/Jazbarrionuev0"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-portfolio-accent transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/jazmin-barrionuevo/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-portfolio-accent transition-colors"
          >
            LinkedIn
          </Link>
          <Link href="mailto:jazbarrionuevo@gmail.com" className="hover:text-portfolio-accent transition-colors">
            Contact
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
