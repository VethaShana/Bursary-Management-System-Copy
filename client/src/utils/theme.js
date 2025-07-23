import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

const theme = responsiveFontSizes(
	createMuiTheme({
		palette: {
			primary: {
				main: '#496076',
				dark: '#334352',
				light: '#6d7f91',
			},
			secondary: {
				main: '#adefd1',
				light: '#bdf2da',
				dark: '#a7e2c8',
				// dark: '#87a899',
			},
			accent: {
				main: 'dodgerblue',
				light: '#bdf2da',
				dark: '#a7e2c8',
				// dark: '#87a899',
			},
		},
		typography: {
			fontFamily: 'Barlow',
		},
		shape: {
			// borderRadius: 6,
		},

		//overrides
		overrides: {
			MuiButton: {
				root: {
					textTransform: 'none',
				},
			},
			MuiPaper: {
				outlined: {
					// border: "1px solid rgba(101, 31, 255, 0.2)",
				},
			},
			MuiChip: {
				sizeSmall: {
					borderRadius: '4px',
				},
			},
			MuiListItem: {},
		},

		//props
		props: {
			MuiCheckbox: {
				disableRipple: true,
			},
			MuiButton: {
				disableRipple: true,
				disableElevation: true,
			},
			MuiIcon: {
				disableRipple: true,
			},
			MuiPaper: {
				elevation: 0,
				variant: 'outlined',
			},
			MuiTextField: {
				variant: 'outlined',
				size: 'small',
				fullWidth: true,
				InputLabelProps: {
					shrink: true,
				},
			},
			MuiListItem: {
				disableRipple: true,
			},
			MuiIconButton: {
				disableRipple: true,
				disableTouchRipple: true,
				disableFocusRipple: true,
			},
		},
	})
)

export default theme
