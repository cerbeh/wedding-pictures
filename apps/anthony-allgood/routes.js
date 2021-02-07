const router = require('express').Router();
const prismic = require('prismic.io');
const { getWorkingCredits, formatCredits } = require('./credits/get-working-credit');

router.get('/credits', getWorkingCredits, formatCredits);

router.get('/prismic-cms', async (req, res) => {
  const api = await prismic.api(process.env.PRISMIC_ENDPOINT, { req })
  const credit = await api.query(
    prismic.Predicates.at('document.type', 'credits')
  ).catch(e => res.json(e))
  res.json(credit)
})

module.exports = router