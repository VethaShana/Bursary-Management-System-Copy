import { Grid } from '@material-ui/core'
import React from 'react'
import Title from '../components/Title'

function Settings() {
	return (
		<React.Fragment>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Title
						title='Settings'
						description='Change instalments, review settings etc.'
					/>
				</Grid>

				<Grid item xs={12}></Grid>
			</Grid>
		</React.Fragment>
	)
}

export default Settings
