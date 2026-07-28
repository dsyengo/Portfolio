const BlogPost = require('../models/BlogPost');

// @desc    Get all blog posts with pagination, search, and filter
// @route   GET /api/blog
// @access  Public
const getBlogPosts = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 6, 
            search = '', 
            category = 'All',
            sort = '-createdAt' 
        } = req.query;

        // Build query
        let query = {};

        // Search functionality
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ];
        }

        // Category filter
        if (category !== 'All') {
            query.category = category;
        }

        // Count total documents
        const total = await BlogPost.countDocuments(query);

        // Execute query with pagination
        const posts = await BlogPost.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json({
            success: true,
            data: posts,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalPosts: total,
                postsPerPage: parseInt(limit),
                hasNextPage: (page * limit) < total,
                hasPreviousPage: page > 1
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching blog posts',
            error: error.message
        });
    }
};

// @desc    Get single blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
const getBlogPostBySlug = async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        // Increment view count
        post.views += 1;
        await post.save();

        res.json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching blog post',
            error: error.message
        });
    }
};

// @desc    Get featured blog posts
// @route   GET /api/blog/featured
// @access  Public
const getFeaturedPosts = async (req, res) => {
    try {
        const posts = await BlogPost.find({ featured: true })
            .sort('-createdAt')
            .limit(3);

        res.json({
            success: true,
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching featured posts',
            error: error.message
        });
    }
};

// @desc    Get all unique categories
// @route   GET /api/blog/categories
// @access  Public
const getCategories = async (req, res) => {
    try {
        const categories = await BlogPost.distinct('category');
        
        res.json({
            success: true,
            data: ['All', ...categories]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching categories',
            error: error.message
        });
    }
};

// @desc    Create blog post
// @route   POST /api/admin/blog
// @access  Private
const createBlogPost = async (req, res) => {
    try {
        const post = await BlogPost.create(req.body);

        res.status(201).json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating blog post',
            error: error.message
        });
    }
};

// @desc    Update blog post
// @route   PUT /api/admin/blog/:id
// @access  Private
const updateBlogPost = async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        res.json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating blog post',
            error: error.message
        });
    }
};

// @desc    Delete blog post
// @route   DELETE /api/admin/blog/:id
// @access  Private
const deleteBlogPost = async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        res.json({
            success: true,
            message: 'Blog post deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting blog post',
            error: error.message
        });
    }
};

// @desc    Increment view count
// @route   PATCH /api/admin/blog/:id/views
// @access  Public/Private
const incrementViews = async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        res.json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error incrementing views',
            error: error.message
        });
    }
};

module.exports = {
    getBlogPosts,
    getBlogPostBySlug,
    getFeaturedPosts,
    getCategories,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    incrementViews
};