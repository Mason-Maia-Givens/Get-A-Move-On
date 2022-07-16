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
router.get('/dashboard', (req, res) => {
  try {
    res.render('mover-dash');
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;