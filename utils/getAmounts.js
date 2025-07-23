import Student from '../models/student.js'
export default data => {
	const {
		married,
		spouse: {
			employment: { salary: spouseSalary }
		},
		siblingsUnder19,
		siblingsAtUniversity,
		father,
		mother,
		guardian
	} = data

	const siblingUnder19Fund = 10 // to be changed
	const siblingAtUniversityFund = 10 // to be changed

	let netAmount = 0
	let capAmount = 10000 // to be changed

	// check marriage status
	if (married) netAmount += parseInt(spouseSalary)

	// check guardian
	if (guardian && guardian.annualIncome) {
		const { salary = 0, houseAndPropertyOrTemple = 0 } =
			guardian.annualIncome
		netAmount += salary + houseAndPropertyOrTemple
	} else {
		// check father
		{
			const {
				occupationOrPension = 0,
				houseAndProperty = 0,
				otherSources = 0
			} = father.annualIncome
			netAmount =
				father && father.living
					? parseInt(occupationOrPension) +
					  parseInt(houseAndProperty) +
					  parseInt(otherSources) +
					  netAmount
					: netAmount
		}
		{
			const {
				occupationOrPension = 0,
				houseAndProperty = 0,
				otherSources = 0
			} = mother.annualIncome
			netAmount =
				mother && mother.living
					? parseInt(occupationOrPension) +
					  parseInt(houseAndProperty) +
					  parseInt(otherSources) +
					  netAmount
					: netAmount
		}
	}

	/**
	 * calculations for cap Amount
	 */

	// check siblings
	if (siblingsUnder19 && siblingsUnder19.length > 0)
		capAmount +=
			siblingUnder19Fund *
			(siblingsUnder19.length <= 3 ? siblingsUnder19.length : 3)

	// check siblings at university
	if (siblingsAtUniversity && siblingsAtUniversity.length > 0) {
		const siblingsNotRecipientOfMahapolaOrBursary =
			siblingsAtUniversity.filter(
				({ mahapolaOrBursary }) => mahapolaOrBursary === false
			)

		//if maximum is thrice
		capAmount +=
			siblingAtUniversityFund *
			(siblingsNotRecipientOfMahapolaOrBursary.length <= 3
				? siblingsNotRecipientOfMahapolaOrBursary.length
				: 3)

		//else
		// capAmount +=
		//   siblingAtUniversityFund * siblingsRecipientOfMahapolaOrBursary.length;
	}

	return [netAmount, capAmount]

	// var data = Student.req.body
	// const query_married = data.find([
	// 	fullName,
	// 	nic,
	// 	{ married: { annual_income } },
	// 	{ propeincomefromEstate_Fields_Lands: { annual_income } },
	// 	{ incomefromHouses: { annual_income } },
	// ])

	// const query_guardian = data.student.find([
	// 	fullName,
	// 	nic,
	// 	{ parentsDetails: { guardian: { guardianAnnualIncome } } },
	// 	{ propeincomefromEstate_Fields_Lands: { annual_income } },
	// 	{ incomefromHouses: { annual_income } },
	// ])

	// const query_parents = data.student.find([
	// 	fullName,
	// 	nic,
	// 	{
	// 		parentsDetails: {
	// 			father: { fatherTotalAnnualIncome },
	// 			mother: { motherTotalAnnualIncome },
	// 		},
	// 	},
	// 	{ propeincomefromEstate_Fields_Lands: { annual_income } },
	// 	{ incomefromHouses: { annual_income } },
	// ])

	// const noOfSibb = data.student.find(nic, {
	// 	$count: { siblingsUniversity: [regNo] },
	// })

	// const noOfSib = data.student.find(nic, {
	// 	$count: { siblingsUnder19: [namesb] },
	// })

	// db.student.aggregate([
	// 	{
	// 		salaryA: {
	// 			$sum: {
	// 				parentsDetails: {
	// 					father: { fatherTotalAnnualIncome },
	// 					mother: { motherTotalAnnualIncome },
	// 				},
	// 			},
	// 			propeincomefromEstate_Fields_Lands: { annual_income },
	// 			incomefromHouses: { annual_income },
	// 		},
	// 	},
	// ])

	// db.student.aggregate([
	// 	{
	// 		salaryB: {
	// 			$sum: { parentsDetails: { guardian: { guardianAnnualIncome } } },
	// 			propeincomefromEstate_Fields_Lands: { annual_income },
	// 			incomefromHouses: { annual_income },
	// 		},
	// 	},
	// ])

	// db.student.aggregate([
	// 	{
	// 		salaryC: {
	// 			$sum: { married: { $multiply: [{ spouseMonthlySalary }, 12] } },
	// 		},
	// 		propeincomefromEstate_Fields_Lands: { annual_income },
	// 		incomefromHouses: { annual_income },
	// 	},
	// ])

	// connection.query(query_married, function (error, result) {
	// 	console.log(result)
	// 	res.send(result)
	// })
}
