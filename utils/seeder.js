const data = [
	{
		regNo: '2017/CSC/045',
		nic: '961803420v',
		title: 'Mr',
		nameWithInitials: 'Z. M. Ardil',
		fullName: 'Zahir Mohamed Ardil',
		street: '334/1 Madawala road',
		city: 'Katugastota',
		district: 'Kandy',
		gsDivision: 'Pathadumbara',
		alDistrict: 'Kandy',
		phone: '0718417181',
		email: 'btzardil@gmail.com',
		course: 'Computer Science',
		zScore: '1.9',
		employed: false,
		employment: {
			establishment: '',
			address: {
				street: '',
				city: '',
				district: ''
			},
			designation: '',
			salary: '',
			dateOfEmployment: ''
		},

		married: false,
		spouse: {
			name: '',
			dateOfMarriage: '',
			employment: {
				establishment: '',
				designation: '',
				salary: '',
				dateOfEmployment: new Date()
			}
		},

		father: {
			name: 'John Doe',
			living: true,
			age: '52',
			employment: {
				occupation: 'driving',
				salary: '30000',
				dateOfEmployment: new Date(),
				address: 'KANDY'
			},
			annualIncome: {
				occupationOrPension: '120000',
				houseAndProperty: 'N/A',
				otherSources: 'N/A'
			}
		},

		mother: {
			name: 'Jane Doe',
			living: true,
			age: '47',
			employment: {
				occupation: '',
				salary: '',
				dateOfEmployment: new Date(),
				address: ''
			},
			annualIncome: {
				occupationOrPension: '',
				houseAndProperty: '',
				otherSources: ''
			}
		},

		guardian: {
			name: '',
			age: '',
			address: '',
			post: '',
			annualIncome: {
				salary: '',
				houseAndPropertyOrTemple: ''
			}
		},
		siblingsUnder: true,
		siblingsUnder19: [
			{
				name: 'foo',
				dob: '1998-12-1',
				age: 19,
				instituteOrSchool: 'Josephs College',
				distanceforJafna: ''
			},
			{
				name: 'foo',
				dob: '',
				age: 19,
				instituteOrSchool: 'Josephs College',
				distanceforJafna: ''
			}
		],
		siblingsAt_University: true,
		siblingsAtUniversity: [
			{
				nameofuniversity: 'UNIVERSITY OF KALANI',
				regNo: '2020/SP/50 ',
				course: 'PHYSICAL SCIENCE',
				academicyear: '2020',
				anyscholarship: 'NO'
			},
			{
				nameofuniversity: '',
				regNo: ' ',
				course: '',
				academicyear: '',
				anyscholarship: ''
			}
		],
		otherstate: true,
		incomefromestate: {
			nameOfowner: '',
			relationship: '',
			location: '',
			nameOfcultication: '',
			external: true,
			annualincome: ''
		},
		otherhous: true,
		incomefromHous: {
			nameOfowner: '',
			relationship: '',
			assessmentNo: '',
			no_Of_hhl: '',
			address: '',
			annualincome: '',
			rent: ''
		}
	},

	{
		regNo: '2017/CSC/016',
		nic: '953521156V',
		title: 'Mr',
		nameWithInitials: 'A.G.I.LAKMAL',
		fullName: 'ALUTHGAMARALALAGE ISURU LAKMAL',
		street: 'PULMUDE ROAD BOGASJUNTION',
		city: 'ANURADHAPURA',
		district: 'ANURADHAPURA',
		gsDivision: 'PADAVIYA',
		alDistrict: 'ANURADHAPURA',
		phone: '0719226586',
		email: 'isurulakmal858@gmail.com',
		course: 'Computer Science',
		zScore: '1.96',
		employed: false,
		employment: {
			establishment: '',
			address: {
				street: '',
				city: '',
				district: 'N/A'
			},
			designation: '',
			salary: '',
			dateOfEmployment: '10-03-2020'
		},

		married: false,
		spouse: {
			name: '',
			dateOfMarriage: '10-02-3030',
			employment: {
				establishment: '',
				designation: '',
				salary: '',
				dateOfEmployment: new Date()
			}
		},

		father: {
			name: 'sunil',
			living: true,
			age: '55',
			employment: {
				occupation: 'driving',
				salary: '30000',
				dateOfEmployment: new Date(),
				address: ''
			},
			annualIncome: {
				occupationOrPension: '',
				houseAndProperty: '',
				otherSources: ''
			}
		},

		mother: {
			name: '',
			living: true,
			age: '',
			employment: {
				occupation: '',
				salary: '',
				dateOfEmployment: new Date(),
				address: ''
			},
			annualIncome: {
				occupationOrPension: '',
				houseAndProperty: '',
				otherSources: ''
			}
		},

		guardian: {
			name: '',
			age: '',
			address: '',
			post: '',
			annualIncome: {
				salary: '',
				houseAndPropertyOrTemple: ''
			}
		},
		siblingsUnder: true,
		siblingsUnder19: [
			{
				name: 'foo',
				dob: '',
				age: 19,
				instituteOrSchool: 'Josephs College',
				distanceforJafna: ''
			},
			{
				name: 'foo',
				dob: '',
				age: 19,
				instituteOrSchool: 'Josephs College',
				distanceforJafna: ''
			}
		],
		siblingsAt_University: true,
		siblingsAtUniversity: [
			{
				nameofuniversity: '',
				regNo: ' ',
				course: '',
				academicyear: '',
				anyscholarship: ''
			},
			{
				nameofuniversity: '',
				regNo: ' ',
				course: '',
				academicyear: '',
				anyscholarship: ''
			}
		],
		otherstate: true,
		incomefromestate: {
			nameOfowner: '',
			relationship: '',
			location: '',
			nameOfcultication: '',
			external: true,
			annualincome: ''
		},
		otherhous: true,
		incomefromHous: {
			nameOfowner: '',
			relationship: '',
			assessmentNo: '',
			no_Of_hhl: '',
			address: '',
			annualincome: '',
			rent: ''
		}
	},

	{
		regNo: '2017/CSC/045',
		nic: '961803420v',
		title: 'Mr',
		nameWithInitials: 'Z. M. Ardil',
		fullName: 'Zahir Mohamed Ardil',
		street: '334/1 Madawala road',
		city: 'Katugastota',
		district: 'Kandy',
		gsDivision: 'Pathadumbara',
		alDistrict: 'Kandy',
		phone: '0718417181',
		email: 'btzardil@gmail.com',
		course: 'Computer Science',
		zScore: '1.9',
		employed: false,
		employment: {
			establishment: '',
			address: {
				street: '',
				city: '',
				district: 'N/A'
			},
			designation: '',
			salary: '',
			dateOfEmployment: '10-03-2020'
		},

		married: false,
		spouse: {
			name: '',
			dateOfMarriage: '10-02-3030',
			employment: {
				establishment: '',
				designation: '',
				salary: '',
				dateOfEmployment: new Date()
			}
		},

		father: {
			name: 'sunil',
			living: true,
			age: '55',
			employment: {
				occupation: 'driving',
				salary: '30000',
				dateOfEmployment: new Date(),
				address: ''
			},
			annualIncome: {
				occupationOrPension: '',
				houseAndProperty: '',
				otherSources: ''
			}
		},

		mother: {
			name: '',
			living: true,
			age: '',
			employment: {
				occupation: '',
				salary: '',
				dateOfEmployment: new Date(),
				address: ''
			},
			annualIncome: {
				occupationOrPension: '',
				houseAndProperty: '',
				otherSources: ''
			}
		},

		guardian: {
			name: '',
			age: '',
			address: '',
			post: '',
			annualIncome: {
				salary: '',
				houseAndPropertyOrTemple: ''
			}
		},
		siblingsUnder: true,
		siblingsUnder19: [
			{
				name: 'foo',
				dob: '',
				age: 19,
				instituteOrSchool: 'Josephs College',
				distanceforJafna: ''
			},
			{
				name: 'foo',
				dob: '',
				age: 19,
				instituteOrSchool: 'Josephs College',
				distanceforJafna: ''
			}
		],
		siblingsAt_University: true,
		siblingsAtUniversity: [
			{
				nameofuniversity: '',
				regNo: ' ',
				course: '',
				academicyear: '',
				anyscholarship: ''
			},
			{
				nameofuniversity: '',
				regNo: ' ',
				course: '',
				academicyear: '',
				anyscholarship: ''
			}
		],
		otherstate: true,
		incomefromestate: {
			nameOfowner: '',
			relationship: '',
			location: '',
			nameOfcultication: '',
			external: true,
			annualincome: ''
		},
		otherhous: true,
		incomefromHous: {
			nameOfowner: '',
			relationship: '',
			assessmentNo: '',
			no_Of_hhl: '',
			address: '',
			annualincome: '',
			rent: ''
		}
	},

	{
		regNo: '2017/CSC/045',
		nic: '961803420v',
		title: 'Mr',
		nameWithInitials: 'Z. M. Ardil',
		fullName: 'Zahir Mohamed Ardil',
		street: '334/1 Madawala road',
		city: 'Katugastota',
		district: 'Kandy',
		gsDivision: 'Pathadumbara',
		alDistrict: 'Kandy',
		phone: '0718417181',
		email: 'btzardil@gmail.com',
		course: 'Computer Science',
		zScore: '1.9',
		employed: false,
		employment: {
			establishment: '',
			address: {
				street: '',
				city: '',
				district: 'N/A'
			},
			designation: '',
			salary: '',
			dateOfEmployment: '10-03-2020'
		},

		married: false,
		spouse: {
			name: '',
			dateOfMarriage: '10-02-3030',
			employment: {
				establishment: '',
				designation: '',
				salary: '',
				dateOfEmployment: new Date()
			}
		},

		father: {
			name: 'sunil',
			living: true,
			age: '55',
			employment: {
				occupation: 'driving',
				salary: '30000',
				dateOfEmployment: new Date(),
				address: ''
			},
			annualIncome: {
				occupationOrPension: '',
				houseAndProperty: '',
				otherSources: ''
			}
		},

		mother: {
			name: 'indralatha',
			living: true,
			age: '55',
			employment: {
				occupation: 'no',
				salary: '',
				dateOfEmployment: new Date(),
				address: ''
			},
			annualIncome: {
				occupationOrPension: '',
				houseAndProperty: '',
				otherSources: ''
			}
		},

		guardian: {
			name: '',
			age: '',
			address: '',
			post: '',
			annualIncome: {
				salary: '',
				houseAndPropertyOrTemple: ''
			}
		},
		siblingsUnder: true,
		siblingsUnder19: [
			{
				name: 'ruwan ',
				dob: '2004-1-1',
				age: 16,
				instituteOrSchool: 'mahasen college',
				distanceforJafna: '200'
			},
			{
				name: 'kamal',
				dob: '2008-12-2',
				age: 12,
				instituteOrSchool: 'mahasen college',
				distanceforJafna: '200'
			}
		],
		siblingsAt_University: true,
		siblingsAtUniversity: [
			{
				nameofuniversity: 'university of colombo',
				regNo: '2018/A/012',
				course: 'VISUAL AND ART',
				academicyear: '2018',
				anyscholarship: 'YES'
			},
			{
				nameofuniversity: 'UNIVERSITY OF RUHUNA',
				regNo: '2016/M/045',
				course: 'B-COM',
				academicyear: '2017',
				anyscholarship: 'NO'
			}
		],
		otherstate: true,
		incomefromestate: {
			nameOfowner: '',
			relationship: '',
			location: '',
			nameOfcultication: '',
			external: true,
			annualincome: ''
		},
		otherhous: true,
		incomefromHous: {
			nameOfowner: '',
			relationship: '',
			assessmentNo: '',
			no_Of_hhl: '',
			address: '',
			annualincome: '',
			rent: ''
		}
	},

	{
		regNo: '2018/A/071',
		nic: '982521154V',
		title: 'Miss',
		nameWithInitials: 'S.SEMILAA',
		fullName: 'SARANGA SEMILAA',
		street: 'NO-45,COLOMBO',
		city: 'COLOMBO',
		district: 'COLOMBO',
		gsDivision: 'PaNADURA',
		alDistrict: 'COLOMBO',
		phone: '078542624',
		email: 'dcdvdvnv@gmail.com',
		course: 'ART AND VISUAL',
		zScore: '3.1',
		employed: true,
		employment: {
			establishment: '2017-11-02',
			address: {
				street: 'COLOMBO RAILWAY',
				city: 'COLOMBO',
				district: 'COLOMBO'
			},
			designation: 'RAIL MASTER',
			salary: '30000',
			dateOfEmployment: '10-03-2017'
		},

		married: TRUE,
		spouse: {
			name: 'A.I.DESHAN',
			dateOfMarriage: '10-02-2016',
			employment: {
				establishment: '',
				designation: '',
				salary: '',
				dateOfEmployment: new Date()
			}
		},

		father: {
			name: 'KAMAL',
			living: false,
			age: '45',
			employment: {
				occupation: ' ',
				salary: ' ',
				dateOfEmployment: new Date(),
				address: ''
			},
			annualIncome: {
				occupationOrPension: '',
				houseAndProperty: '',
				otherSources: ''
			}
		},

		mother: {
			name: 'G.S.FALEN',
			living: true,
			age: '45',
			employment: {
				occupation: 'TRACHER',
				salary: '45000',
				dateOfEmployment: new Date(),
				address: 'KURUNAGALA UYANDANA'
			},
			annualIncome: {
				occupationOrPension: '',
				houseAndProperty: '',
				otherSources: ''
			}
		},

		guardian: {
			name: '',
			age: '',
			address: '',
			post: '',
			annualIncome: {
				salary: '',
				houseAndPropertyOrTemple: ''
			}
		},
		siblingsUnder: true,
		siblingsUnder19: [
			{
				name: 'DEVID',
				dob: '20-5-2005',
				age: 16,
				instituteOrSchool: 'MALIYADEWA COLLAGE',
				distanceforJafna: '450'
			}
		],
		siblingsAt_University: false,
		siblingsAtUniversity: [
			{
				nameofuniversity: '',
				regNo: ' ',
				course: '',
				academicyear: '',
				anyscholarship: ''
			},
			{
				nameofuniversity: '',
				regNo: ' ',
				course: '',
				academicyear: '',
				anyscholarship: ''
			}
		],
		otherstate: true,
		incomefromestate: {
			nameOfowner: 'KEVIN',
			relationship: 'BROTHER',
			location: 'KANDY',
			nameOfcultication: 'TEA',
			external: true,
			annualincome: '20000'
		},
		otherhous: true,
		incomefromHous: {
			nameOfowner: 'KEVIN',
			relationship: 'BROTHER',
			assessmentNo: '255',
			no_Of_hhl: '56',
			address: 'KULIYAPITIYA',
			annualincome: '150000',
			rent: '15000'
		}
	},

	{
		regNo: '2015/T/055',
		nic: '962445528V',
		title: 'MR',
		nameWithInitials: 'DEVID',
		fullName: 'DANIAL DEVID',
		street: 'JAFFNA TOWN',
		city: 'JAFFNA',
		district: 'JAFFNA',
		gsDivision: 'PaLALI',
		alDistrict: 'JAFFNA',
		phone: '0758595254',
		email: 'dcfdvcvff@gmail.com',
		course: 'TECNICAL AUTO MOTIVE',
		zScore: '3.4',
		employed: false,
		employment: {
			establishment: '',
			address: {
				street: '',
				city: '',
				district: 'N/A'
			},
			designation: '',
			salary: '',
			dateOfEmployment: '10-03-2020'
		},

		married: false,
		spouse: {
			name: '',
			dateOfMarriage: '10-02-3030',
			employment: {
				establishment: '',
				designation: '',
				salary: '',
				dateOfEmployment: new Date()
			}
		},

		father: {
			name: 'VILLIAM',
			living: false,
			age: '',
			employment: {
				occupation: '',
				salary: '',
				dateOfEmployment: new Date(),
				address: ''
			},
			annualIncome: {
				occupationOrPension: '',
				houseAndProperty: '',
				otherSources: ''
			}
		},

		mother: {
			name: 'KARINA',
			living: false,
			age: '',
			employment: {
				occupation: '',
				salary: '',
				dateOfEmployment: new Date(),
				address: ''
			},
			annualIncome: {
				occupationOrPension: '',
				houseAndProperty: '',
				otherSources: ''
			}
		},

		guardian: {
			name: 'SHERBINA KALVIN',
			age: '50',
			address: 'NEGOMBO',
			post: 'MARAVILA',
			annualIncome: {
				salary: '40000',
				houseAndPropertyOrTemple: '1000'
			}
		},
		siblingsUnder: false,
		siblingsUnder19: [
			{
				name: '',
				dob: '',
				age: '',
				instituteOrSchool: ' ',
				distanceforJafna: ''
			},
			{
				name: '',
				dob: '',
				age: '',
				instituteOrSchool: ' ',
				distanceforJafna: ''
			}
		],
		siblingsAt_University: true,
		siblingsAtUniversity: [
			{
				nameofuniversity: '',
				regNo: ' ',
				course: '',
				academicyear: '',
				anyscholarship: ''
			},
			{
				nameofuniversity: '',
				regNo: ' ',
				course: '',
				academicyear: '',
				anyscholarship: ''
			}
		],
		otherstate: true,
		incomefromestate: {
			nameOfowner: '',
			relationship: '',
			location: '',
			nameOfcultication: '',
			external: true,
			annualincome: ''
		},
		otherhous: true,
		incomefromHous: {
			nameOfowner: '',
			relationship: '',
			assessmentNo: '',
			no_Of_hhl: '',
			address: '',
			annualincome: '',
			rent: ''
		}
	}
]
