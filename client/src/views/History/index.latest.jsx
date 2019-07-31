import React, { useEffect, useState } from 'react';
import ReactExport from "react-export-excel";
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {
  SaveAlt as SaveAltIcon
} from '@material-ui/icons';
import { red, green, common } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux';
import { withStyles, Button } from '@material-ui/core';
import { getTrades } from 'store/actions/tradeActions';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function History(props) {
  const [, setTrades] = useState([]);

  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      props.history.push('/');
    } else {
      //      props.getTrades('ALL');
      setTradesToState(props.trades);
    }
  }, []);

  async function setTradesToState(trades) {
    await setTrades(trades);
  }

  const useStyles1 = makeStyles(theme => ({
    root: {
      flexShrink: 0,
      color: theme.palette.text.primary,

      marginLeft: theme.spacing(2.5)
    }
  }));

  const useStyles2 = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
    table: {
      minWidth: 500
    },
    tableWrapper: {
      overflowX: 'auto'
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    SaveAltIcon: {
      marginLeft: '875px',
      margintop: '24px'
    }
  }));

  function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    function handleFirstPageButtonClick(event) {
      onChangePage(event, 0);
    }

    function handleBackButtonClick(event) {
      onChangePage(event, page - 1);
    }

    function handleNextButtonClick(event) {
      onChangePage(event, page + 1);
    }

    function handleLastPageButtonClick(event) {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
      <div className={classes.root}>
        <IconButton
          aria-label="First Page"
          disabled={page === 0}
          onClick={handleFirstPageButtonClick}
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          aria-label="Previous Page"
          disabled={page === 0}
          onClick={handleBackButtonClick}
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          aria-label="Next Page"
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          onClick={handleNextButtonClick}
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          aria-label="Last Page"
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          onClick={handleLastPageButtonClick}
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
  };

  //function CustomPaginationActionsTable() {
  
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.trades.length - page * rowsPerPage);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (

    <Paper className={classes.root}>
      <div>
          <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="Start Date"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              label="End Date"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <ExcelFile element={<IconButton className={classes.SaveAltIcon}>
                  <SaveAltIcon style={{ color: common.black }} />
                </IconButton>}>
                <ExcelSheet data={props.trades} name="TradeJournal">
                  <ExcelColumn label="EntryDate" value="date"/>
                    <ExcelColumn label="Stock" value="stock"/>
                    <ExcelColumn label="Name" value="stockname"/>
                    <ExcelColumn label="Action" value="action"/>
                    <ExcelColumn label="Quantity" value="stockquantity"/>
                    <ExcelColumn label="Starting Price" value="startingprice"/>
                    <ExcelColumn label="Stoploss" value="stoploss"/>
                    <ExcelColumn label="Target Price" value="targetprice"/>
                    <ExcelColumn label="Closing Price" value="closingprice"/>
                    <ExcelColumn label="Gain / Loss" value="gain"/>
                    <ExcelColumn label="Emotions" value="emotionalstate"/>
                </ExcelSheet>
            </ExcelFile>
          </form>
      </div>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">EntryDate  </TableCell>
              <TableCell align="left">Stock</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Action</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="left">Starting Price</TableCell>
              <TableCell align="left">Stoploss</TableCell>
              <TableCell align="left">Target Price</TableCell>
              <TableCell align="left">Closing Price</TableCell>
              <TableCell align="left">Gain / Loss</TableCell>
              <TableCell align="left">Emotions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.trades
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(trade => {
                return (
                  <TableRow key={trade._id}>
                    <TableCell align="left">{trade.date.slice(0,10)}</TableCell>
                    <TableCell align="left">{trade.stock}</TableCell>
                    <TableCell align="left">{trade.stockname}</TableCell>
                    <TableCell align="left">{trade.action}</TableCell>
                    <TableCell align="left">{trade.stockquantity}</TableCell>
                    <TableCell align="left">{trade.startingprice}</TableCell>
                    <TableCell align="left">{trade.stoploss}</TableCell>
                    <TableCell align="left">{trade.targetprice}</TableCell>
                    <TableCell align="left">{trade.closingprice}</TableCell>
                    <TableCell align="left">{trade.gain}</TableCell>
                    <TableCell align="left">{trade.emotionalstate}</TableCell>
                  </TableRow>
                );
              })}

            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                ActionsComponent={TablePaginationActions}
                colSpan={3}
                count={props.trades.length}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                SelectProps={{
                  inputProps: { 'aria-label': 'Rows per page' },
                  native: true
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>
  );
  //}
}

History.propTypes = {
  auth: PropTypes.object,
  classes: PropTypes.object.isRequired,
  getTrades: PropTypes.func,
  history: PropTypes.object,
  trades: PropTypes.array
};

const mapStateToProps = state => ({
  auth: state.auth,
  trades: state.trades.trades
});

export default connect(
  mapStateToProps,
  { getTrades }
)(withStyles()(History));