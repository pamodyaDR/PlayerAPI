const express = require('express');
const router = express.Router();

//Player Model
const Player = require('../../models/Player');

// @route GET api/players
// @desc Get All Players
// @access Public
router.get('/', (req, res) => {
    Player.find()
        .sort({ date: -1})
        .then(players => res.json(players))
});

// @route POST api/players
// @desc Add a Player
// @access Public
router.post('/', (req,res) => {
    const newPlayer = new Player({
        name        : req.body.name,
        username    : req.body.username,
        password    : req.body.password,
        contactNo   : req.body.contactNo,
        score       : req.body.score
    });
        
    newPlayer.save().then(player => res.json(player));

});

//@route DELETE api/players/:id
//@desc DELETE A Player
//@access Private
router.delete('/:id', async (req, res) => {
    try {
      const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
      if (!deletedPlayer) {
        return res.status(404).send('Player not found');
      }
      res.send(`Player deleted successfully`);
    } catch (error) {
      res.status(500).send(error.message);
    }
});

//@route PUT api/players/:id
//@desc UPDATE A Player
//@access Private
router.put('/:id', (req, res) => {
    Player.findById(req.params.id)
      .then((player) => {
        if (!player) {
          return res.status(404).json({ success: false, message: 'Player not found' });
        }
  
        // Update the player fields
        player.username = req.body.username;
        
  
        player
          .save()
          .then(() => res.json({ success: true, message: 'Player updated successfully' }))
          .catch((err) => res.status(500).json({ success: false, error: err }));
      })
      .catch((err) => res.status(500).json({ success: false, error: err }));
  });


module.exports = router;