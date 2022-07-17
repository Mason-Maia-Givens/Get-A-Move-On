const session = require('express-session');
const { Client, Mover, Move } = require('../models');

const router = require('express').Router();

// Render homepage
router.get('/', (req, res) => {
  try {
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signupclient', (req, res) => {
  try {
    res.render('signupinfoclient');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signupmover', (req, res) => {
  try {
    res.render('signupinfomover');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render client dashboard
// router.get('/clientdash', (req, res) => {
//   res.render('clientdash');
// });

// Render mover dashboard
router.get('/dashboard', async (req, res) => {
  try {
    if (req.session.client_id) {
      // CLIENT DASH
      const moverData = await Mover.findAll();
      const clientData = await Client.findOne({ where: { id: req.session.client_id } });
      
      console.log(clientData.dataValues);
      const realClient = clientData.dataValues;

      const allMovers = moverData.map((mover) => mover.get({ plain: true }))
      res.render('clientdash', {
        allMovers,
        realClient
      });
    }
    else if (req.session.mover_id) {
      //MOVER DASH
      res.render('moverdash');
    }
    else {
      res.redirect('/login');
    }

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;