const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const wishlistRoutes = require('./routes/wishlist');
const authMiddleware = require('./middleware/auth');

dotenv.config();
const app = express();
app.use(cors({
  origin: 'https://your-netlify-app.netlify.app', // frontend URL
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

app.use('/auth', authRoutes);
app.use('/products', authMiddleware, productRoutes);
app.use('/wishlist', authMiddleware, wishlistRoutes);

mongoose.connection.on('connected', () => {
  console.log(`✅ MongoDB connected to DB: ${mongoose.connection.name}`);
});


const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
