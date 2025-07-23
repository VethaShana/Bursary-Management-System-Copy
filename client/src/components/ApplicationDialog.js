import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import LinearProgress from '@material-ui/core/LinearProgress'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Box, FormControl, FormControlLabel } from '@material-ui/core'
import FormHelperText from '@material-ui/core/FormHelperText'
import { submitApplication } from '../actions/application'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
	checkbox: {
		fontSize: theme.typography.fontSize
	},
	dialogContent: {
		paddingBottom: theme.spacing(2)
	},
	dialogActions: {
		padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`
	}
}))

function ApplicationDialog(props) {
	const { open, onClose, submitApplication, isSubmitted, isLoading } = props
	const classes = useStyles()
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
	const [isVerified, setIsVerified] = useState(false)

	const handleChange = e => {
		setIsVerified(e.target.checked)
	}

	const onSubmit = e => {
		if (isVerified) submitApplication()
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullScreen={fullScreen}
			fullWidth
			disableBackdropClick
		>
			{isSubmitted ? (
				<React.Fragment>
					<DialogTitle id="alert-dialog-title">Success</DialogTitle>
					<DialogContent className={classes.dialogContent}>
						<DialogContentText id="alert-dialog-description">
							Successfully applied.
							<Typography
								variant="caption"
								display="block"
								gutterBottom
							>
								Your application will be reviewed after you
								submitted the certified hard copy.
							</Typography>
						</DialogContentText>
					</DialogContent>
					<DialogActions className={classes.dialogActions}>
						<Button
							onClick={onClose}
							color="secondary"
							variant="contained"
							autoFocus
						>
							Ok
						</Button>
					</DialogActions>
				</React.Fragment>
			) : (
				<React.Fragment>
					<DialogTitle id="alert-dialog-title">
						Confirmation
					</DialogTitle>
					<DialogContent className={classes.dialogContent}>
						<DialogContentText id="alert-dialog-description">
							Are you sure you want to submit the application?
							<Typography
								variant="caption"
								display="block"
								gutterBottom
							>
								we suggest you double-check your application
								before submission.
							</Typography>
						</DialogContentText>
						<FormControl>
							<FormControlLabel
								style={{ display: 'table' }}
								className={classes.checkbox}
								control={
									<div style={{ display: 'table-cell' }}>
										<Checkbox
											// icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
											// checkedIcon={<CheckBoxIcon fontSize="small" />}
											onChange={handleChange}
											value={isVerified}
											size="small"
											name="isVerified"
										/>
									</div>
								}
								label="I certify that the gross annual income of parents / guardians and the details regarding spouse ( if married ) properties, siblings are correct to my knowledge and belief."
								fontSize="h1.fontSize"
							/>
							{!isVerified && (
								<Box ml={3.4}>
									<FormHelperText error>
										The above statement should be certified
										to apply.
									</FormHelperText>
								</Box>
							)}
						</FormControl>
					</DialogContent>
					{isLoading && <LinearProgress />}
					<DialogActions className={classes.dialogActions}>
						<Button onClick={onClose} color="primary">
							Cancel
						</Button>
						<Button
							onClick={onSubmit}
							color="secondary"
							variant="contained"
							disabled={!isVerified}
							autoFocus
						>
							Yes, Confirm
						</Button>
					</DialogActions>
				</React.Fragment>
			)}
		</Dialog>
	)
}

const mapStateToProps = state => ({
	isSubmitted: state.application.isSubmitted,
	isLoading: state.application.isLoading
})

export default connect(mapStateToProps, { submitApplication })(
	ApplicationDialog
)
