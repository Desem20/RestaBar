import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StatusOption from './StatusOption'
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(orderID, orderDetails, dateHour, comment, custName, tableNum) {
  return { orderID, orderDetails, dateHour, comment, custName, tableNum};
}

function createRows (orders){
  const rows=[];
  orders.forEach(orderEl=>{
    const {orderDescription,comments,name,order_id,tableNumber,dateAndTime} = orderEl
    rows.push(createData(order_id,orderDescription,dateAndTime,comments,name,tableNumber))
    console.log("ok",orderEl);
  })
  console.log("rows",rows);
  return rows
}



const useStyles = makeStyles(theme => ({
  root: {
    //changed
    width: '100%',
    marginLeft: "15px",
    marginTop: theme.spacing(5),
    overflowX: 'auto',
  },
  table: {
    minWidth: 600,
  },
}));

export default function CustomizedTables(props) {
  const classes = useStyles();
  const rows=createRows(props.orders)

  return (
    <Paper className={classes.root} style={{marginBottom: "500px"}}> {/*changed*/}
      <Table className={classes.table}>
        <TableHead >
          <TableRow >
            <StyledTableCell align="left">Order Details:</StyledTableCell>
            <StyledTableCell align="left">Date and Hour:</StyledTableCell>
            <StyledTableCell align="left">Comments:</StyledTableCell>
            <StyledTableCell align="left">Customer Name:</StyledTableCell>
            <StyledTableCell align="left">Table Number:</StyledTableCell>
            <StyledTableCell align="left">Status:</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.orderID.toString()}>
              <StyledTableCell  align="left">{row.orderDetails}</StyledTableCell>
              <StyledTableCell align="left">{row.dateHour}</StyledTableCell>
              <StyledTableCell align="left">{row.comment}</StyledTableCell>
              <StyledTableCell align="left">{row.custName}</StyledTableCell>
              <StyledTableCell align="left">{row.tableNum}</StyledTableCell>

               <StyledTableCell align="right">
               <StatusOption ></StatusOption>
              </StyledTableCell> 
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}