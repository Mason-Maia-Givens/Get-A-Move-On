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

// Render client dashboard
router.get('/clientdash', (req, res) => {
  res.render('clientdash');
});

// Render mover dashboard
router.get('/moverdash', (req, res) => {
  res.render('moverdash');
});


module.exports = router;