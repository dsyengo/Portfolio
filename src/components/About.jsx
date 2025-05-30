"use client";

import { motion } from "framer-motion";
import { Code, Shield, Brain, Music } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const About = () => {
  const highlights = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Backend Development",
      description: "Scalable and secure server-side solutions",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Cybersecurity",
      description: "Protecting digital assets and infrastructure",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI/ML Enthusiast",
      description: "Leveraging artificial intelligence for innovation",
    },
    {
      icon: <Music className="h-6 w-6" />,
      title: "Music & Leadership",
      description: "Chorister and choir trainer in my spare time",
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I am a passionate backend developer and cybersecurity specialist
                with a deep commitment to creating secure, scalable solutions.
                My journey in technology is driven by a desire to solve complex
                problems and protect digital ecosystems.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                With expertise spanning from secure backend architectures to
                AI/ML implementations, I bring a strategic mindset to every
                project. My nickname "Master Chief" reflects my disciplined
                approach and leadership qualities in both technical and creative
                endeavors.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Beyond coding, I find harmony in music as a chorister and choir
                trainer, where I apply the same precision and creativity that
                drives my technical work.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/50 hover:border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary mr-3">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
