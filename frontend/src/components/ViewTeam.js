import axios from 'axios'
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import FormGroup from 'material-ui/Form/FormGroup'
import FormControlLabel from 'material-ui/Form/FormControlLabel'
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';

import FormControl from 'material-ui/Form/FormControl'
import InputLabel from 'material-ui/Input/InputLabel'
import Input from 'material-ui/Input/Input'
import InputAdornment from 'material-ui/Input/InputAdornment'
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'mdi-material-ui/Delete';
import MagnifyIcon from 'mdi-material-ui/Magnify';
import NavigationCloseIcon from 'mdi-material-ui/Close'
// icons
import NavigationCheck from 'mdi-material-ui/Check'
import CloseIcon from 'mdi-material-ui/Close'
// transitions
import Collapse from 'material-ui/transitions/Collapse';
import './team/ViewTeam.css'

let counter = 0;
function createData(name, floater, regular, joined, left, notes) {
  counter += 1;
  return { id: counter, name, floater, regular, joined, left, notes };
}

const columnData = [
  { id: 1, numeric: false, label: 'Name' },
  { id: 2, numeric: false, label: 'Floater' },
  { id: 3, numeric: false, label: 'Regular' },
  { id: 4, numeric: false, label: 'Joined' },
  { id: 5, numeric: false, label: 'Left' },
  { id: 6, numeric: false, label: 'Notes' }
];

class EnhancedTableHead extends React.Component {
	constructor () {
		super ();

		this.createSortHandler = this.createSortHandler.bind(this)
	}
  createSortHandler(property) {
    return function (event) {
      return this.props.onRequestSort(event, property);
    }
  }

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            {(this.rowCount && 
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            )}
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = {};

let EnhancedTableToolbar = props => {
  const { classes, numSelected, searchOpen, toggleSearchForm } = props;

  const users = [{
    left: Date(null),
    AreaId: null,
    VolunteerId: null
  }]

  const deleteUsers = function () {
    let options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'text/plain',
				'auth-token': this.props.user.token
      },
      body: {
        users
      }
		}

		this.props.deleteUsers('/api/teams', options)
  }

  return (
    <Toolbar>
      <div className="title">
        {numSelected > 0 ? (
          <Typography variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title">Team</Typography>
        )}
      </div>
      <div className="spacer" />
      <div className="actions">
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={deleteUsers}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Search">
            <IconButton aria-label="Search"
              onClick={toggleSearchForm}
            >
              {searchOpen ?
                <NavigationCloseIcon /> :
                <MagnifyIcon />
              }
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  toggleSearchForm: PropTypes.func.isRequired,
  searchOpen: PropTypes.bool.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = {};

class EnhancedTable extends React.Component {
  constructor(props, context) {
	super(props, context);
	
  this.isSelected = this.isSelected.bind(this)
	this.handleRequestSort = this.handleRequestSort.bind(this)
	this.handleSelectAllClick = this.handleSelectAllClick.bind(this)
	this.handleClick = this.handleClick.bind(this)
	this.handleChangePage = this.handleChangePage.bind(this)
  this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
  this.toggleSearchForm = this.toggleSearchForm.bind(this)
  this.toggleTeamSelection = this.toggleTeamSelection.bind(this)
  this.updateSearchString = this.updateSearchString.bind(this)
  this.clearSearchString = this.clearSearchString.bind(this)
  this.filteredByTeam = this.filteredByTeam.bind(this)
  this.filteredBySearchString = this.filteredBySearchString.bind(this)

  this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 5,
      team: [],
      searchFormOpen: false,
      searchString: '',
      teamNames: []
    };
  }


  componentWillMount() {
    const _this = this
    axios({
      method: 'GET',
      url: 'http://localhost:5035/api/teams',
      headers: {
        'Content-Type': 'text/plain',
        'auth-token': this.props.user.token
      }
    })
    .then(function (response) {
      _this.setState( {data: response.data.team.map((volunteer, index) => {
      return {
        ...volunteer,
        id: index
      }
      }).sort((a, b) => (a.name < b.name ? -1 : 1))} )
      _this.setState({teamNames: response.data.teams.map(team => {
        return {
          name: team.name,
          id: String(team.id),
          selected: true
        }
      })})
    })
    .catch((error) => {
      // display UI error?
    })
  }

  handleRequestSort(event, property) {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick(event, checked) {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick(event, id) {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage(event, page) {
    this.setState({ page });
  };

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected(id) {
	  return this.state.selected.indexOf(id) !== -1
  };
  
  toggleSearchForm() {
    this.setState({ searchFormOpen: !this.state.searchFormOpen });
  };

  toggleTeamSelection(id) {
    let modified = [...this.state.teamNames]
    modified.forEach(team => {
      if (team.id === id) {
        team.selected = !team.selected
      }
    })
    this.setState({ teamNames: modified });
  };

  filteredByTeam() {
    let selected = this.state.teamNames.filter(name => name.selected).map(name => name.id)
    return this.state.data.filter(member => {
      return selected.includes(String(member.AreaId)) 
    })
  }

  filteredBySearchString() {
    return !this.state.searchString ? this.filteredByTeam() : this.filteredByTeam().filter(member => {
        let searchIn = member.Volunteer.firstName.toLowerCase() + member.Volunteer.lastName.toLowerCase()
        return searchIn.includes(this.state.searchString) || searchIn.includes(this.state.searchString)
      })
  }

  updateSearchString(event) {
    this.setState({ searchString: event.target.value})
  }

  clearSearchString() {
    this.setState({ searchString: ''})
  }

  render() {
    const { classes } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const data = this.filteredBySearchString()
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper>
        <EnhancedTableToolbar 
          numSelected={selected.length}
          toggleSearchForm={this.toggleSearchForm}
          searchOpen={this.state.searchFormOpen} 
        />

        <Collapse in={this.state.searchFormOpen}>
          <FormGroup row className="search__wrapper">
            {this.state.teamNames.map((team, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={team.selected}
                      onChange={() => this.toggleTeamSelection(team.id)}
                      value={team.id}
                      color="primary"
                    />
                  }
                  label={team.name}
                />
              )
            })}

            <FormControl>
              <InputLabel htmlFor="adornment-search">Search</InputLabel>
              <Input
              id="adornment-search"
              type='text'
              value={this.state.searchString}
              onChange={this.updateSearchString}
              endAdornment={
                <InputAdornment position="end">
                <IconButton
                  aria-label="Clear search"
                  onClick={this.clearSearchString}
                >
                  <CloseIcon />
                </IconButton>
                </InputAdornment>
              }
              />
            </FormControl>
          </FormGroup>
        </Collapse>

        <div className="table__wrapper">
          <Table className="table">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell>
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell>{`${n.Volunteer.firstName} ${n.Volunteer.lastName}`}</TableCell>
                    <TableCell>
                      {(n.floater && <NavigationCheck />) || <NavigationCloseIcon />}
                    </TableCell>
                    <TableCell>
                      {(n.regular && <NavigationCheck />) || <NavigationCloseIcon />}
                    </TableCell>
                    <TableCell>{n.joined}</TableCell>
                    <TableCell>{n.left}</TableCell>
                    <TableCell>{n.notes}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);



// import React from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// // components
// import Grid from 'material-ui/Grid'
// import Table from 'material-ui/Table'
// import TableBody from 'material-ui/Table/TableBody'
// import TableCell from 'material-ui/Table/TableCell'
// import TableHead from 'material-ui/Table/TableHead'
// import TableRow from 'material-ui/Table/TableRow'
// // icons
// import NavigationCheck from 'mdi-material-ui/Check'
// import NavigationClose from 'mdi-material-ui/Close'

// class ViewTeam extends React.Component {
// 	constructor () {
// 		super()

		// this.state = {
		// 	'team': []
		// }
// 	}

// 	componentWillMount() {
// 		const _this = this
// 		axios({
// 			method: 'GET',
// 			url: 'http://localhost:5035/api/teams',
// 			headers: {
// 				'Content-Type': 'text/plain',
// 				'auth-token': this.props.user.token
// 			}
// 		})
// 		.then(function (response) {
// 			_this.setState( {team: response.data.team} )
// 		})
// 		.catch((error) => {
// 			// display UI error?
// 		})
// 	}

// 	render() {
// 		return (
// 			<Grid item xs={12}>
// 				<Table>
// 					<TableHead>
// 						<TableRow>
// 							<TableCell>Name</TableCell>
// 							<TableCell>Floater</TableCell>
// 							<TableCell>Regular</TableCell>
// 							<TableCell>Joined</TableCell>
// 							<TableCell>Left</TableCell>
// 							<TableCell>Notes</TableCell>
// 							<TableCell></TableCell>
// 						</TableRow>
// 					</TableHead>
// 					<TableBody>
// 						{this.state.team.map((member, index) => {
// 							return (
// 								<TableRow key={index}>
// 									<TableCell component={Link} to={`/user?id=${member.VolunteerId}`}>
// 										{member.Volunteer.firstName} {member.Volunteer.lastName}
// 									</TableCell>
// 									<TableCell>
// 										{(member.floater && <NavigationCheck />) || <NavigationClose />}
// 									</TableCell>
// 									<TableCell>
// 										{(member.regular && <NavigationCheck />) || <NavigationClose />}
// 									</TableCell>
// 									<TableCell>
// 										{member.joined}
// 									</TableCell>
// 									<TableCell>
// 										{member.left}
// 									</TableCell>
// 									<TableCell>
// 										{member.notes}
// 									</TableCell>
// 								</TableRow>
// 							)
// 						})}
// 					</TableBody>
// 				</Table>
// 			</Grid>
// 		)
// 	}
// }

// export default ViewTeam
