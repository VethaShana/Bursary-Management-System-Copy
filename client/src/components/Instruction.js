import React from 'react'

import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { useMediaQuery, makeStyles } from '@material-ui/core'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2)
	},
	heading: {
		fontWeight: theme.typography.fontWeightMedium
	},
	accordion: {
		// background: theme.palette.secondary.light
	}
}))

const Content = () => (
	<Typography component="div">
		<Typography variant="body2" color="initial" paragraph>
			Particulars regarding sources of income of should be stated in full.
			Particulars of income supplied by you will be checked with relevant
			officers and the Department of Inland revenue.
		</Typography>

		<Typography variant="body2" color="initial" paragraph>
			No fields should be left blank. If you have nothing to state it
			should be stated N/A ,Incomplete applications or applications that
			do not reach this office before closing date or applications that
			are not channeled through Grama Sevaka and Divisional Secretary will
			be rejected.
		</Typography>

		<Typography variant="body2" color="initial" paragraph>
			This application should be duly perfected and handed over to Grama
			Sevaka, so as to reach this office on or before{' '}
			<Typography
				variant="body2"
				style={{ fontWeight: 500 }}
				component="b"
			>
				{moment(new Date()).add(7, 'day').format('dddd, MMMM Do YYYY')}
			</Typography>{' '}
			the Grama Sevaka will forward the Application to the Division
			Secretary as specified in cage 11. As the application has to be
			returned by registered post and envelop of 9”x 4” in size with
			stamps to the appropriate value pasted should be handed over to the
			Grama Sevaka along with the application.The words “Bursary
			Application” should be indicated on the top left corner of the
			envelop. This application should not be handed over to this office
			personally under any circumstances.
		</Typography>

		<Typography variant="body2" color="initial" paragraph>
			If the Jaffna University authorities are convinced that the
			information supplied by you are incorrect, you should note that you
			could either be punished or your internal studentship will be
			cancelled.
		</Typography>

		<Typography variant="body2" color="initial" paragraph>
			If you are a clergy you should indicate the particulars of the
			guardian (chief priest of the temple)
		</Typography>

		<Typography variant="body2" color="initial" paragraph>
			If you are under the custody of a legal Guardian you should furnish
			copies of documents issued by a court of law to that effect.
		</Typography>
	</Typography>
)

function Instruction(props) {
	const matches = useMediaQuery(theme => theme.breakpoints.up('sm'))
	const classes = useStyles()
	if (matches) {
		return (
			<Paper className={classes.paper}>
				<Typography
					variant="body2"
					style={{ fontWeight: 500 }}
					color="error"
					gutterBottom
				>
					Please read the following instructions before filling the
					form.
				</Typography>
				<Content />
			</Paper>
		)
	}
	return (
		<Accordion
			elevation={0}
			defaultExpanded={true}
			className={classes.accordion}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon fontSize="small" />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography
					className={classes.heading}
					variant="subtitle1"
					color="initial"
					component="div"
				>
					Instructions
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Content />
			</AccordionDetails>
		</Accordion>
	)
}

export default Instruction
