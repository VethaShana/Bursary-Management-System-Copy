import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Label,
	ResponsiveContainer,
	Tooltip,
	Legend,
} from 'recharts'
import { Typography } from '@material-ui/core'

// Generate Sales Data
function createData(year, amount) {
	return { year, amount }
}

const data = [
	createData('2016', 0),
	createData('2017', 300),
	createData('2018', 600),
	createData('2019', 800),
	createData('2020', 1500),
	createData('2021', 2000),
	createData('2022', undefined),
]

export default function Chart() {
	const theme = useTheme()

	return (
		<React.Fragment>
			<Typography component='h2' variant='h6' color='primary' gutterBottom>
				Students
			</Typography>
			<ResponsiveContainer>
				<LineChart
					data={data}
					margin={{
						top: 16,
						right: 16,
						bottom: 0,
						left: 24,
					}}
				>
					<XAxis dataKey='year' stroke={theme.palette.text.secondary} />
					<YAxis stroke={theme.palette.text.secondary}>
						<Label
							angle={270}
							position='left'
							style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
						>
							Enrolled Students
						</Label>
					</YAxis>
					<Line
						type='monotone'
						dataKey='amount'
						stroke={theme.palette.primary.main}
						dot={false}
					/>
					<Tooltip />
				</LineChart>
			</ResponsiveContainer>
		</React.Fragment>
	)
}
