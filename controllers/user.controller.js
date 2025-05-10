const { User } = require('../config/db'); // Ensure you import User correctly from the db.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {  Address, RentalPreferences, AgentDetails, CreditCard } = require('../config/db'); // Import necessary models

exports.registerUser = async (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, password, role, address, preferences, agentDetails, creditCard } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstname,
      lastname,
      email,
      passwordHash,
      role
    });

    // If the user is a buyer, add their address and preferences
    if (role === 'prospective_renter') {
      if (address) {
        // Add address for the user
        await Address.create({
          street: address.street,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
          userId: user.id
        });
      }

      if (preferences) {
        // Add rental preferences for the user
        await RentalPreferences.create({
          desiredMoveInDate: preferences.desiredMoveInDate,  // Ensure to send date in req.body
          preferredLocation: preferences.preferredLocation,  // Ensure this is in the payload
          budget: preferences.budget,
          userId: user.id
        });
      }
      if (creditCard) {
        await CreditCard.create({
          cardNumber: creditCard.cardNumber,
          expirationDate: creditCard.expirationDate,
          userId: user.id
        });
      }
    }

    // If the user is an agent, add agent details
    if (role === 'agent') {
      if (agentDetails) {
        // Add agent details for the user
        await AgentDetails.create({
          jobTitle: agentDetails.jobTitle,
          agencyName: agentDetails.agencyName,
          contactInfo: agentDetails.contactInfo,
          userId: user.id
        });
      }
      if (address) {
        // Add address for the user
        await Address.create({
          street: address.street,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
          userId: user.id
        });
      }
    }

    return res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
console.log(email + password);
  try {
    // Find user by email, including associated models based on the user's role
    const user = await User.findOne({
      where: { email },
      include: [
        { model: Address, attributes: { exclude: ['userId'] } },
        { model: RentalPreferences, attributes: { exclude: ['userId'] } },
        { model: CreditCard, attributes: { exclude: ['userId'] } },
        { model: AgentDetails, attributes: { exclude: ['userId'] } }
      ],
      logging: console.log
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Prepare the user response object
    const userResponse = {
      id: user.id,
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
      role: user.role,
    };

    
    if (user.role === 'prospective_renter') {
      userResponse.address = user.Addresses.length > 0 ? user.Addresses : null;
      userResponse.creditCard = user.CreditCards.length > 0 ? user.CreditCards : null;
      const rentalPreferences = await RentalPreferences.findAll({
        where: { userId: user.id }
      });
      console.log(rentalPreferences)
      userResponse.preferences = {
        desiredMoveInDate: rentalPreferences[0].desiredMoveInDate,
        preferredLocation: rentalPreferences[0].preferredLocation,
        budget: rentalPreferences[0].budget
      } ;
    } else if (user.role === 'agent') {
      userResponse.agentDetails = user.AgentDetails || null;
      userResponse.address = user.Addresses.length > 0 ? user.Addresses : null;
    }

    res.json({
      token,
      user: userResponse
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.editUser = async (req, res) => {
  const { userId } = req.params; // Get the userId from the URL params
  const { firstname, lastname, password, role } = req.body; // Get other fields from the request body

  try {
    // Find the user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is trying to update the email (which is not allowed)
    if (req.body.email) {
      return res.status(400).json({ message: 'Email cannot be edited' });
    }

    // Update the user's details
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (password) {
      // If password is provided, hash the new password and update it
      const passwordHash = await bcrypt.hash(password, 10);
      user.passwordHash = passwordHash;
    }
    if (role) user.role = role;

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'User updated successfully', userId: user.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
