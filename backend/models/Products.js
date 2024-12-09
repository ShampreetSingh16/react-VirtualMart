const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Structure for the product model
ProductsSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  colors: [
    {
      color: {
        type: String,
        required: true
      },
      stock: {
        type: Number,
        required: true,
        min: 0
      },
      colorCode: {
        type: String,
        required: true,
      }  
    }
  ]
});

module.exports = mongoose.model('Products' , ProductsSchema);