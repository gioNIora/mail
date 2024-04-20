const User = require('../models/User');

exports.getUserStatus = (req, res) => {
  if (req.session.user) {
    res.json({ email: req.session.user.email, _id: req.session.user._id });
  } else {
    res.status(401).json({ message: 'User not logged in' });
  }
};

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    req.session.user = {
      _id: newUser._id,
      email: newUser.email
    };

    res.status(201).json({ email: newUser.email, _id: newUser._id });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.session.user = {
      _id: user._id,
      email: user.email
    };

    res.json({ email: user.email, _id: user._id });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy();
  res.json({ message: 'User logged out successfully' });
};
