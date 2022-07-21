const router = require('express').Router();
const { Client, Mover, Move } = require('../../models');
const { uploadFile } = require('../../imageupload');

router.post('/signupclient', async (req, res) => {
  try {
    // if (req.file) { 
    //   const result = await uploadFile(req.file);
    //   console.log(result);
    //   req.body.profile_picture = result.Location;
    //   console.log(req.body)
    // };

    // const userData = await User.create(req.body);
    
    const clientData = await Client.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      current_address: req.body.full_address
    });
    
    const firstMove = await Move.create({
      client_id: clientData.dataValues.id,
      mover_id: null,
      move_date: req.body.moving_date,
      price_per_hour: null,
      items: req.body.items,
      start_address: req.body.full_address,
      end_address: req.body.moving_street,
      status: "Created"
    });

    req.session.save(() => {
      req.session.client_id = clientData.dataValues.id;
      req.session.logged_in = true;

      res.status(200).json(clientData);
    });

      // client_id: req.session.client_id,
      // mover_id: 1,
      // move_date: "2022-10-01",
      // price_per_hour: 10.00,
      // big_items: 5,
      // small_items: 15,
      // stairs_elevator: "elevator",
      // start_address: "Another Fake Address",
      // end_address: "Still a Fake Address"

  } catch (err) {
    // Make this more descriptive when everything has come together
    res.status(400).json(err);
  }
});

router.post('/signupmover', async (req, res) => {
  try {
    const moverData = await Mover.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
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
    // Make this more descriptive when everything has come together
    res.status(400).json(err);
  }
});

// router.post('/image', withAuth, async (req, res) => {
//   console.log(`POST USER "/image" ROUTE SLAPPED`);
//   console.log(req.file);

//   const result = await uploadFile(req.file);
//   console.log(result);
//   console.log(result.Location);
//   const newProfilePhoto = result.Location;

//   await User.update(
//     {
//       profile_picture: newProfilePhoto
//     },
//     {
//       where: {
//         id: req.session.user_id
//       },
//     });

//     res.redirect('/user');
    
// })

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