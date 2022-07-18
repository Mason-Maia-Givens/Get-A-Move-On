const router = require('express').Router();
const { Client, Mover } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const clientData = await Client.create(req.body);

    req.session.save(() => {
      req.session.id = clientData.id;
      req.session.logged_in = true;

      res.status(200).json(clientData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    
    const clientData = await Client.findOne({ where: { email: req.body.email } });

    if (!clientData) {

      const moverData = await Mover.findOne({ where: { email: req.body.email } });

      if (!moverData) {
        res
          .status(400)
          .json({ message: 'Invalid email or password!' });
        return;
      }

      const validPassword = moverData.checkPassword(req.body.password);

      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Invalid email or password!' });
        return;
      }

      req.session.save(() => {
        req.session.mover_id = moverData.dataValues.id;
        req.session.logged_in = true;
        
        res.json({ message: 'You are now logged in!' });
      });
  
    } else {
  
      const validPassword = clientData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Invalid email or password!' });
        return;
      }
  
      req.session.save(() => {
        req.session.client_id = clientData.dataValues.id;
        req.session.logged_in = true;
        
        res.json({ message: 'You are now logged in!' });
      });
    }

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;