const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// get homepage
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'post_text', 'created_at'],
        include: {
            model: User,
            attributes: ['username']
        }
    }).then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts });
    }).catch(err => res.status(500).json(err));
});

// get single post page
router.get('/post/:id', (req, res) => {
    const singlePost = {
        id: 1,
        title: 'Handlebar docs',
        post_text: 'This is some text for my post',
        created_at: new Date(),
        comments: [{}, {}],
        user: {
            username: 'test_user'
        }
    };
    res.render('single-post', { singlePost });


})

// get login page
router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;