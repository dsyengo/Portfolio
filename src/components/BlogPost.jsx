"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import api from "../lib/api";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/blog/${slug}`)
      .then((r) => setPost(r.data))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Link to="/blog" className="text-primary hover:underline">← Back to blog</Link>
      </div>
    );
  }

  return (
    <article className="py-20 max-w-3xl mx-auto px-6">
      <Link to="/blog" className="inline-flex items-center text-primary mb-8 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground flex-wrap">
          <span className="px-2 py-1 bg-primary/10 rounded-full text-primary">{post.category}</span>
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
        </div>

        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        {post.featuredImage && (
          <img src={post.featuredImage} alt={post.title} className="w-full rounded-xl mb-8" />
        )}

        <p className="text-lg text-muted-foreground mb-8 italic">{post.excerpt}</p>

        {/* content is markdown/HTML — render as HTML for simplicity */}
        <div
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10">
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-sm px-3 py-1 bg-muted rounded-full text-muted-foreground">
                <Tag className="h-3 w-3" /> {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </article>
  );
}