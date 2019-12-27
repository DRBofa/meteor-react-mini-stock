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
    fromDate: moment(Date.now()).format("YYYY-MM-DD"),
    toDate: moment(Date.now()).format("YYYY-MM-DD")
  };
  const [form, setForm] = useState(f);
  const [data, setData] = useState([]);
  const [labelSubmit, setLabelSubmit] = useState("Submit");

  useEffect(() => {
    console.log("Mounted");
    getData();
  }, []);
  useEffect(() => {
    console.log("watch");
    if (x != 0) {
      reportByDate();
    } else {
      console.log(x);
      x = 1;
    }
  }, [form]);

  function getData() {
    //  Code get Report
    Meteor.call("saleReport", (err, result) => {
      if (result) {
        setData(result);
        console.log(result, "report");
      }
    });
  }
  function reportByDate() {
    // Code query get report
    Meteor.call("saleReportByDate", form, (err, result) => {
      if (result) {
        setData(result);
        console.log(result, "report");
      }
    });
  }
  function btnDelete(_id) {
    // code Delete report
  }
  function changeDate(doc) {
    return moment(doc).format("DD/MM/YYYY");
  }

  return (
    <Container>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Person />
        </Avatar>
        <Typography component="h1" variant="h5">
          Report
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                fullWidth
                label="From date"
                value={form.fromDate}
                onChange={e =>
                  setForm({
                    ...form,
                    fromDate: e.target.value
                  })
                }
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                fullWidth
                label="To date"
                value={form.toDate}
                onChange={e =>
                  setForm({
                    ...form,
                    toDate: e.target.value
                  })
                }
                variant="outlined"
              ></TextField>
            </Grid>
          </Grid>
          <Button
            onClick={reportByDate}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {labelSubmit}
          </Button>
        </form>
      </div>

      <Paper>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Customer </TableCell>
              <TableCell>Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((doc, key) => (
              <TableRow key={key}>
                <TableCell>{doc._id}</TableCell>
                <TableCell>
                  {doc.customerName.firstName} {doc.customerName.lastName}
                </TableCell>
                <TableCell>{changeDate(doc.date)}</TableCell>
                <TableCell>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Price </TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data[key].items.map((obj, index) => (
                        <TableRow key={index}>
                          <TableCell>{obj.itemName}</TableCell>
                          <TableCell>{obj.price}</TableCell>
                          <TableCell>{obj.qty}</TableCell>
                          <TableCell>{obj.qty * obj.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};
