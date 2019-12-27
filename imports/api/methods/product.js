import Product from "../collections/products";
import { Meteor } from "meteor/meteor";
Meteor.methods({
  insertProduct(doc) {
    return Product.insert(doc);
  },
  findProducts() {
    return Product.find().fetch();
  },
  updateProduct(doc) {
    return Product.update({ _id: doc._id }, { $set: doc });
  },
  deleteProduct(_id) {
    return Product.remove({ _id: _id });
  }
});
