const router = require('express').Router();
const { Comment } = require('../../models');

// GET all comments
router.get('/', (req, res) => {
    Comment.findAll()
    .then(commentData => res.json(commentData))
    .catch(err => res.status(500).json(err));
});

// POST create a comment 
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(commentData => res.json(commentData))
    .catch(err => res.status(400).json(err));
});

module.exports = router;