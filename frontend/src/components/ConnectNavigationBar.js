import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import NavigationBar from './NavigationBar';

function mapStateToProps(state) {
	return {
		...state
	}
}

function mapDispachToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

const ConnectNavigationBar = connect(mapStateToProps, mapDispachToProps)(NavigationBar);

export default ConnectNavigationBar;