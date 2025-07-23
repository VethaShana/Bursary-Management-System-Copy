import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Header from './FAQ-Main/Header'
import FeaturedPost from './FAQ-Main/FeaturedPost'
import Footer from './FAQ-Main/Footer'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
	mainGrid: {
		marginTop: theme.spacing(3)
	}
}))

const faqs = [
	{
		question: 'Registration 1',
		answer: 'This is how 1'
	},
	{
		question: 'Registration 2',
		answer: 'This is how 2'
	}
]

const featuredPosts = [
	{
		title: 'Registration',
		description:
			'This is a wider card with supporting text below as a natural lead-in to additional content.'
	},
	{
		title: 'Sign-Up',
		description:
			'This is a wider card with supporting text below as a natural lead-in to additional content.'
	},

	{
		title: 'Application Form',
		description:
			'This is a wider card with supporting text below as a natural lead-in to additional content.'
	},

	{
		title: 'Extended Application',
		description:
			'This is a wider card with supporting text below as a natural lead-in to additional content.'
	}
]

export default function FAQ() {
	const classes = useStyles()

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="lg">
				<Header title="FAQ" />
				<main>
					<Grid container spacing={4}>
						{featuredPosts.map(post => (
							<FeaturedPost key={post.title} post={post} />
						))}
					</Grid>
				</main>
			</Container>
			<Footer title="Footer" />
		</React.Fragment>
	)
}

// import React from 'react'
// import { Link } from 'react-router-dom'
// import Accordion from '@material-ui/core/Accordion'
// import AccordionSummary from '@material-ui/core/AccordionSummary'
// import AccordionDetails from '@material-ui/core/AccordionDetails'
// import Typography from '@material-ui/core/Typography'
// import Button from '@material-ui/core/Button'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
// import { makeStyles } from '@material-ui/core/styles'

// import { Container, IconButton } from '@material-ui/core'

// // const faqs = [
// // 	{
// // 		question: 'How to do something',
// // 		answer: 'This is how'
// // 	},
// // 	{
// // 		question: 'How to do something 2',
// // 		answer: 'This is how 2'
// // 	}
// // ]

// // const useStyles = makeStyles(theme => ({
// // 	root: {
// // 		width: '100%'
// // 	},
// // 	heading: {
// // 		fontSize: theme.typography.pxToRem(15),
// // 		fontWeight: theme.typography.fontWeightRegular
// // 	}
// // }))

// function FAQ() {
// 	const classes = useStyles()

// 	return (
// 		<Container>
// 			<Button component={Link} to="/">
// 				Home
// 			</Button>
// 			{faqs.map(faq => (
// 				<Accordion>
// 					<AccordionSummary
// 						expandIcon={<ExpandMoreIcon />}
// 						aria-controls="panel1a-content"
// 						id="panel1a-header"
// 					>
// 						<Typography className={classes.heading}>
// 							{faq.question}
// 						</Typography>
// 					</AccordionSummary>
// 					<AccordionDetails>
// 						<Typography>{faq.answer}</Typography>
// 					</AccordionDetails>
// 				</Accordion>
// 			))}
// 		</Container>
// 	)
// }

// export default FAQ
