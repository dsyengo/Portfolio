"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { usePublicData } from "../hooks/usePublicData";

const Projects = () => {
  const { data: projects, loading } = usePublicData("/projects");

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
            A showcase of my work in secure development, AI/ML, and innovative solutions
          </p>
        </motion.div>

        {loading ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-72 rounded-xl bg-muted/50 animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center text-muted-foreground">No projects yet.</p>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/50 overflow-hidden">
                  {project.image && (
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {project.featured && (
                        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                      )}
                    </div>
                  )}

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
                      {project.technologies?.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between items-center pt-6">
                    <div className="flex space-x-2">
                      {project.githubUrl && project.githubUrl !== "#" && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer">
                          <Button size="sm" variant="outline" className="group/btn">
                            <Github className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                            Code
                          </Button>
                        </a>
                      )}
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer">
                          <Button size="sm" className="group/btn">
                            <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                            Live Demo
                          </Button>
                        </a>
                      )}
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
        )}
      </div>
    </section>
  );
};

export default Projects;