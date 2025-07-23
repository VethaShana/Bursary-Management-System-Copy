import { Grid } from '@material-ui/core'
import React from 'react'
import Title from '../components/Title'

function Users() {
	return (
		<React.Fragment>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Title
						title='Users'
						description='Create users, assign roles or delete users.'
					/>
				</Grid>

				<Grid item xs={12}></Grid>
			</Grid>
		</React.Fragment>
	)
}

export default Users
