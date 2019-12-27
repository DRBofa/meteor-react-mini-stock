import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.startup(() => {
  import "../imports/api/methods/user";
  import "../imports/api/methods/customer";
  import "../imports/api/methods/product";
  import "../imports/api/methods/sale";
  import "../imports/api/methods/report";
  if (Meteor.users.find().fetch().length < 1) {
    Accounts.createUser({
      username: "admin",
      email: "admin@gmail.com",
      password: "admin",
      roles: ["admin"]
    });
  }
});
