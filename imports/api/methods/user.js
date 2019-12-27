import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
Meteor.methods({
  insertUser(doc) {
    console.log(doc);
    let account = Accounts.createUser({
      username: doc.userName,
      email: doc.email,
      password: doc.password,
      roles: ["admin"]
    });
    return account;
  },
  findUsers() {
    return Meteor.users.find().fetch();
  }
});
