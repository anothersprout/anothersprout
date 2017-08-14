// import Model
import Listing from '../models/Listing';

// List All
exports.getAllListings = (req, res) => {
  Listing.find({}, (err, listings) => {
    if (err) throw err;
    res.json(listings);
  })
}

// Create Listing
exports.createListing = (req, res) => {

  const newListing = new Listing({
    name: req.body.name,
    team: req.body.team,
    description: req.body.description,
    age: req.body.age,
    codebase: req.body.codebase
  });

  newListing.save((err) => {
    if (err) throw err;
    res.json(newListing);
  })
}

// Get One Listing
exports.getListing = (req, res) => {

  const id = req.params.id;

  Listing.findById(id, (err, listing) => {
    if (err) throw err;
    res.json(listing);
  })
}

// Delete Listing (not yet available to users)
exports.deleteListing = (req, res) => {

  const id = req.params.id;

  Listing.findByIdAndRemove(id, (err, listing) => {
    if (err) throw err;
    console.log('Listing removed:', listing);
    res.json(listing);
  });
}
