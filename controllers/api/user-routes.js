const router = require('express').Router();
const { User, Post } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    User.findAll({})
    .then(userData => res.json(userData))
    .catch(err => res.status(500).json(err));
});

// GET single user
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with that id' });
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// POST create user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(userData => res.json(userData))
    .catch(err => res.status(500).json(err));
});

// USER LOGIN ROUTE
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(400).json({ message: 'No user found with that email address' });
            return;
        }

        const isPassword = userData.validatePassword(req.body.password);
        if (!isPassword) {
            res.status(400).json({ message: 'Password is incorrect' });
            return;
        }

        res.json({ user: userData, message: 'You are now logged in!' });
    });
});

// PUT update user by id
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData[0]) {
            res.status(404).json({ message: 'No user found with this id '});
            return;
        }
        res.json(userData);
    })
    .catch(err => res.status(500).json(err));
});

// DELETE single user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;