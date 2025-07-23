import * as yup from 'yup'
export default ({ schema, path = 'query' }) =>
	async (req, res, next) => {
		try {
			const validData = await schema.validate(req[path])
			req.validData = validData
			return next()
		} catch (error) {
			return res.status(400).json({ error })
		}
	}
