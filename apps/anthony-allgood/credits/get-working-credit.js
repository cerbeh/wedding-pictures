const { google } = require('googleapis');

const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_API_KEY })

const getWorkingCredits = (req, res, next) => sheets.spreadsheets.values.get(
  {
    spreadsheetId: '1JwCCKZDKN9lX3t6BPmpTpiWVypbv5fYw6bgGcj9Z3C4',
    range: 'AK47!A1:H10'
  },
  (err, response) => {
    if (err) return res.json({ error: 'Something went wrong getting credits from google sheets' });
    req.credits = response.data.values;
    next();
  }
)

const formatCredits = (req, res, next) => {
  const formattedCredits = creditsArrayToObject(req.credits);
  res.json(formattedCredits);
}

const creditsArrayToObject = ([ headers, ...credits]) => credits.map(credit => credit.reduce((cum, cur, i) => ({ ...cum, [headers[i]]: cur }), {}))

module.exports = { getWorkingCredits, formatCredits };