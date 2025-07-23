import { Button, Grid } from '@material-ui/core'
import React, { useRef } from 'react'
import AddIcon from '@material-ui/icons/Add'
import DescriptionIcon from '@material-ui/icons/Description'

import Dialog from './Dialog'

function Toolbar() {
	const installmentRef = useRef(null)
	const summaryRef = useRef(null)
	return (
		<Grid container display="flex" spacing={2} justify="flex-end">
			<Grid item>
				<Button
					variant="contained"
					color="primary"
					size="small"
					startIcon={<AddIcon fontSize="small" />}
					onClick={() => installmentRef.current.showDialog()}
				>
					Add Installment
				</Button>
				<Dialog.Installment ref={installmentRef} />
			</Grid>
			<Grid item>
				<Button
					variant="contained"
					color="primary"
					size="small"
					startIcon={<DescriptionIcon fontSize="small" />}
					onClick={() => summaryRef.current.showDialog()}
				>
					Summary
				</Button>
				<Dialog.Summary ref={summaryRef} />
			</Grid>
		</Grid>
	)
}

export default Toolbar
