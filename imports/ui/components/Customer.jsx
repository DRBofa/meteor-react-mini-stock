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

export default () => {
  const classes = useStyles();
  let f = {
    name: {
      firstName: "",
      lastName: ""
    },
    email: "",
    phone: ""
  };
  const [form, setForm] = useState(f);
  const [items, setItem] = useState([]);
  const [labelSubmit, setLabelSubmit] = useState("Save");
  useEffect(() => {
    getData();
    console.log("Mounted");
  }, []);

  function btnSave() {
    if (labelSubmit == "Save") {
      Meteor.call("insertCustomer", form, (err, result) => {
        if (result) {
          setForm(f);
          getData();
          console.log(result);
        }
      });
    } else {
      Meteor.call("updateCustomer", form, (err, result) => {
        if (result) {
          getData();
          setLabelSubmit("Save");
        }
      });
    }
  }
  function getData() {
    Meteor.call("findCustomers", (err, result) => {
      if (result) {
        setItem(result);
        setForm(f);
      }
    });
  }
  function btnDelete(_id) {
    Meteor.call("deleteCustomer", _id, (err, result) => {
      if (result) {
        getData();
      }
    });
  }

  function btnEdit(doc) {
    setForm(items[doc]);
    setLabelSubmit("Update");
  }

  return (
    <Container>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Person />
        </Avatar>
        <Typography component="h1" variant="h5">
          Customer
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={form.name.firstName}
                onChange={e =>
                  setForm({
                    ...form,
                    name: { ...form.name, firstName: e.target.value }
                  })
                }
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={form.name.lastName}
                onChange={e =>
                  setForm({
                    ...form,
                    name: { ...form.name, lastName: e.target.value }
                  })
                }
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={form.email}
                onChange={e =>
                  setForm({
                    ...form,
                    email: e.target.value
                  })
                }
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={form.phone}
                onChange={e =>
                  setForm({
                    ...form,
                    phone: e.target.value
                  })
                }
                variant="outlined"
                required
                fullWidth
                label="Phone"
                type="phone"
                autoComplete="current-phone"
              />
            </Grid>
          </Grid>
          <Button
            onClick={btnSave}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {labelSubmit}
          </Button>
        </form>
      </div>

      <Paper hidden={items.length == 0 ? true : false}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((doc, key) => (
              <TableRow key={key}>
                <TableCell>{doc.name.firstName}</TableCell>
                <TableCell>{doc.name.lastName}</TableCell>
                <TableCell>{doc.email}</TableCell>
                <TableCell>{doc.phone}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => btnDelete(doc._id)}
                    aria-label="delete"
                    size="small"
                    color="secondary"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => btnEdit(key)}
                    aria-label="edit"
                    size="small"
                    color="primary"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};
