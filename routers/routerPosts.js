// Importo exxpress
const express = require('express');
const router = express.Router();

//importo le funzioni dal controller 
const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    partialUpdatePost,
    deletePost,
} = require('../controllers/postsController.js')


// Uso le funzioni dal controller direttamente nelle rotte

// GET /posts
router.get("/", getAllPosts);

// GET /posts/:id
router.get("/:id", getPostById);

// POST /posts
router.post("/", createPost);

// PUT /posts/:id
router.put("/:id", updatePost);

// PATCH /posts/:id
router.patch("/:id", partialUpdatePost);

// DELETE /posts/:id
router.delete("/:id", deletePost);

//esporto router 
module.exports = router;