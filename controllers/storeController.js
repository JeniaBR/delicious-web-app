const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', {title: 'Add Store'});
};

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores});
};

exports.editStore = async (req, res) => {
  // 1) Find the store give ID
  const store = await Store.findOne({_id: req.params.id});
  // 2) Confirm they are the owner of the store
  // TODO
  // 3) Render out the edit form so the user can update their store
  res.render('editStore', {title: `Edit ${store.name}`, store});
};

exports.updateStore = async (req, res) => {
  // Find and update the store
  const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true}).exec();
  // Redirect them the store and tell them it worked
  req.flash('success',`Successfully updated <strong>${store.name}</strong> <a href="/stores/${store.slug}"> View Store</a>`);
  res.redirect(`/stores/${store._id}/edit`);
};