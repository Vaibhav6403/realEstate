const { Property } = require('../config/db');

// Add Property
exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create({ ...req.body });
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit Property (only if owner)
exports.editProperty = async (req, res) => {
  try {
    const property = await Property.findOne({ where: { id:req.params.id } }); 
    if (!property ) return res.status(403).json({ error: "Not authorized" });

    await property.update(req.body);
    res.json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Property (only if owner)
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    // if (!property || property.userId !== req.user.id) return res.status(403).json({ error: "Not authorized" });

    await property.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// List Properties with Filters
exports.listProperties = async (req, res) => {
  try {
    const {
      location,
      date, // Currently unused
      type,
      minBedrooms,
      maxPrice,
      orderBy
    } = req.query;

    const filters = { availability: true };

    if (location) filters.pincode = location;
    if (type) filters.type = type;
    if (minBedrooms) filters.numberOfRooms = { [Op.gte]: parseInt(minBedrooms) };
    if (maxPrice) {
      filters.price = filters.price || {};
      filters.price[Op.lte] = parseFloat(maxPrice);
    }

    const order = [];
    if (orderBy === 'price') order.push(['price', 'ASC']);
    if (orderBy === 'bedrooms') order.push(['numberOfRooms', 'DESC']);

    const properties = await Property.findAll({
      where: filters,
      order
    });

    res.json(properties);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getPropertiesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const properties = await Property.findAll({
      where: { userId: parseInt(userId) }
    });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


