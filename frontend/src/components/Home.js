import React from 'react'
import withStyles from 'material-ui/styles/withStyles'
// components
import Grid from 'material-ui/Grid'
import Login from './Login'

const styles = {
	flex_container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		height: '100%'
	}
}

class Home extends React.Component {
	render() {
		return (
			<Grid item xs={12}>
				<div className={this.props.classes.flex_container}>
					<Login {...this.props}></Login>
				</div>
			</Grid>
		)
	}
}

export default withStyles(styles)(Home)
