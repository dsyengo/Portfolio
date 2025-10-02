"use client";

import { motion } from "framer-motion";
import { Code, Database, Shield, Brain, Server, Cloud } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      title: "Backend Development",
      icon: <Server className="h-8 w-8" />,
      skills: ["Node.js", "Express.js", "Python", "REST APIs", "GraphQL"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Frontend Technologies",
      icon: <Code className="h-8 w-8" />,
      skills: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "Next.js"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Databases",
      icon: <Database className="h-8 w-8" />,
      skills: ["MongoDB", "MySQL", "PostgreSQL", "Redis", "Firebase"],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Cybersecurity",
      icon: <Shield className="h-8 w-8" />,
      skills: [
        "Security Auditing",
        "Penetration Testing",
        "OWASP",
        "Encryption",
        "Compliance",
      ],
      color: "from-red-500 to-orange-500",
    },
    {
      title: "DevOps & Tools",
      icon: <Cloud className="h-8 w-8" />,
      skills: ["Docker", "AWS", "Git", "CI/CD", "Linux"],
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building secure, scalable, and
            innovative solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-background to-muted/50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white mr-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1 + skillIndex * 0.05,
                        }}
                        viewport={{ once: true }}
                      >
                        <Badge
                          variant="secondary"
                          className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6">Additional Competencies</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Agile/Scrum",
              "Technical Leadership",
              "Code Review",
              "System Architecture",
              "Performance Optimization",
              "Testing",
              "Documentation",
              "Mentoring",
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Badge
                  variant="outline"
                  className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
