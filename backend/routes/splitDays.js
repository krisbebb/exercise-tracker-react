const router = require('express').Router();
let SplitDay = require('../models/splitDay.model');

router.route('/').get((req, res) => {
  SplitDay.find()
    .then((splitDays) => res.json(splitDays))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const splitDay = req.body.splitDay;
  const activities = req.body.activities;
  const newSplitDay = new SplitDay({
    splitDay,
    activities,
  });
  newSplitDay.save((err, splitDay) => {
    if (err) {
      res.json('Error: ' + err)
    }
    return res.json(splitDay)
  })
    // .then(() => res.json('SplitDay added!'))
    // .catch((err) => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
    SplitDay.findById(req.params.id)
        .then(splitDay => res.json(splitDay))
        .catch((err) => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    SplitDay.findByIdAndDelete(req.params.id)
        .then(() => res.json('SplitDay deleted!'))
        .catch((err) => res.status(400).json('Error: ' + err));
})


router.route('/update/:id').post((req, res) => {
    SplitDay.findById(req.params.id)
        .then((splitDay) => {
            splitDay.activities = req.body.activities
            // splitDay.splitDay = req.body.splitDay
           
            splitDay.save()
            .then(() => res.json('SplitDay updated!'))
            .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
})

module.exports = router;
