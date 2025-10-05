const Post = require('../models/postModel');

// @desc    Get all published posts
// @route   GET /api/posts
// @access  Public
const getPublishedPosts = async (req, res) => {
    try {
        const posts = await Post.find({ status: 'published' }).sort({ publishedAt: -1 }).populate('author', 'fullName');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get a single post by its slug
// @route   GET /api/posts/:slug
// @access  Public
const getPostBySlug = async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug, status: 'published' }).populate('author', 'fullName');
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// --- ADMIN CONTROLLERS ---

// @desc    Get all posts (published and drafts)
// @route   GET /api/posts/all
// @access  Private/Admin
const getAllPostsAdmin = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 }).populate('author', 'fullName');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = async (req, res) => {
    try {
        const { title, slug, contentBody, coverImageUrl, status } = req.body;
        
        const postExists = await Post.findOne({ slug });
        if (postExists) {
            return res.status(400).json({ message: 'Slug already exists. Please use a unique slug.' });
        }

        const post = new Post({
            title,
            slug,
            contentBody,
            coverImageUrl,
            status,
            author: req.user._id, // Get the logged-in user's ID from the 'protect' middleware
            publishedAt: status === 'published' ? new Date() : null,
        });

        const createdPost = await post.save();
        res.status(201).json(createdPost);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create post', error: error.message });
    }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = async (req, res) => {
    try {
        const { title, slug, contentBody, coverImageUrl, status } = req.body;
        const post = await Post.findById(req.params.id);

        if (post) {
            post.title = title || post.title;
            post.slug = slug || post.slug;
            post.contentBody = contentBody || post.contentBody;
            post.coverImageUrl = coverImageUrl || post.coverImageUrl;
            
            // Handle publishing logic
            if (status && post.status !== 'published' && status === 'published') {
                post.publishedAt = new Date();
            }
            post.status = status || post.status;

            const updatedPost = await post.save();
            res.json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Failed to update post', error: error.message });
    }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            await post.deleteOne();
            res.json({ message: 'Post removed' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// @desc    Get a single post by ID (for admin)
// @route   GET /api/posts/admin/:id
// @access  Private/Admin
const getPostByIdAdmin = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = {
    getPublishedPosts,
    getPostBySlug,
    getAllPostsAdmin,
    getPostByIdAdmin,
    createPost,
    updatePost,
    deletePost,
};