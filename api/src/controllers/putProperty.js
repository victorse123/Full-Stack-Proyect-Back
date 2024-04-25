const { Property } = require('../db');

const putProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Actualizamos el estado de isActive a false
    property.isActive = false;
    await property.save();

    return res.status(200).json({ message: 'Property updated successfully', property });
  } catch (error) {
    console.error('Error updating property:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = putProperty;