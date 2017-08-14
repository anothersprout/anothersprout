import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  name: String,
  team: String,
  description: String,
  age: Number,
  codebase: String // change to object later 
},{
    timestamps: true
  });

const Listing = mongoose.model('Listing', listingSchema);

/* Export the model */
module.exports = Listing;
