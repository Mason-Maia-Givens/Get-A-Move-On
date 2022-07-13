const router = require('express').Router();
const { Move } = require('../../models');

// Create a new move
router.post('/', async (req, res) => {
  try {
    const newMove = await Move.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.status(200).json(newMove);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Cancel an existing active move
router.delete('/:id', async (req, res) => {
  try {
    const moveData = await Move.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
        // mover_id: 
      },
    });

    if (!moveData) {
      res.status(404).json({ message: 'Your move could not be found!' });
      return;
    }

    res.status(200).json(moveData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;