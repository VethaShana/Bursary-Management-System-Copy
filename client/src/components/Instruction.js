import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	useMediaQuery,
	makeStyles,
	Typography,
	Paper,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React from 'react'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
	},
	heading: {
		// fontSize: theme.typography.pxToRem(18),
		// fontWeight: theme.typography.fontWeightRegular,
		fontWeight: theme.typography.fontWeightMedium,
	},
}))

function Instruction({ children }) {
	const matches = useMediaQuery(theme => theme.breakpoints.up('sm'))
	const classes = useStyles()
	if (matches) {
		return <Paper className={classes.paper}>{children}</Paper>
	}
	return (
		<Accordion elevation={0} defaultExpanded={true}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls='panel1a-content'
				id='panel1a-header'
			>
				<Typography className={classes.heading} variant='h6' color='initial'>
					Instructions
				</Typography>
			</AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
		</Accordion>
	)
}

export default Instruction
