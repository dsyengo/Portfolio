"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const Projects = () => {
  const projects = [
    {
      title: "CyberPolicy Pro",
      description:
        "A comprehensive compliance management system for businesses to track and manage cybersecurity policies, conduct risk assessments, and ensure regulatory compliance.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["Node.js", "React", "MongoDB", "Express", "JWT"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "AI Health Assistant",
      description:
        "An intelligent personal health assistant powered by machine learning that provides personalized health recommendations and tracks wellness metrics.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: [
        "Python",
        "TensorFlow",
        "React Native",
        "FastAPI",
        "PostgreSQL",
      ],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "Student Clearance System",
      description:
        "A digital platform streamlining the student clearance process for educational institutions, reducing paperwork and improving efficiency.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["MERN Stack", "Socket.io", "PDF Generation", "Email API"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      title: "Smart Air Quality Monitor",
      description:
        "IoT-based air quality monitoring system with AI analytics, developed for Huawei ICT Competition 2024-2025.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: [
        "IoT",
        "Python",
        "Machine Learning",
        "Huawei Cloud",
        "React",
      ],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
  ];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work in secure development, AI/ML, and innovative
            solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={project.featured ? "lg:col-span-1" : "lg:col-span-1"}
            >
              <Card className="h-full group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/50 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {project.featured && (
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center pt-6">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="group/btn">
                      <Github className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      Code
                    </Button>
                    <Button size="sm" className="group/btn">
                      <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      Live Demo
                    </Button>
                  </div>

                  <motion.div
                    className="text-primary"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button variant="outline" size="lg" className="group">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
