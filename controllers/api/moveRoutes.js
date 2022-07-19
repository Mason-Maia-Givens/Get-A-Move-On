const router = require('express').Router();
const { Move, Client } = require('../../models');

// Create a new move
router.post('/confirm', async (req, res) => {
  try {
    const clientData = await Client.findOne({ where: {id: req.session.client_id} })

    console.log(clientData.dataValues);

    // const newMove = await Move.create({
      
    //   client_id: req.session.client_id,
    //   mover_id: 1,
    //   move_date: "2022-10-01",
    //   price_per_hour: 10.00,
    //   big_items: 5,
    //   small_items: 15,
    //   stairs_elevator: "elevator",
    //   start_address: "Another Fake Address",
    //   end_address: "Still a Fake Address"
    // });

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