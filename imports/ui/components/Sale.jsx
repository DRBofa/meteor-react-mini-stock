import React, { useState, useEffect } from "react";
// Form
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// Icon
import DeleteIcon from "@material-ui/icons/Delete";
import Person from "@material-ui/icons/Group";
import Edit from "@material-ui/icons/Edit";

// Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { func } from "prop-types";

// momentjs
import moment from "moment";
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
let x = 0;
export default () => {
  const classes = useStyles();
  let f = {
    customer: "",
    date: "2019-12-05"
  };
  const [form, setForm] = useState(f);
  const [itemOpts, setItemOpts] = useState([]);
  const [items, setItems] = useState([]);
  let sampleItemForm = {
    doc: "",
    _id: "",
    name: "",
    price: 0,
    qty: 0,
    amount: 0
  };
  const [itemForm, setItemForm] = useState(sampleItemForm);
  const [customers, setCustomers] = useState([]);
  const [labelSubmit, setLabelSubmit] = useState("Buy");
  useEffect(() => {
    x = 0;
    getData();
    console.log("Mounted");
  }, []);
  // item name
  useEffect(() => {
    if (x != 0) {
      setItemForm({
        ...itemForm,
        name: itemForm.doc.name,
        price: itemForm.doc.price,
        qty: 1,
        amount: 1 * itemForm.doc.price
      });
      console.log("work");
    } else {
      x++;
    }
  }, [itemForm.doc]);

  function btnSave() {
    let doc = form;
    doc.date = moment(form.date).toDate();
    doc.items = items;
    // console.log(doc);
    if (labelSubmit == "Buy") {
      Meteor.call("insertSale", doc, (err, result) => {
        if (result) {
          setForm(f);
          console.log("result", result);
        }
      });
    }
    // else {
    //   Meteor.call("updateSale", doc, (err, result) => {
    //     if (result) {
    //       setLabelSubmit("Save");
    //     }
    //   });
    // }
  }
  function getData() {
    Meteor.call("findCustomers", (err, result) => {
      if (result) {
        setCustomers(result);
        setForm(f);
      }
    });
    Meteor.call("findProducts", (err, result) => {
      if (result) {
        setItemOpts(result);
      }
    });
  }
  // items
  function btnAddItem() {
    x = 0;
    let doc = items;
    doc.push({
      itemId: itemForm.doc._id,
      price: parseFloat(itemForm.price),
      qty: parseInt(itemForm.qty)
    });
    setItems(doc);
    setItemForm(sampleItemForm);
    console.log("insert");
  }
  function btnDelete(index) {
    setItemForm(sampleItemForm);
    let arr = items;
    arr.splice(index, 1);
    setItems(arr);
  }
  function getItemName(_id) {
    let obj = itemOpts.find((o, i) => {
      if (o._id === _id) {
        return o;
      }
    });
    return obj.name;
  }
  function getTotal() {
    let total = 0;
    items.forEach(doc => {
      total += doc.price * doc.qty;
    });
    return total;
  }
  return (
    <Container>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Person />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sale {form.date}
        </Typography>
        <form className={classes.form} noValidate>
          {/* Header */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Customer"
                value={form.customer}
                onChange={e =>
                  setForm({
                    ...form,
                    customer: e.target.value
                  })
                }
                variant="outlined"
              >
                {customers.map(customer => (
                  <MenuItem key={customer._id} value={customer._id}>
                    {customer.name.firstName + " " + customer.name.lastName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                fullWidth
                label="Date"
                value={form.date}
                onChange={e =>
                  setForm({
                    ...form,
                    date: e.target.value
                  })
                }
                variant="outlined"
              ></TextField>
            </Grid>
          </Grid>
          {/* End header */}
          <br />
          <Typography component="h1" variant="h5">
            Items
          </Typography>
          <br />
          {/* Items */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                select
                label="Select Item"
                value={itemForm.doc}
                onChange={e =>
                  setItemForm({
                    ...itemForm,
                    doc: e.target.value
                  })
                }
                variant="outlined"
              >
                {itemOpts.map(item => (
                  <MenuItem key={item._id} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Price"
                value={itemForm.price}
                variant="outlined"
                InputProps={{
                  readOnly: true
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Qty"
                value={itemForm.qty}
                onChange={e =>
                  setItemForm({
                    ...itemForm,
                    qty: e.target.value,
                    amount: e.target.value * itemForm.price
                  })
                }
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Amount"
                value={itemForm.amount}
                onChange={e =>
                  setItemForm({
                    ...itemForm,
                    amount: e.target.value
                  })
                }
                variant="outlined"
                InputProps={{
                  readOnly: true
                }}
              ></TextField>
            </Grid>
          </Grid>
          {/* End Items */}
          {/* Button Add Item */}
          <Button
            onClick={btnAddItem}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Item
          </Button>
          {/* ListItem */}
          <Paper hidden={items.length == 0 ? true : false}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((doc, key) => (
                  <TableRow key={key}>
                    <TableCell>{getItemName(doc.itemId)}</TableCell>
                    <TableCell>{doc.price}</TableCell>
                    <TableCell>{doc.qty}</TableCell>
                    <TableCell>{doc.qty * doc.price}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => btnDelete(key)}
                        aria-label="delete"
                        size="small"
                        color="secondary"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan="3">Total</TableCell>
                  <TableCell>{getTotal()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          {/* End ListItem */}
          {/* Button Buy */}
        </form>
        <Button
          onClick={btnSave}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {labelSubmit}
        </Button>
      </div>
    </Container>
  );
};
