require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const Products = require('./models/Products');
const User = require('../backend/models/User');
const Order = require('../backend/models/Order');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { sendRegistrationEmail } = require('./registerEmail');

//Middleware for enabling CORS, allowing credentials, and specifying frontend origin
app.use(cors({
  origin: "https://virtualmartclient.onrender.com",
  methods : ["POST","GET"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

//Load environment variables
const port = process.env.PORT || 8000;
const Db = process.env.DATABASE;
const secretKey = process.env.SECRET_KEY
const expires = process.env.EXPIRATION_TIME

//Middleware to verify JWT token in cookies for authentication
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.user = null;
    return next();
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      req.user = null;
      return next();
    }
    req.user = user;
    next();
  });
};

//api to check authentication status
app.get('/authenticate', authenticateToken, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ isAuthenticated: false });
  }
  res.status(200).json({ isAuthenticated: true, username: req.user.username, userID: req.user.id });
});

//api to logout user and clears the authentication token cookie
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful!' });
});

//api to register user and send a welcome email
app.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const newUser = new User({ firstname, lastname, email, password });
    await newUser.save();
    try {
      //Send registration email
      const username = `${firstname} ${lastname}`; 
      await sendRegistrationEmail(email, username);
      res.status(201).json({ message: "User registered successfully, email sent!" });
    } catch (error) {
      res.status(500).json({ message: "User registered, but failed to send email.", error: error.message });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "This email is already registered. Please use a different email." });
    }
    res.status(400).json({ message: "Unable to register", error: error.message });
  }
});

//api to login and verify user credentials and sets JWT in HTTP only cookie
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id, username: user.firstname }, secretKey, { expiresIn: `${expires}m` });

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + expires * 60 * 1000),
      sameSite:'None',
      secure:true
    });
    
    res.json({ message: 'Login successful!', username: user.firstname, id: user._id });

  } catch (error) {
    console.log('Error during login', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//api to get products data
app.get('/products', async (req, res) => {
  const { isPopular } = req.query;
  try {
    let response;
    if (isPopular) {
      response = await Products.find({ isPopular: true });
    } else {
      response = await Products.find();
    }
    return res.json(response);
  } catch (err) {
    console.error("Error fetching products", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//api to get a specific product by ID
app.get('/products/:id', async (req, res) => {

  const productId = parseInt(req.params.id);

  if (isNaN(productId)) {
    return res.status(400).send({ error: 'Invalid ID' });
  }

  try {
    const product = await Products.findOne({ id: productId });
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

//api to get Stripe publishable key for client configuration
app.get('/config', async (req, res) => {
  try {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    res.send({
      key: publishableKey,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

//api to create a payment intent for Stripe
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'cad',
      automatic_payment_methods: { enabled: true },

    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

//api to save an order after a successful payment
app.post('/orders', async (req, res) => {
  const { paymentIntentId, items, userID } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const chargeID = paymentIntent.latest_charge;
    const charge = await stripe.charges.retrieve(chargeID);
    const billingDetails = charge.billing_details;
    const paymentMethod = charge.payment_method_details;

    const newOrder = new Order({
      userID: userID,
      amount: paymentIntent.amount_received / 100,
      items: items,
      shippingDetails: paymentIntent.shipping,
      billingDetails: billingDetails,
      paymentMethod: paymentMethod,
      paymentIntentId: paymentIntent.id,
      paymentStatus: paymentIntent.status,
    });

    await newOrder.save();
    res.status(201).send({ message: "Order saved successfully" });

  } catch (error) {
    console.error("Error retrieving payment intent or saving order:", error);
    res.status(500).send({ error: "Failed to save order" });
  }
});


//404 error route for undefined routes
app.get('*', (req, res) => {
  return res.status(404).json({
    status: "error",
    message: "Not Found",
  });
});

//Connect to MongoDB and start the server
mongoose.connect(Db)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connection Established with server at ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize server", error);
  });
