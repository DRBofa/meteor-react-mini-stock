import Sale from "../collections/sales";
import { Meteor } from "meteor/meteor";
import moment from "moment";
Meteor.methods({
  saleReport() {
    return Sale.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customerDoc"
        }
      },
      {
        $unwind: "$customerDoc"
      },
      {
        $unwind: "$items"
      },
      {
        $lookup: {
          from: "products",
          localField: "items.itemId",
          foreignField: "_id",
          as: "itemDoc"
        }
      },
      {
        $unwind: "$itemDoc"
      },
      {
        $group: {
          _id: "$_id",
          date: {
            $last: "$date"
          },
          customerId: {
            $last: "$customer"
          },
          customerName: {
            $last: "$customerDoc.name"
          },
          items: {
            $addToSet: {
              itemId: "$items.itemId",
              itemName: "$itemDoc.name",
              qty: "$items.qty",
              price: "$items.price"
            }
          }
        }
      }
    ]);
  },
  saleReportByDate(selector) {
    console.log(selector);
    return Sale.aggregate([
      {
        $match: {
          date: {
            $gte: moment(selector.fromDate).toDate(),
            $lte: moment(selector.toDate).toDate()
          }
        }
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customerDoc"
        }
      },
      {
        $unwind: "$customerDoc"
      },
      {
        $unwind: "$items"
      },
      {
        $lookup: {
          from: "products",
          localField: "items.itemId",
          foreignField: "_id",
          as: "itemDoc"
        }
      },
      {
        $unwind: "$itemDoc"
      },
      {
        $group: {
          _id: "$_id",
          date: {
            $last: "$date"
          },
          customerId: {
            $last: "$customer"
          },
          customerName: {
            $last: "$customerDoc.name"
          },
          items: {
            $addToSet: {
              itemId: "$items.itemId",
              itemName: "$itemDoc.name",
              qty: "$items.qty",
              price: "$items.price"
            }
          }
        }
      }
    ]);
  }
});
