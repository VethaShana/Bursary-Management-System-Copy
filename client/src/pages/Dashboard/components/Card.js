import React from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import moment from 'moment'

function preventDefault(event) {
	event.preventDefault()
}

const useStyles = makeStyles({
	context: {
		flex: 1
	}
})

function Card(props) {
	const { count, date } = props
	const classes = useStyles()
	return (
		<React.Fragment>
			<Typography
				component="h2"
				variant="h6"
				color="primary"
				gutterBottom
			>
				Total Students
			</Typography>
			<Typography component="p" variant="h4">
				{count}
			</Typography>
			<Typography color="textSecondary" className={classes.context}>
				{moment(date).format('[on] Do MMMM, YYYY')}
			</Typography>
			<div>
				<Link color="primary" href="#" onClick={preventDefault}>
					View Statics
				</Link>
			</div>
		</React.Fragment>
	)
}
const mapStateToProps = state => ({
	count: state.students.data.filter(x => x.isApproved === true).length,
	date: new Date()
})
export default connect(mapStateToProps)(Card)
