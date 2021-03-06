const router = require('express').Router();
const { Users, Pets, Likes } = require('../../models');

// get api/users
router.get('/', (req, res) => {
  Users.findAll({
    attributes: { exclude: ['passwordHash'] }
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})

// get specific user api/users/id
router.get('/:userId', (req, res) => {
  Users.findOne({
    attributes: { exclude: ['passwordHash'] },
    where: {
      userId: req.params.userId
    },
    include: [
      {
        model: Pets,
        attributes: ['petname', 'age', 'sex', 'type', 'breed', 'description', 'imgurl'],
        through: Likes,
        as: 'liked_pets'
      }
    ]
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user with this id found' })
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})

// POST api/users (sign up)
router.post('/', (req, res) => {
    Users.create({
        username: req.body.username,
        email: req.body.email,
        passwordHash: req.body.passwordHash
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.userId = dbUserData.userId;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// post api/users/login
router.post('/login', (req, res) => {
    Users.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
      // // validate the password during login
      const validPassword = dbUserData.checkPassword(req.body.passwordHash);
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect Password!' });
        return;
      }

      req.session.save(() => {
        // declare session variables
        req.session.userId = dbUserData.userId;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
       console.log('logged In');
       console.log(req.session)
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  });

  // log the user out
  router.post('/logout', (req, res) => {
      if (req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
          console.log('logged out.');
        });
    } else {
        res.status(404).end();
    }
  })

  module.exports = router;