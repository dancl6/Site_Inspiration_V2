const router = require('express').Router();
const { Reason } = require('../../models');
const passport = require('../../utils/passport');
const isAuth = require('../../utils/middleware/isAuth');

// GET all reasons
router.get('/', (req, res) => {
    Reason.findAll({
    })
    .then(reasonData => res.json(reasonData))
    .catch(err => res.status(500).json(err));
});

//POST new reason
router.post('/', (req, res) => {
    Reason.create({
        reason_tag:  req.body.reason_tag,
       })
    .then(reasonData => res.json(reasonData))
    .catch(err => res.status(500).json(err));
});

//PUT update reason
router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Reason.update(req.body, {
      where: {
        id: req.params.id,
      }
    }).then(reasonData => {
      res.json(reasonData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })

  
  });

//DELETE reason
router.delete('/:id', (req, res) => {
    Reason.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(reasonData => {
        if (!reasonData) {
            res.status(400).json({ message: 'No category found with this id' })
            return
        }
        res.json(reasonData)
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router