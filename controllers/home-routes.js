const router = require('express').Router();
const { Pets, Users } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    });
});

// render the login template if the user is not already logged in
router.get('/login', (req, res) => {
    if (req.session.userId) {
        console.log('You are already logged in');
        res.redirect('/');
        return;
    } else {
        res.render('login', {
            loggedIn: req.session.loggedIn
        });
    }
});

router.get('/signup', (req, res) => {
    if (req.session.userId) {
        console.log('You are already logged in');
        res.redirect('/');
        return;
    } else {
        res.render('signup', {
            loggedIn: req.session.loggedIn
        });
    }
});

router.get('/about', (req, res) => {
    res.render('about', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/services', (req, res) => {
    res.render('services', {
        loggedIn: req.session.loggedIn
    });
});

module.exports = router;