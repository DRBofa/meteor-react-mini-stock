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
import Person from "@material-ui/icons/Person";
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
    userName: "",
    email: "",
    password: ""
  };
  const [form, setForm] = useState(f);
  const [items, setItem] = useState([]);
  const [labelSubmit, setLabelSubmit] = useState("Register");
  useEffect(() => {
    getData();
  }, []);
  function getData() {
    console.log("called");
    Meteor.call("findUsers", (err, result) => {
      if (result) {
        setItem(result);
        console.log(result);
      } else {
        console.log(err);
      }
    });
  }
  function btnSave() {
    // insert
    if (labelSubmit == "Register") {
      // let arr = items;
      // arr.push(form);
      // setItem(arr);
      // setForm(f);
      Meteor.call("insertUser", form, (err, result) => {
        if (result) {
          console.log(result);
          getData();
        } else console.log(err);
      });
    }
    // update
    else {
      console.log("code update");
    }
  }
  function btnDelete(_id) {
    let arr = items;
    arr.splice(_id, 1);
    setItem(arr);
    setForm(f);
    console.log(items);
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
          User
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                value={form.userName}
                onChange={e =>
                  setForm({
                    ...form,
                    userName: e.target.value
                  })
                }
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Username"
                name="userName"
                autoComplete="userName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
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
                margin="dense"
                value={form.password}
                onChange={e =>
                  setForm({
                    ...form,
                    password: e.target.value
                  })
                }
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
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
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((doc, key) => (
              <TableRow key={key}>
                <TableCell>{doc.username}</TableCell>
                <TableCell>{doc.emails[0].address}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => btnDelete(key)}
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
