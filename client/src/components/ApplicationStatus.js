import { Box, Typography, Grid, Paper } from '@material-ui/core'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import React from 'react'
import { connect } from 'react-redux'

function ApplicationStatus({ isApproved }) {
	return (
		<Paper>
			<Box p={3}>
				<Grid container spacing={2}>
					<Grid item>
						{isApproved ? (
							<Typography variant="body1">
								Approved &nbsp;
								<CheckCircleRoundedIcon
									color="secondary"
									style={{
										fontSize: 16,
										verticalAlign: '-3px'
										// marginLeft: '10px'
									}}
								/>
							</Typography>
						) : (
							<Typography variant="body1" component="p">
								Pending
							</Typography>
						)}
						<Typography
							variant="body2"
							component="p"
							color="textSecondary"
						>
							Application Status
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	)
}

const mapStateToProps = state => ({
	isApproved: state.application.isApproved
})

export default connect(mapStateToProps)(ApplicationStatus)
