import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import MuiTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import MuiTableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import Skeleton from '@material-ui/lab/Skeleton'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import Dialog from '../Dialog'
import Fuse from 'fuse.js'
import TableSearch from '../TableSearch'

import { connect, useDispatch } from 'react-redux'
import { deleteStudent } from '../../../../actions/students'
import { Chip } from '@material-ui/core'

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) return order
		return a[1] - b[1]
	})
	return stabilizedThis.map(el => el[0])
}

const headCells = [
	{
		id: 'regNo',
		numeric: false,
		disablePadding: false,
		label: 'Registration No.'
	},
	{ id: 'nic', numeric: false, disablePadding: false, label: 'NIC' },
	{
		id: 'name',
		numeric: false,
		disablePadding: false,
		label: 'Name with Initials'
	},
	// {
	// 	id: 'district',
	// 	numeric: false,
	// 	disablePadding: false,
	// 	label: 'District'
	// },
	{
		id: 'course',
		numeric: false,
		disablePadding: false,
		label: 'Course of Study'
	},
	{
		id: 'isValidCandidate',
		numeric: false,
		disablePadding: false,
		label: 'Status'
	},
	{
		id: 'grossIncome',
		numeric: true,
		disablePadding: false,
		label: 'Net Income'
	}
]

function TableHead(props) {
	const {
		classes,
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort
	} = props
	const createSortHandler = property => event => {
		onRequestSort(event, property)
	}

	return (
		<MuiTableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={
							numSelected > 0 && numSelected < rowCount
						}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ 'aria-label': 'select all students' }}
						size="small"
					/>
				</TableCell>
				<TableCell />
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === 'desc'
										? 'sorted descending'
										: 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				{numSelected > 0 ? null : <TableCell />}
			</TableRow>
		</MuiTableHead>
	)
}

TableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
}

const useToolbarStyles = makeStyles(theme => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1)
	},
	highlight:
		theme.palette.type === 'light'
			? {
					color: theme.palette.primary.main,
					backgroundColor: lighten(theme.palette.secondary.main, 0.85)
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark
			  },
	title: {
		flex: '1 1 100%'
	}
}))

const TableToolbar = props => {
	const classes = useToolbarStyles()
	const {
		selected,
		numSelected,
		setSelected,
		approveDialogRef,
		deleteDialogRef,
		onQueryChange
	} = props

	return (
		<React.Fragment>
			{/* <Toolbar disableGutters>
				<Typography
					variant="h6"
					color="primary"
					className={classes.title}
					gutterBottom
				>
					Pending Applications
					<Typography
						variant="body2"
						component="div"
						color="textSecondary"
						className={classes.title}
						gutterBottom
					>
						Applications pending for Approval
					</Typography>
				</Typography>
				<TableSearch onQueryChange={onQueryChange} />
			</Toolbar> */}
			<TableTopHeader
				onQueryChange={onQueryChange}
				title="Pending Application"
				subtitle="Applications pending for approval"
			/>
			<Toolbar
				className={clsx(classes.root, {
					[classes.highlight]: numSelected > 0
				})}
			>
				{numSelected > 0 ? (
					<Typography
						className={classes.title}
						color="inherit"
						variant="subtitle1"
						component="div"
					>
						{numSelected} selected
					</Typography>
				) : (
					<Typography
						className={classes.title}
						variant="h6"
						id="tableTitle"
						component="div"
					>
						{/* Pending Applications */}
					</Typography>
				)}

				{numSelected > 0 ? (
					<React.Fragment>
						<Tooltip title="Approve">
							<Button
								color="primary"
								size="small"
								onClick={() => {
									approveDialogRef.current.showDialog(
										...selected
									)
									setSelected([])
								}}
							>
								Approve
							</Button>
						</Tooltip>
						<Tooltip title="Delete">
							<IconButton aria-label="delete">
								<DeleteIcon
									color="primary"
									fontSize="small"
									onClick={() => {
										deleteDialogRef.current.showDialog(
											...selected
										)
										setSelected([])
									}}
								/>
							</IconButton>
						</Tooltip>
					</React.Fragment>
				) : (
					<Tooltip title="Filter list">
						<IconButton aria-label="filter list">
							<FilterListIcon />
						</IconButton>
					</Tooltip>
				)}
			</Toolbar>
		</React.Fragment>
	)
}

TableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired
}

const useContextMenuStyles = makeStyles(theme => ({
	root: {},
	delete: {
		background: theme.palette.error.main,
		color: theme.palette.getContrastText(theme.palette.error.main),
		'&:hover': {
			background: theme.palette.error.main
		}
	}
}))

const ContextMenu = props => {
	const { _id, approveDialogRef } = props
	const classes = useContextMenuStyles()
	const [anchorEl, setAnchorEl] = React.useState(null)
	const dispatch = useDispatch()
	const { path, url } = useRouteMatch()
	const history = useHistory()

	const handleDelete = () => {
		dispatch(deleteStudent(_id)).then(() => setAnchorEl(null))
	}

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div>
			<IconButton
				aria-label="actions"
				aria-controls="context-menu"
				aria-haspopup="true"
				onClick={handleClick}
				size="small"
			>
				<MoreVertIcon fontSize="small" />
			</IconButton>

			<Menu
				id="context-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem
					dense
					onClick={() => history.push(`${path}/${_id}/edit`)}
				>
					Edit
				</MenuItem>
				<MenuItem
					dense
					onClick={() => approveDialogRef.current.showDialog(_id)}
				>
					Approve
				</MenuItem>
				<MenuItem
					dense
					onClick={handleDelete}
					className={classes.delete}
				>
					Delete
				</MenuItem>
			</Menu>
		</div>
	)
}

ContextMenu.propTypes = {
	// numSelected: PropTypes.number.isRequired,
}

const RowSkeleton = () => {
	return (
		<TableRow>
			<TableCell padding="checkbox">
				<Skeleton />
			</TableCell>
			<TableCell></TableCell>
			{headCells.map((cell, idx) => (
				<TableCell key={idx}>
					<Skeleton />
				</TableCell>
			))}
		</TableRow>
	)
}

const useRowStyles = makeStyles({
	// root: {
	// 	'& > *': {
	// 		borderBottom: 'unset'
	// 	}
	// },
	link: {
		textDecoration: 'none'
	}
})

const Row = props => {
	const {
		row,
		isItemSelected,
		labelId,
		handleClick,
		numSelected,
		approveDialogRef,
		deleteDialogRef
	} = props
	const [open, setOpen] = React.useState(false)
	const classes = useRowStyles()
	const { path, url } = useRouteMatch()

	return (
		<TableRow
			hover
			// onClick={event => handleClick(event, row.regNo)}
			role="checkbox"
			aria-checked={isItemSelected}
			tabIndex={-1}
			key={row._id} // unique key
			selected={isItemSelected}
			className={classes.root}
		>
			<TableCell padding="checkbox">
				<Checkbox
					checked={isItemSelected}
					inputProps={{ 'aria-labelledby': labelId }}
					size="small"
					onClick={event => handleClick(event, row._id)}
				/>
			</TableCell>
			<TableCell>
				<IconButton
					aria-label="expand row"
					size="small"
					onClick={e => {
						e.preventDefault()
						setOpen(!open)
					}}
				>
					{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
				</IconButton>
			</TableCell>
			<TableCell
				id={labelId}
				scope="row"
				padding="none"
				component={Link}
				to={`${path}/${row._id}`}
				className={classes.link}
			>
				{row.regNo}
			</TableCell>
			<TableCell
				align="left"
				component={Link}
				to={`${path}/${row._id}`}
				className={classes.link}
			>
				{row.nic}
			</TableCell>
			<Tooltip title={row.fullName}>
				<TableCell
					align="left"
					component={Link}
					to={`${path}/${row._id}`}
					className={classes.link}
				>
					{row.nameWithInitials}
				</TableCell>
			</Tooltip>
			<TableCell
				align="left"
				component={Link}
				to={`${path}/${row._id}`}
				className={classes.link}
			>
				{row.course}
			</TableCell>
			<TableCell
				align="left"
				component={Link}
				to={`${path}/${row._id}`}
				className={classes.link}
			>
				<Chip
					size="small"
					color={row.isValidCandidate ? 'secondary' : 'primary'}
					label={row.isValidCandidate ? 'Valid' : 'Not valid'}
				/>
			</TableCell>
			<TableCell
				align="right"
				component={Link}
				to={`${path}/${row._id}`}
				className={classes.link}
			>
				{row.netIncome}
			</TableCell>
			{numSelected > 0 ? null : (
				<TableCell align="right">
					<ContextMenu
						_id={row._id}
						approveDialogRef={approveDialogRef}
						deleteDialogRef={deleteDialogRef}
					/>
				</TableCell>
			)}
		</TableRow>
	)
}

const useStyles = makeStyles(theme => ({
	table: {
		minWidth: 750
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1
	}
}))

function Table(props) {
	const { data, isLoading } = props
	const classes = useStyles()
	const [order, setOrder] = React.useState('asc')
	const [orderBy, setOrderBy] = React.useState('grossIncome')
	const [selected, setSelected] = React.useState([])
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(10)
	const [query, setQuery] = React.useState('')
	const approveDialogRef = useRef(null)
	const deleteDialogRef = useRef(null)

	const fuse = new Fuse(data, {
		threshold: 0.4,
		keys: [
			'nic',
			'regNo',
			'fullName',
			'nameWithInitials',
			'course',
			'netIncome'
		]
	})

	const rows = query ? fuse.search(query).map(x => x.item) : data

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			const newSelecteds = rows.map(n => n._id)
			setSelected(newSelecteds)
			return
		}
		setSelected([])
	}

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1))
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			)
		}

		setSelected(newSelected)
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const handleQueryChange = event => {
		setQuery(event.target.value)
	}

	const isSelected = name => selected.indexOf(name) !== -1

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

	return (
		<React.Fragment>
			<TableToolbar
				numSelected={selected.length}
				approveDialogRef={approveDialogRef}
				deleteDialogRef={deleteDialogRef}
				selected={selected}
				setSelected={setSelected}
				onQueryChange={handleQueryChange}
			/>
			<TableContainer>
				<MuiTable
					className={classes.table}
					aria-labelledby="tableTitle"
					size="small"
					aria-label="enhanced table"
				>
					<TableHead
						classes={classes}
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={rows.length}
						numSelected={selected.length}
					/>
					<TableBody>
						{isLoading
							? [...Array(rowsPerPage)].map((x, i) => (
									<RowSkeleton key={i} />
							  ))
							: stableSort(rows, getComparator(order, orderBy))
									.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
									)
									.map((row, index) => {
										const isItemSelected = isSelected(
											row._id
										)
										const labelId = `enhanced-table-checkbox-${index}`

										return (
											<Row
												row={row}
												labelId={labelId}
												isItemSelected={isItemSelected}
												handleClick={handleClick}
												numSelected={selected.length}
												approveDialogRef={
													approveDialogRef
												}
												deleteDialogRef={
													deleteDialogRef
												}
											/>
										)
									})}
						{/* {emptyRows > 0 && (
							<TableRow style={{ height: (false ? 33 : 53) * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)} */}
					</TableBody>
				</MuiTable>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 30, 50]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
			<Dialog.ApproveStudent ref={approveDialogRef} />
			<Dialog.DeleteStudent ref={deleteDialogRef} />
		</React.Fragment>
	)
}

const mapStateToProps = state => ({
	data: state.students.data.filter(x => x.isApproved === false),
	isLoading: state.students.isLoading
})

const useTableTopHeaderStyles = makeStyles(theme => ({
	title: {
		flex: '1 1 100%'
	}
}))

const TableTopHeader = props => {
	const { onQueryChange, title, subtitle = '' } = props
	const classes = useTableTopHeaderStyles()

	return (
		<Toolbar disableGutters>
			<Typography
				variant="h6"
				color="primary"
				className={classes.title}
				gutterBottom
			>
				{title}
				<Typography
					variant="body2"
					component="div"
					color="textSecondary"
					className={classes.title}
					gutterBottom
				>
					{subtitle}
				</Typography>
			</Typography>
			<TableSearch onQueryChange={onQueryChange} />
		</Toolbar>
	)
}

TableTopHeader.propTypes = {
	onQueryChange: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string
}

export default connect(mapStateToProps)(Table)
