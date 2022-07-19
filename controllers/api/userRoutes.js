const router = require('express').Router();
const { Client, Mover } = require('../../models');

router.post('/signupclient', async (req, res) => {
  try {
    const clientData = await Client.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.placeholderPass,
      gender: req.body.placholderGender,
      current_address: req.body.full_address
    });
    
    req.session.save(() => {
      req.session.client_id = clientData.dataValues.id;
      req.session.logged_in = true;

      res.status(200).json(clientData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/signupmover', async (req, res) => {
  try {
    const moverData = await Mover.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.placeholderPass,
      gender: req.body.placholderGender,
      current_address: req.body.full_address,
      price_per_hour: req.body.hourly_rate,
      vehicle_model: req.body.vehicle_model,
      drivers_license: req.body.drivers_license,
      size_of_crew: req.body.placeholderCrew

    });
    
    req.session.save(() => {
      req.session.mover_id = moverData.dataValues.id;
      req.session.logged_in = true;

      res.status(200).json(moverData);
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