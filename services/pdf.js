import moment from 'moment'
import header from './layout/header.js'
import stuD from './layout/stuD.js'
import office from './layout/OfficeUse.js'
import instruction from './layout/Instruction.js'
import instruction2 from './layout/Instruction2.js'
import Father from './layout/Father.js'
import Mother from './layout/Mother.js'
import employee from './layout/Empolyee.js'
import marriage from './layout/marriage.js'
import footer from './layout/Footer.js'
import footer2 from './layout/Footer2.js'
import guard from './layout/guard.js'
import { boolean } from 'yup'

const applicationDocDefinition = data => {
	const {
		fullName,
		title,
		married,
		siblingsAtUniversity = [],
		siblingsUnder19 = [],
		incomeFromEstateFieldsLands = [],
		incomeFromHouses = [],
		employed,
		father,
		mother,
		isLivingWithGuardian,
		guardian,
		deadline
	} = data

	const table = (theads, data) => {
		if (data.length > 0) {
			return {
				headerRows: 1,
				widths: theads.map(({ width = 'auto' }) => width),
				// widths: theads.map(thead => thead.width),
				body: [
					theads.map(({ text }) => text),
					...data.map(x =>
						Object.values(x).map((y, idx) => {
							if (typeof y === 'boolean') {
								console.log(typeof y === 'boolean', y)
								return y ? 'Yes' : 'No'
							} else return y ? y : 'None'
						})
					)
				]
			}
		} else {
			return {
				headerRows: 1,
				// widths: theads.map(({width = 'auto'}) => width),
				widths: theads.map(thead => 'auto'),
				body: [
					theads.map(({ text }) => text),
					theads.map(thead => 'None')
				]
			}
		}
	}

	return {
		pageMargins: [60, 60, 60, 60],

		footer: function (currentPage, pageCount) {
			return {
				margin: 10,
				columns: [
					{
						fontSize: 9,
						text: [
							{
								text:
									'------------------------------------------------------------------------' +
									'\n',
								margin: [0, 20]
							},
							{
								text:
									'© University of Jaffna, SriLanka. ' +
									currentPage.toString() +
									' of ' +
									pageCount
							}
						],
						alignment: 'center'
					}
				]
			}
		},

		content: [
			...header,
			{
				alignment: 'justify',

				table: {
					widths: [200, 100],
					body: [
						[
							{
								text: 'Student registration No. :',
								fontSize: 15
							},
							{ text: `${data.regNo ? data.regNo : 'None'}` }
						]
					]
				}
			},
			{
				columns: [
					...stuD,
					[
						{ text: '\n\n' },
						{ text: `\n${title}${fullName}` },
						{
							text: `\n${data.address.street}, ${data.address.city}, ${data.address.district} `
						},
						{ text: '\n' },
						{
							text: `\n${
								data.address.GSDivision
									? data.address.GSDivision
									: 'None'
							}`
						},
						{
							text: `\n${
								data.address.DSDivision
									? data.address.DSDivision
									: 'None'
							}`
						},
						{ text: `\n${data.address.district}` },
						{ text: `\n${data.phone}` },
						{ text: `\n\n${data.ALDistrict}` },
						{
							text: `\n${
								data.ALIndexNo ? data.ALIndexNo : 'None'
							}`
						},
						{ text: `\n${data.zScore}` },
						{ text: `\n\n${data.course}` },
						{ text: `\n${data.nic}` }
					]
				]
			},
			...office,
			...instruction,
			{
				alignment: 'Justify',
				text: `\n3. The application should be duly perfected and hande over to Grama Seveka, so as to reach this office before ..${deadline}.. the Grama Seveka will forward the application to the DS as specified in cage 11. As the application has to be returned by registered post and an envelope of 9" x 4" in size with stamps to the appropriate value pasted should be handed over to the Grama Sevaka along with the application. Tha words "Bursary Application" should be indicated on the left hand top corner of the envelop. This application should not be handed over to this office personally under any circumstances.\n`
			},
			...instruction2,

			{ text: '2. Family Details:', bold: 'true' },
			{
				text: ' \nA.  state details of school going bothers, sisters / Rev.brothers/children, if married who are 19 years or under, you should prepared to produce birth certificate if necessary.\n\n'
			},
			{
				layout: 'lightHorizontalLines', // optional
				table: table(
					[
						{ text: 'Name' },
						{ text: 'Date of Birth' },
						{ text: 'Age' },
						{ text: 'School/Institute' }
					],
					data.siblingsUnder19
				)
			},
			{
				text: `\nB. Distance from the student\'s permanent residence to the University of Jaffna(k.m) : ${data.address.distance} km`,
				pageBreak: 'after'
			},
			{
				text: '\nC. If you have any brother or sisters following courses of study in a University, or any Campus, Institute of Athletic studies or Institute of Indigenous Medicine , give details:\n\n'
			},
			{
				layout: 'lightHorizontalLines', // optional
				table: table(
					[
						{ text: 'Name' },
						{
							text: 'Reg No.',
							width: 'auto'
						},
						{
							text: 'Name of the Institution',
							width: 'auto'
						},
						{ text: 'Course', width: 'auto' },
						{ text: 'Acadamic Year', width: 'auto' },
						{ text: 'Bursary/Mahapola or not', width: 'auto' }
					],

					data.siblingsAtUniversity
				)
			},
			{
				text: '\n *Reg No. - Registration No of the Higher Education \n * Name of the Institution - Name of the Institution where the course of study is being followed \n * Bursary/Mahapola or not -Whether in receipt of a Mahapola Scholar Scholarship or a Bursary or not.'
			},
			{
				text: '\n3. Income from Estates,Fields,Lands etc.:\n\n',
				bold: 'true'
			},
			{
				layout: 'lightHorizontalLines', // optional
				table: table(
					[
						{ text: 'Owner' },
						{ text: 'Relationship', width: 'auto' },
						{ text: 'Location ', width: 'auto' },
						{ text: 'Nature of Cultivation', width: 'auto' },
						{
							text: 'Extent of Land & Details of Property',
							width: 'auto'
						},
						{ text: 'Annual income', width: 'auto' }
					],

					incomeFromEstateFieldsLands
				)
			},
			{
				text: '\n *Owner - Name of Owner \n * Annual income - Annual income in Rupees '
			},
			{ text: '\n4. Income from the Houses:\n\n', bold: 'true' },
			{
				layout: 'lightHorizontalLines', // optional
				table: table(
					[
						{ text: 'Owner' },
						{ text: 'Relationship', width: 'auto' },
						{ text: 'Assessment No', width: 'auto' },
						{ text: 'House holders', width: 'auto' },
						{ text: 'Address', width: 'auto' },
						{ text: 'Annual income', width: 'auto' },
						{
							text: 'tenant/lease',
							width: 'auto'
						}
					],

					incomeFromHouses
				)
			},
			{
				text: '\n *Owner - Name of Owner \n *tenant/lease-If given on rent/lease names and addresses of tenant/lease \n *House holders - No. of house holders List '
			},
			{
				columns: [
					[
						{
							text: '\n 1. Grama sevaka division number of above  house :'
						},
						{ text: '\n 2.D.S Division :' },
						{ text: '\n 3.Name of the Local Authority :' }
					],
					[
						{
							text: `\n\n${
								data.GSDNo
									? data.GSDNo
									: '..............................................................'
							}`
						},
						{
							text: `\n${
								data.dsDivision
									? data.dsDivision
									: '..............................................................'
							}`
						},
						{
							text: `\n${
								data.LocalAthority
									? data.LocalAthority
									: '..............................................................'
							}`
						}
					]
				],
				pageBreak: 'after'
			},

			{
				columns: [
					employee,
					[
						{ text: '\n' },
						//...employment.map(work => [
						{ text: `\n${employed ? 'Yes' : 'No'}` },
						{
							text: `\n\n${
								employed
									? data.employment.establishment
									: 'None'
							} , Address : ${
								employed ? data.employment.address.street : ''
							}-${
								employed ? data.employment.address.city : 'None'
							}-${
								employed
									? data.employment.address.district
									: '\n\n'
							}`
						},
						{
							text: `\n${
								employed ? data.employment.designation : 'None'
							}`
						},
						{
							text: `\n${
								employed
									? data.employment.salaryScale
									: '..................................................................'
							}`
						},
						{
							text: `\n${
								employed ? data.employment.salary : 'None'
							} ${employed ? 'LKR' : ''}`
						},
						{
							text: `\n${
								employed
									? data.employment.dateOfEmployment
									: 'None'
							}`
						}
						//])
					]
				]
			},
			{
				columns: [
					marriage,
					[
						{ text: `\n\n\n` },
						//{ text: `\n${marriage}` },
						//...spouse.map(marry => [
						{ text: `\n${married ? 'Yes' : 'No'}` },
						{
							text: `\n${
								married ? data.spouse.dateOfMarriage : 'None'
							}`
						},
						{
							text: `\n${married ? data.spouse.name : 'None'}`
						},
						{
							text: `\n\n${
								married
									? data.spouse.employment.establishment
									: 'None'
							}`
						},
						{
							text: `\n${
								married
									? data.spouse.employment.designation
									: 'None'
							}`
						},
						{
							text: `\n\n${
								married ? data.spouse.employment.salary : 'None'
							} ${married ? 'LKR' : ''}`
						}
						//])
					]
				]
			},
			{
				text: '\n\n Details of Parents/Guardians (Applicant forwarding guardians should fill cage 9 in addition)',
				bold: 'true'
			},
			{ text: '\n\n07. Details of Father ', bold: 'true' },
			{
				columns: [
					Father,
					[
						//...father.map(attr => [
						{ text: `\n${father.name}` },
						{
							text: `\n\n\n${
								father.living ? 'Living' : 'Not alive'
							}`
						},
						{ text: `\n${father.age ? father.age : 'None'}` },
						{
							text: `\n\n\n${
								father.living && father.employment.occupation
									? father.employment.occupation
									: 'None'
							}`
						},
						{
							text: `\n\n${
								father.living && father.employment.address
									? father.employment.address
									: 'None'
							}`
						},
						{
							text: `\n\n\n${
								father.living &&
								father.annualIncome.occupationOrPension
									? father.annualIncome.occupationOrPension
									: 'None'
							} ${
								father.annualIncome.occupationOrPension
									? 'LKR'
									: ''
							}`
						},
						{
							text: `\n\n${
								father.annualIncome.houseAndProperty
									? father.annualIncome.houseAndProperty
									: 'None'
							} ${
								father.annualIncome.houseAndProperty
									? 'LKR'
									: ''
							}`
						},
						{
							text: `\n${
								father.annualIncome.otherSources
									? father.annualIncome.otherSources
									: 'None'
							} ${father.annualIncome.otherSources ? 'LKR' : ''}`
						},
						{
							text: `\n${
								father.fatherTotalAnnualIncome
									? father.fatherTotalAnnualIncome
									: 'None'
							} ${father.fatherTotalAnnualIncome ? 'LKR' : ''}`
						}
						//])
					]
				]
			},

			{ text: '\n\n08. Details of Mother ', bold: 'true' },
			{
				columns: [
					Mother,
					[
						//	...mother.map(attr => [
						{ text: `\n${mother.name}` },
						{
							text: `\n\n\n${
								mother.living ? 'Living' : 'Not alive'
							}`
						},
						{ text: `\n${mother.age ? mother.age : 'None'}` },
						{
							text: `\n\n\n${
								mother.living && mother.employment.occupation
									? mother.employment.occupation
									: 'None'
							}`
						},
						{
							text: `\n\n${
								mother.living && mother.employment.address
									? mother.employment.address
									: 'None'
							}`
						},
						{
							text: `\n\n\n${
								mother.annualIncome.occupationOrPension
									? mother.annualIncome.occupationOrPension
									: 'None'
							} ${
								mother.annualIncome.occupationOrPension
									? 'LKR'
									: ''
							}`
						},
						{
							text: `\n\n${
								mother.annualIncome.houseAndProperty
									? mother.annualIncome.houseAndProperty
									: 'None'
							} ${
								mother.annualIncome.houseAndProperty
									? 'LKR'
									: ''
							}`
						},
						{
							text: `\n${
								mother.annualIncome.otherSources
									? mother.annualIncome.otherSources
									: 'None'
							} ${mother.annualIncome.otherSources ? 'LKR' : ''}`
						},
						{
							text: `\n${
								mother.motherTotalAnnualIncome
									? mother.motherTotalAnnualIncome
									: 'None'
							} ${mother.motherTotalAnnualIncome ? 'LKR' : ''}`
						}
						//])
					]
				]
			},

			{
				text: '\nTotal annual income of Father and Mother in words : ',
				bold: 'true'
			},
			{ text: '\n\n\n09. Details of Guardian ', bold: 'true' },
			{
				text: '\nThis cage should filled by orphans or clergy or any other applicant who is under the custody of legal guardian. '
			},
			{
				columns: [
					guard,
					[
						//...guardian.map(attr => [
						{
							text: `\n${
								isLivingWithGuardian ? guardian.name : 'None'
							}`
						},
						{
							text: `\n${
								isLivingWithGuardian ? guardian.address : 'None'
							}`
						},
						{
							text: `\n${
								isLivingWithGuardian ? guardian.post : 'None'
							}`
						},
						{
							text: `\n\n\n\n${
								isLivingWithGuardian
									? guardian.annualIncome.salary
									: 'None'
							} ${isLivingWithGuardian ? 'LKR' : ''}`
						},
						{
							text: `\n\n${
								isLivingWithGuardian
									? guardian.annualIncome
											.houseAndPropertyOrTemple
									: 'None'
							} ${isLivingWithGuardian ? 'LKR' : ''}`
						},
						{
							text: `\n${
								isLivingWithGuardian ? guardian.age : 'None'
							}`
						}
						//	])
					]
				]
			},
			...footer,
			{
				alignment: 'Justify',
				text: `\n3. The D.S having certified the Grama Sevakas signature should forward the application to the following address under registered cover, so as to reach on or before ..${deadline}.. Applicant will hand over an envelope of 9" x 4" in size with stamps to the appropriate value pasted to the Grama Sevaka for this purpose.\n\n`
			},
			...footer2
		],
		styles: {
			header: {
				fontSize: 25,
				bold: true
			},
			bigger: {
				fontSize: 15,
				italics: true
			},
			tableExample: {
				margin: [15, 15, 10, 10]
			},
			tableHeader: {
				bold: true,
				fontSize: 13,
				color: 'black'
			}
		},
		defaultStyle: {
			columnGap: 20
		}
	}
}

export const getDocumentDefinition = (type, data) => {
	switch (type) {
		case 'application':
			return applicationDocDefinition(data)
		default:
			return applicationDocDefinition(data)
	}
}
