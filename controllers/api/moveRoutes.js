const router = require('express').Router();
const { Move, Client, Mover } = require('../../models');

// Complete a move instance when mover is selected
router.put('/confirm', async (req, res) => {
  try {
    const clientMoveData = await Move.findOne({
      where: {
        client_id: req.session.client_id,
        status: "Created"
      }
    });
  
    clientMoveData.mover_id = req.body.selcetedMoverID;
    clientMoveData.price_per_hour = req.body.selcetedMoverHourly;
    clientMoveData.status = "Pending";

    await clientMoveData.save()

    res.status(200).json(clientMoveData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/accept', async (req, res) => {
  try {
    const moveData = await Move.findOne({
      where: {
        client_id: req.body.clientID,
        status: "Pending"
      }
    });

    moveData.status = "Confirmed";

    await moveData.save()

    res.status(200).json(moveData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/decline', async (req, res) => {
  try {
    const pendingMoveData = await Move.findOne({
      where: {
        client_id: req.body.clientID,
        status: "Pending"
      }
    });

    pendingMoveData.mover_id = null;
    pendingMoveData.price_per_hour = null;
    pendingMoveData.status = "Created";

    await pendingMoveData.save()
    
    res.status(200).json(pendingMoveData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/cancel', async (req, res) => {
  try {
    const confirmedMoveData = await Move.findOne({
      where: {
        client_id: req.body.clientID,
        status: "Confirmed"
      }
    });

    confirmedMoveData.mover_id = null;
    confirmedMoveData.price_per_hour = null;
    confirmedMoveData.status = "Created";

    await confirmedMoveData.save()
    
    res.status(200).json(confirmedMoveData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/complete', async (req, res) => {
  try {
    const confirmedMoveData = await Move.findOne({
      where: {
        client_id: req.body.clientID,
        status: "Confirmed"
      }
    });

    confirmedMoveData.status = "Completed";

    await confirmedMoveData.save()
    
    res.status(200).json(confirmedMoveData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;