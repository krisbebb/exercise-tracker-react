const router = require('express').Router();
let Set = require('../models/set.model');

router.route('/').get((req, res) => {
  Set.find()
    .then((sets) => res.json(sets))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const activityName = req.body.activityName;
  const reps = req.body.reps;
  const weight = Number(req.body.weight);
  const date = Date.parse(req.body.date);

  const newExercise = new Set({
    activityName,
    reps,
    weight,
    date,
  });

  newExercise.save()
    .then(() => res.json('Set added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Set.findById(req.params.id)
        .then(set => res.json(set))
        .catch((err) => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Set.findByIdAndDelete(req.params.id)
        .then(() => res.json('Set deleted!'))
        .catch((err) => res.status(400).json('Error: ' + err));
})


router.route('/update/:id').post((req, res) => {
    Set.findById(req.params.id)
        .then((set) => {
            set.activityName = req.body.activityName
            set.reps = req.body.reps
            set.weight = Number(req.body.weight)
            set.date = Date.parse(req.body.date)

            set.save()
            .then(() => res.json('Set updated!'))
            .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
})

module.exports = router;
