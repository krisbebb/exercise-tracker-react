const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const activity = req.body.activity;
  const reps = req.body.reps;
  const weight = Number(req.body.weight);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    activity,
    reps,
    weight,
    date,
  });

  newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch((err) => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted!'))
        .catch((err) => res.status(400).json('Error: ' + err));
})


router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then((exercise) => {
            exercise.activity = req.body.activity
            exercise.reps = req.body.reps
            exercise.weight = Number(req.body.weight)
            exercise.date = Date.parse(req.body.date)

            exercise.save()
            .then(() => res.json('Exercise updated!'))
            .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
})

module.exports = router;
