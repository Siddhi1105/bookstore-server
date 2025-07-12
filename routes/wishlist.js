const router = require('express').Router();
const User = require('../models/User');

router.post('/:productId', async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.wishlist.includes(req.params.productId)) {
    user.wishlist.push(req.params.productId);
    await user.save();
  }
  res.json(user.wishlist);
});

router.get('/', async (req, res) => {
  const user = await User.findById(req.user.id).populate('wishlist');
  res.json(user.wishlist);
});

router.delete('/:productId', async (req, res) => {
  const user = await User.findById(req.user.id);
  user.wishlist = user.wishlist.filter(pid => pid.toString() !== req.params.productId);
  await user.save();
  res.json(user.wishlist);
});

module.exports = router;
