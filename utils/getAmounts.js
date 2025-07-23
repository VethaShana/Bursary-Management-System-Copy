import Student from '../models/student.js'
export default data => {
	const {
		married,
		spouse: { employment: { salary = 0 } = {} } = {},
		siblingsUnder19 = [],
		siblingsAtUniversity = [],
		father,
		mother,
		guardian
	} = data

	const siblingUnder19Fund = 24000
	const siblingAtUniversityFund = 36000

	let netIncome = 0
	let capIncome = 500000

	if (married) netIncome += parseInt(salary)

	if (guardian && guardian.annualIncome) {
		const { salary = 0, houseAndPropertyOrTemple = 0 } =
			guardian.annualIncome
		netIncome += parseInt(salary) + parseInt(houseAndPropertyOrTemple)
	} else {
		{
			const {
				occupationOrPension = 0,
				houseAndProperty = 0,
				otherSources = 0
			} = father.annualIncome
			netIncome +=
				parseInt(occupationOrPension) +
				parseInt(houseAndProperty) +
				parseInt(otherSources)
		}
		{
			const {
				occupationOrPension = 0,
				houseAndProperty = 0,
				otherSources = 0
			} = mother.annualIncome
			netIncome +=
				parseInt(occupationOrPension) +
				parseInt(houseAndProperty) +
				parseInt(otherSources)
		}
	}

	if (siblingsUnder19)
		capIncome +=
			siblingUnder19Fund *
			(siblingsUnder19.length <= 3 ? siblingsUnder19.length : 3)

	if (siblingsAtUniversity) {
		const siblingsNotRecipientOfMahapolaOrBursary =
			siblingsAtUniversity.filter(
				({ isBursaryOrMahapolaRecipient = false }) =>
					isBursaryOrMahapolaRecipient === false
			)

		capIncome +=
			siblingAtUniversityFund *
			(siblingsNotRecipientOfMahapolaOrBursary.length <= 3
				? siblingsNotRecipientOfMahapolaOrBursary.length
				: 3)

		//else
		// capAmount +=
		//   siblingAtUniversityFund * siblingsRecipientOfMahapolaOrBursary.length;
	}
	return [netIncome, capIncome]
}
