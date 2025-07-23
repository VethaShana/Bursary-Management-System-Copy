import React, { useState } from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import MuiDivider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Link, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { approveStudent } from '../../../actions/students'

import { useSelector } from 'react-redux'

function StudentInfo(props) {
	const { id, edit } = props
	const { path, url } = useRouteMatch()
	const data = useSelector(state =>
		state.students.data.find(({ _id }) => _id === id)
	)
	const dispatch = useDispatch()

	if (data)
		return (
			<Grid container spacing={4} style={{ padding: '32px 8px' }}>
				<Grid item container xs={12} justify="space-between">
					<Grid item>
						<Typography variant="button" color="textSecondary">
							Details
						</Typography>
						<Typography variant="h5" gutterBottom>
							{`${data.title} ${data.fullName}`}
						</Typography>
					</Grid>
					{edit && (
						<Grid item>
							<Button
								variant="button"
								component={Link}
								to={`${path}/edit`}
								color="secondary"
							>
								Edit
							</Button>
							<Button
								variant="contained"
								component={Link}
								onClick={() => dispatch(approveStudent(id))}
								color="secondary"
								style={{ marginLeft: '8px' }}
							>
								Approve
							</Button>
						</Grid>
					)}
				</Grid>
				<Section>
					<SectionTitle>Identification</SectionTitle>
					<SectionContent>
						<SectionData value={data.regNo}>
							Registration No.
						</SectionData>
						<SectionData value={data.nic}>NIC</SectionData>
					</SectionContent>
				</Section>

				<Divider />

				<Section>
					<SectionTitle>Academic Details</SectionTitle>
					<SectionContent>
						<SectionData value={data.faculty}>Faculty</SectionData>
						<SectionData value={data.course}>
							Course of Study
						</SectionData>
						<SectionData value={data.ALIndexNo}>
							A / L Index No.
						</SectionData>
						<SectionData value={data.ALDistrict}>
							A / L Administrative District
						</SectionData>
						<SectionData value={data.zScore}>Z score</SectionData>
					</SectionContent>
				</Section>

				<Divider />

				<Section>
					<SectionTitle>Personal Details</SectionTitle>
					<SectionContent>
						<SectionData value={data.title}>Title</SectionData>
						<SectionData value={data.nameWithInitials}>
							Name with Initials
						</SectionData>
						<SectionData value={data.fullName}>
							Full Name
						</SectionData>
					</SectionContent>
				</Section>

				<Divider />

				<Section>
					<SectionTitle>Address</SectionTitle>
					<SectionContent>
						<SectionData value={data.street}>Street</SectionData>
						<SectionData value={data.city}>City</SectionData>
						<SectionData value={data.district}>
							District
						</SectionData>
						<SectionData value={data.GSDivision}>
							G. S. Division
						</SectionData>
						<SectionData value={data.city}>City</SectionData>
						<SectionData value={data.distance} metric="km">
							Distance to University
						</SectionData>
					</SectionContent>
				</Section>

				<Divider />

				<Section>
					<SectionTitle>Contact</SectionTitle>
					<SectionContent>
						<SectionData value={data.email}>Email</SectionData>
						<SectionData value={data.phone}>Phone</SectionData>
					</SectionContent>
				</Section>

				<Divider />

				{data.employed && data.employment && (
					<React.Fragment>
						<Section>
							<SectionTitle>Employment Details</SectionTitle>
							<SectionContent>
								<SectionData
									value={data.employment.designation}
								>
									Designation
								</SectionData>
								<SectionData
									value={data.employment.address.street}
								>
									Street
								</SectionData>
								<SectionData
									value={data.employment.address.city}
								>
									City
								</SectionData>
							</SectionContent>
						</Section>
						<Divider />
					</React.Fragment>
				)}

				<Section>
					<SectionTitle>Contact</SectionTitle>
					<SectionContent>
						<SectionData value={data.email}>Email</SectionData>
						<SectionData value={data.phone}>Phone</SectionData>
					</SectionContent>
				</Section>

				<Divider />
			</Grid>
		)

	return (
		<Grid container spacing={12}>
			<Typography>No student Found</Typography>
		</Grid>
	)
}

const Divider = props => {
	const { children } = props
	return (
		<Grid item xs={12}>
			<MuiDivider variant="fullWidh" />
		</Grid>
	)
}

const Section = props => {
	const { children, data } = props
	return <React.Fragment>{children}</React.Fragment>
}

const SectionTitle = props => {
	const { children } = props
	return (
		<Grid item md={3}>
			<Typography variant="h6" color="initial" gutterBottom>
				{children}
			</Typography>
		</Grid>
	)
}

const SectionContent = props => {
	const { children } = props
	return (
		<Grid container item md={9}>
			<Grid container spacing={3}>
				{children}
			</Grid>
		</Grid>
	)
}

const SectionData = props => {
	const { children, value, metric } = props
	return (
		<Grid item>
			<Typography variant="body2" color="textSecondary">
				{children}
			</Typography>
			<Typography variant="body1" color="initial">
				{value ? value : 'N/A'}
				{metric && (
					<Typography
						variant="caption"
						component="span"
						color="textSecondary"
					>
						&nbsp;
						{metric ? metric : 'Units'}
					</Typography>
				)}
			</Typography>
		</Grid>
	)
}

export default StudentInfo
