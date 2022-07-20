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

// Render dashboard
router.get('/dashboard', async (req, res) => {
  try {
    if (req.session.client_id) {

      // CLIENT DASH
      // Client info based on session
      const clientData = await Client.findOne({ where: { id: req.session.client_id } });

      // Get client move data
      const moveData = await Move.findOne({
        where: { client_id: req.session.client_id }
      });

      // See all available Movers
      const moverData = await Mover.findAll( {
        attributes: { exclude: ['email', 'password', 'current_address'] }
      });

      // Prepare data for rendering
      const currClient = clientData.dataValues;
      const moveStatus = moveData.dataValues;
      const allMovers = moverData.map((mover) => mover.get({ plain: true }));

      // Render Client template with readied data
      if (moveStatus.status === "Created") {
        res.render('clientdash', {
          currClient,
          moveStatus,
          allMovers,
        });
      } else {
        // Find confirmed Move
        const confirmedMoveData = await Move.findOne({ 
          where: { client_id: req.session.client_id },
          attributes: { exclude: ['id', 'client_id', 'price_per_hour', 'big_items', 'small_items', 'stairs_elevator'] },
          include: [{ model: Mover }]
        });

        const confirmedClientMove = confirmedMoveData.dataValues;
        const moverMove = confirmedMoveData.mover.dataValues;

        res.render('clientdash', {
          currClient,
          confirmedClientMove,
          moverMove,
        });
      }
    }
    else if (req.session.mover_id) {
      //MOVER DASH
      // Find all confirmed Moves
      const confirmedMoveData = await Move.findAll({ 
        where: { 
          mover_id: req.session.mover_id,
          status: "Confirmed"
        },
        attributes: { exclude: ['id', 'mover_id', 'price_per_hour'] },
        include: [{ model: Client}]
      });

      // Find all pending Moves
      const pendingMoveData = await Move.findAll({
        where: { 
          mover_id: req.session.mover_id,
          status: "Pending"
        },
        attributes: { exclude: ['id', 'mover_id', 'price_per_hour'] },
        include: [{ model: Client}]
      })

      // Find all completed Moves
      const completedMoveData = await Move.findAll({
        where: { 
          mover_id: req.session.mover_id,
          status: "Completed"
        },
        attributes: { exclude: ['id', 'mover_id', 'price_per_hour'] },
        include: [{ model: Client}]
      })

      // Prepare data for rendering
      const confirmedMoves = confirmedMoveData.map((move) => move.get({ plain: true }));
      const pendingMoves = pendingMoveData.map((move) => move.get({ plain: true }));
      const completedMoves = completedMoveData.map((move) => move.get({ plain: true }));
      
      // Render Mover template with readied data
      res.render('moverdash', {
        confirmedMoves,
        pendingMoves,
        completedMoves
      });
    }
    else {
      // If session has not stored your id, you haven't logged in
      res.redirect('/login');
    }

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;