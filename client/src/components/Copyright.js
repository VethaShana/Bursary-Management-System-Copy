import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

function Copyright() {
	return (
		<Typography
			variant='body2'
			color='textSecondary'
			align='center'
			gutterBottom
		>
			{'Copyright © '}
			<Link color='inherit' href='#'>
				University of Jaffna
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

export default Copyright
