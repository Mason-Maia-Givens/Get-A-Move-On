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

router.get('/signup', (req, res) => {
  try {
    res.render('signupinfo');
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