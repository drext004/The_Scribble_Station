// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // loads .env file

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB connection
mongoose.connect('mongodb+srv://atharvdhari217:ahh5dAop46r5vzUf@cluster0.kynz816.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Post Schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

// Routes

// GET all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET single post
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) res.json(post);
    else res.status(404).json({ error: 'Post not found' });
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving post' });
  }
});

// POST new post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, body, author } = req.body;
    const newPost = new Post({ title, content: body, author });
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create post' });
  }
});

// PUT update post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updated) res.json(updated);
    else res.status(404).json({ error: 'Post not found' });
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
});

// DELETE post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (deleted) res.status(204).end();
    else res.status(404).json({ error: 'Post not found' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// Start server
app.listen(PORT, () => {

});