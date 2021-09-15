import fetch from 'node-fetch'
import express from 'express'
import cors from 'cors'

const app = express()
const port = 5001

function extractApiRoute(req) {
  return `${req.params['0']}?${new URLSearchParams(req.query).toString()}`
}

function getAccessToken(clientId, clientSecret) {
  const encodedData = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  return fetch('https://oauth.brightcove.com/v4/access_token', {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      'Authorization': `Basic ${ encodedData }`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((response) => response.json())
}

app.use(cors({
  origin: process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : 'https://gucciogucci.github.io',
  methods: 'GET'
}))

app.get('/proxy/*', async (req, res) => {

  const { access_token, token_type } = await getAccessToken(process.env.BRIGHTCOVE_CLIENT_ID, process.env.BRIGHTCOVE_CLIENT_SECRET)

  const response = await fetch(
    `https://cms.api.brightcove.com/v1/accounts/${ process.env.BRIGHTCOVE_ACCOUNT_ID }/${ extractApiRoute(req) }`, {
      headers: {
        'Authorization': `${ token_type } ${ access_token }`
      }
    }
  )

  res.json(await response.json())
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})