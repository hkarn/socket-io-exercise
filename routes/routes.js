const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', {title: "It's Alive!"});
});

module.exports = router;
