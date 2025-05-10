const { Booking, Property, User } = require('../config/db');

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { propertyId, startDate, endDate, paymentMethod, userId } = req.body;

    const property = await Property.findByPk(propertyId);
    if (!property) return res.status(404).json({ error: 'Property not found' });

    // Calculate total days and cost
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (diffInDays <= 0) return res.status(400).json({ error: 'Invalid rental period' });

    const totalCost = diffInDays * property.price;

    const booking = await Booking.create({
      userId,
      propertyId,
      startDate,
      endDate,
      paymentMethod,
      totalCost
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Bookings by User (Renter)
exports.getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.params.userId },
      include: [{ model: Property }]
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Bookings by Agent (Agent's Properties)
exports.getBookingsByAgent = async (req, res) => {
  try {
    const agentId = req.params.agentId;

    const properties = await Property.findAll({ where: { userId: agentId } });
    const propertyIds = properties.map(p => p.id);

    const bookings = await Booking.findAll({
      where: { propertyId: propertyIds },
      include: [{ model: Property }, { model: User }]
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    booking.isCanceled = true;
    await booking.save();

    // Optionally: refund logic here
    res.json({ message: 'Booking canceled and refunded (if applicable)' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
