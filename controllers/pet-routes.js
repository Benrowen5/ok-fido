const router = require('express').Router();
const { Pets } = require('../models');

// get all of the pets
router.get('/', (req, res) => {
    console.log(req.session);
    Pets.findAll({
        attributes: ['petname', 'age', 'sex', 'type', 'breed', 'description']
    })
    .then(dbPetData => {
        const pets = dbPetData.map(pets => pets.get({ plain: true }));
        res.render('pets', { pets, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// // show one pet
// router.get('/:petId', (req, res) => {
//     Pets.findOne({
//         where: {
//             petId: req.body.petId
//         },
//         attributes: ['petname', 'age', 'sex', 'type', 'breed', 'description']
//     })
//     .then(dbPetData => {
//         if (!dbPetData) {
//             res.status(404).json({ message: 'No pet found with this id :(' });
//             return;
//         }
//         const pet = dbPetData.get({ plain: true });
//         res.render('single-pet', { pet, loggedIn: req.session.loggedIn })
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// })

// get all pets based on type
router.get('/:type', (req, res) => {
    Pets.findAll({
        attributes: ['petname', 'age', 'sex', 'type', 'breed', 'description'],
        where: {
            type: req.params.type
        }
    })
    .then(dbPetData => {
        if (!dbPetData) {
            res.status(404).json({ message: `No ${type}'s found`})
            return;
        }

        const pets = dbPetData.map(post => post.get({plain: true}));
        res.render('pets', { 
            pets, 
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;