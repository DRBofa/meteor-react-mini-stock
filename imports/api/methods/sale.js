import Sale from "../collections/sales";
import { Meteor } from "meteor/meteor";
Meteor.methods({
  insertSale(doc) {
    return Sale.insert(doc);
  },
  findSales() {
    return Sale.find().fetch();
  },
  deleteSale(_id) {
    return Sale.remove({ _id: _id });
  },
  updateSale(doc) {
    return Sale.update({ _id: doc._id }, { $set: doc });
  }
});
