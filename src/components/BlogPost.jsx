"use client";

import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Twitter,
  Linkedin,
  Copy,
  Check,
  Tag,
  Eye,
} from "lucide-react";
import { blogPosts } from "../data/blogData";
import { useState, useEffect } from "react";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Find the current post
  const post = blogPosts.find((p) => p.slug === slug);

  // Find related posts (same category, different post)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post?.category && p.id !== post?.id)
    .slice(0, 3);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle not found
  if (!post) {
    return (
      <section className="py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Post Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Back to Blog
            </button>
          </Link>
        </div>
      </section>
    );
  }

  const handleShare = async (platform) => {
    const url = window.location.href;
    const text = `Check out "${post.title}" by Denis Syengo`;

    if (platform === "copy") {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        "_blank",
      );
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        "_blank",
      );
    }
  };

  return (
    <section className="py-20 min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/blog">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Category Badge */}
          <div className="mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            {post.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{post.views} views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-12
                       prose-headings:text-foreground prose-headings:font-bold
                       prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                       prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                       prose-p:text-muted-foreground prose-p:leading-relaxed
                       prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                       prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                       prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg
                       prose-ul:text-muted-foreground prose-li:mb-2
                       prose-blockquote:border-l-primary prose-blockquote:bg-muted/30
                       prose-blockquote:p-4 prose-blockquote:rounded-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags Section */}
          <div className="flex flex-wrap items-center gap-3 mb-8 pt-8 border-t border-border">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 p-6 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              <span className="font-medium">Share this article:</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleShare("twitter")}
                className="p-2 bg-background rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
              >
                <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="p-2 bg-background rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="p-2 bg-background rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 group relative"
              >
                {copied ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5 group-hover:scale-110 transition-transform" />
                )}
              </button>
            </div>
          </div>

          {/* Author Bio Box */}
          <div className="mb-12 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border">
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">{post.author}</h3>
                <p className="text-muted-foreground">
                  Full-Stack Developer | DevOps & Cybersecurity Specialist
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Building secure, scalable systems and sharing knowledge about
                  AI, security, and modern development practices.
                </p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                    <div className="bg-gradient-to-br from-background to-muted/50 rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold mb-2 hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.article>
      </div>
    </section>
  );
};

export default BlogPost;
