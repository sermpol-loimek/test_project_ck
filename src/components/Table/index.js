import React from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import moment from "moment";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "id", numeric: true, disablePadding: false, label: "Id" },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "author", numeric: false, disablePadding: false, label: "Author" },
  { id: "price", numeric: true, disablePadding: false, label: "Price" },
  {
    id: "datetime",
    numeric: false,
    disablePadding: false,
    label: "Date / Time",
  },
];
function TablePaginationActions(props) {
  const classes = useStyles1();
  const tableStyles = tableStylesObj();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage, darkMode } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight className={darkMode ? tableStyles.white : null} />
        ) : (
          <KeyboardArrowLeft className={darkMode ? tableStyles.white : null} />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft className={darkMode ? tableStyles.white : null} />
        ) : (
          <KeyboardArrowRight className={darkMode ? tableStyles.white : null} />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginRight: theme.spacing(2.5),
  },
}));

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
    groupColumn,
    setGroupColumn,
    darkMode,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const tableStyles = tableStylesObj();

  return (
    <TableHead>
      <TableRow>
        {headCells
          .filter((headCell) => groupColumn || headCell.id !== "author")
          .map((headCell) => (
            <TableCell
              className={darkMode ? tableStyles.white : null}
              key={headCell.id}
              align="left"
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
              {headCell.id === "name" ? (
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setGroupColumn(!groupColumn);
                    console.log(groupColumn);
                  }}
                >
                  {groupColumn ? (
                    <>
                      <ArrowRightIcon
                        className={darkMode ? tableStyles.white : null}
                      />
                      <ArrowLeftIcon
                        className={darkMode ? tableStyles.white : null}
                      />
                    </>
                  ) : (
                    <>
                      <ArrowLeftIcon
                        className={darkMode ? tableStyles.white : null}
                      />
                      <ArrowRightIcon
                        className={darkMode ? tableStyles.white : null}
                      />
                    </>
                  )}
                </IconButton>
              ) : null}
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { detail, onChangeSearchInput, setPage } = props;

  return (
    <Toolbar>
      <Autocomplete
        id="combo-box-demo"
        size="small"
        options={detail}
        onChange={(event, newValue) => {
          if (newValue) onChangeSearchInput(newValue.name);
          else onChangeSearchInput(null);
          setPage(0);
        }}
        getOptionLabel={(option) => option.name}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField {...params} label="Search" variant="outlined" />
        )}
      />
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const tableStylesObj = makeStyles((theme) => ({
  white: {
    color: "#fff",
  },
  bgblack: {
    backgroundColor: "rgb(76 76 76)",
    color: "#fff",
  },
}));

const EnhancedTable = ({ detail, searchDetail, onChangeSearchInput }) => {
  const classes = useStyles();
  const tableStyles = tableStylesObj();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [groupColumn, setGroupColumn] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const handleChangeDarkMode = (event) => {
    setDarkMode(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, searchDetail.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          detail={detail}
          onChangeSearchInput={onChangeSearchInput}
          setPage={setPage}
        />
        <TableContainer className={darkMode ? tableStyles.bgblack : null}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={searchDetail.length}
              groupColumn={groupColumn}
              setGroupColumn={setGroupColumn}
              darkMode={darkMode}
            />
            <TableBody>
              {searchDetail &&
                stableSort(searchDetail, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          className={darkMode ? tableStyles.white : null}
                        >
                          {row.id}
                        </TableCell>

                        <TableCell
                          className={darkMode ? tableStyles.white : null}
                        >
                          {row.name}
                        </TableCell>
                        {groupColumn ? (
                          <TableCell
                            className={darkMode ? tableStyles.white : null}
                          >
                            {row.author}
                          </TableCell>
                        ) : null}

                        <TableCell
                          className={darkMode ? tableStyles.white : null}
                        >
                          {row.price}
                        </TableCell>
                        <TableCell
                          className={darkMode ? tableStyles.white : null}
                        >
                          {moment(row.datetime).format("DD-MM-YYYY hh:mm A")}
                        </TableCell>
                        {/* <TableCell>
                          {moment(row.datetime).format("hh:mm A")}
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          className={darkMode ? tableStyles.bgblack : null}
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={3}
          count={searchDetail && searchDetail.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            native: true,
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
          darkMode={darkMode}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={handleChangeDarkMode} />}
        label="Dark Mode"
      />
    </div>
  );
};
export default EnhancedTable;
