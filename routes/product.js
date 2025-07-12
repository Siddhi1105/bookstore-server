const router = require('express').Router();
const Product = require('../models/Product');

// router.get('/', async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });


router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    // console.log("📦 Products from DB:", products); // Debug log
    res.json(products);
  } catch (err) {
    // console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: 'Error fetching products' });
  }
});



router.post('/', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

router.put('/:id', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
