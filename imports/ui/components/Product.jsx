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
import Collection from "@material-ui/icons/Collections";
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
    name: "",
    cost: "",
    price: "",
    qty: "",
    memo: ""
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
      Meteor.call("insertProduct", form, (err, result) => {
        if (result) {
          setForm(f);
          getData();
          console.log(result);
        }
      });
    } else {
      Meteor.call("updateProduct", form, (err, result) => {
        if (result) {
          getData();
          setLabelSubmit("Save");
        }
      });
    }
  }
  function getData() {
    Meteor.call("findProducts", (err, result) => {
      if (result) {
        setItem(result);
        setForm(f);
      }
    });
  }
  function btnDelete(_id) {
    Meteor.call("deleteProduct", _id, (err, result) => {
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
          <Collection />
        </Avatar>
        <Typography component="h1" variant="h5">
          Product
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                value={form.name}
                onChange={e =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                }
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                value={form.cost}
                onChange={e =>
                  setForm({
                    ...form,
                    cost: e.target.value
                  })
                }
                variant="outlined"
                required
                fullWidth
                id="cost"
                label="Cost"
                name="cost"
                autoComplete="cost"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                margin="dense"
                value={form.price}
                onChange={e =>
                  setForm({
                    ...form,
                    price: e.target.value
                  })
                }
                variant="outlined"
                required
                fullWidth
                id="Price"
                label="Price"
                name="Price"
                autoComplete="Price"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                margin="dense"
                value={form.qty}
                onChange={e =>
                  setForm({
                    ...form,
                    qty: e.target.value
                  })
                }
                variant="outlined"
                required
                fullWidth
                id="qty"
                label="Quantity"
                name="qty"
                autoComplete="qty"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                margin="dense"
                value={form.memo}
                onChange={e =>
                  setForm({
                    ...form,
                    memo: e.target.value
                  })
                }
                variant="outlined"
                required
                fullWidth
                id="memo"
                label="Memo"
                name="memo"
                autoComplete="memo"
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
              <TableCell>Name</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Memo</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((doc, key) => (
              <TableRow key={key}>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.cost}</TableCell>
                <TableCell>{doc.qty}</TableCell>
                <TableCell>{doc.memo}</TableCell>
                <TableCell>{doc.qty * doc.cost}</TableCell>
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
