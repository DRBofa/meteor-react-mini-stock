import Customer from "../collections/customers";
import { Meteor } from "meteor/meteor";
Meteor.methods({
  insertCustomer(doc) {
    return Customer.insert(doc);
  },
  findCustomers() {
    return Customer.find().fetch();
  },
  deleteCustomer(_id) {
    return Customer.remove({ _id: _id });
  },
  updateCustomer(doc) {
    return Customer.update({ _id: doc._id }, { $set: doc });
  }
});
