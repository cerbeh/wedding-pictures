const router = require('express').Router();
const { google } = require('googleapis');
const prismic = require('prismic.io');

const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_API_KEY })

router.get('/credits', async (req, res, next) => {
  const credits = await sheets.spreadsheets.values.get({
    spreadsheetId: '1JwCCKZDKN9lX3t6BPmpTpiWVypbv5fYw6bgGcj9Z3C4',
    range: 'AK47!A1:H10'
  },
  (err, res) => {
    if (err) res.json({ error: 'Something went wrong getting credits from google sheets' })
    return res.data.values
  })

  res.json(credits)
})

router.get('/prismic-cms', async (req, res) => {
  const api = await prismic.api(process.env.PRISMIC_ENDPOINT, { req })
  const credit = await api.query(
    prismic.Predicates.at('document.type', 'credits')
  ).catch(e => res.json(e))
  res.json(credit)
})

module.exports = router