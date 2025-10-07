"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            className="flex justify-center lg:order-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div
                className="w-90 h90 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src="/assets/MasterSuit.jpeg"
                  alt="Denis Syengo"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="text-center lg:text-left lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              👋 Welcome to my portfolio
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Denis Syengo
            </motion.h1>

            <motion.div
              className="text-2xl lg:text-3xl font-semibold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Secure Software Developer
            </motion.div>

            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Nicknamed{" "}
              <span className="text-primary font-semibold">"Master Chief"</span>{" "}
              for my disciplined and strategic approach. I specialize in secure
              backend development, cybersecurity, and AI-driven solutions,
              bringing precision and purpose to every project.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button size="lg" className="group">
                <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Get In Touch
              </Button>
              <a
                href="/assets/DENIS SYENGO CV.pdf"
                download="DENIS_SYENGO_CV.pdf"
              >
                <Button variant="outline" size="lg" className="group">
                  <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Download CV
                </Button>
              </a>
            </motion.div>

            <motion.div
              className="mt-12 flex justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <ArrowDown className="h-6 w-6 text-primary" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
