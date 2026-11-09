"use client";

import { motion } from "framer-motion";
import { Award, Trophy, BadgeIcon as Certificate, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { usePublicData } from "../hooks/usePublicData";

// Map icon-name strings from DB to actual components
const iconMap = { Trophy, Certificate, Award, Star };

const Achievements = () => {
  const { data: achievements, loading } = usePublicData("/achievements");

  const stats = [
    { label: "Years of Experience", value: "3+", icon: <Star className="h-5 w-5" /> },
    { label: "Projects Completed", value: "10+", icon: <Trophy className="h-5 w-5" /> },
    { label: "Certifications", value: achievements.filter(a => a.type === "Certification").length + "+", icon: <Certificate className="h-5 w-5" /> },
    { label: "Awards Won", value: achievements.filter(a => a.type === "Award" || a.type === "Competition").length, icon: <Award className="h-5 w-5" /> },
  ];

  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Achievements & Recognition
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition for excellence in cybersecurity, innovation, and technical leadership
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 rounded-xl bg-muted/50 animate-pulse" />
            ))}
          </div>
        ) : achievements.length === 0 ? (
          <p className="text-center text-muted-foreground">No achievements added yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = iconMap[achievement.icon] || Award;
              return (
                <motion.div
                  key={achievement._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-background to-muted/50">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-r ${achievement.color} text-white group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-2">
                            {achievement.type}
                          </Badge>
                          <div className="text-sm text-muted-foreground font-medium">
                            {achievement.year}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-200">
                        {achievement.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;