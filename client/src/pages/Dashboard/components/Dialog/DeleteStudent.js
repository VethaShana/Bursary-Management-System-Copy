import {
	Button,
	Typography,
	LinearProgress,
	makeStyles
} from '@material-ui/core'
import React, { forwardRef, useImperativeHandle } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { deleteStudents } from '../../../../actions/students'
import { connect, useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
	dialogContent: {
		paddingBottom: theme.spacing(2)
	},
	dialogActions: {
		padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`
	}
}))

const ApproveStudent = forwardRef((props, ref) => {
	const { deleteStudents } = props
	const [open, setOpen] = React.useState(false)
	const [data, setData] = React.useState([])
	const students = useSelector(state =>
		state.students.data.filter(student => data.includes(student._id))
	)
	const classes = useStyles()
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

	const showDialog = (...data) => {
		setData(data)
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	useImperativeHandle(ref, () => {
		return {
			showDialog: showDialog
		}
	})

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="confirmation-dialog-title"
			fullScreen={fullScreen}
			fullWidth
		>
			<DialogTitle id="confirmation-dialog-title">
				Confirmation
			</DialogTitle>
			<DialogContent className={classes.dialogContent}>
				<DialogContentText id="confirmation-dialog-description">
					Are you sure to approve{' '}
					{students.length > 1 ? 'these' : 'the '} following{' '}
					{students.length > 1 ? 'students' : 'student'} to receive a
					bursary?
					{/* <Typography variant="caption" display="block" gutterBottom>
						Your application will be reviewed after you submitted
						the certified hard copy.
					</Typography> */}
				</DialogContentText>
				<List dense>
					{students.map((student, idx) => (
						<ListItem key={idx}>
							<ListItemText
								primary={student.fullName}
								secondary={
									<React.Fragment>
										<Typography
											component="span"
											variant="body2"
											color="textSecondary"
										>
											{student.nic}
										</Typography>
										{` — ${student.faculty}`}
									</React.Fragment>
								}
							/>
						</ListItem>
					))}
				</List>
			</DialogContent>
			<DialogActions className={classes.dialogActions}>
				<Button onClick={handleClose} variant="text" autoFocus>
					Cancel
				</Button>
				<Button
					onClick={() => {
						deleteStudents(data)
						handleClose()
					}}
					color="secondary"
					variant="contained"
					autoFocus
				>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	)
})

const mapDispatchToProps = { deleteStudents }

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
	ApproveStudent
)
