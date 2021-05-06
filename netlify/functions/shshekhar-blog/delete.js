/* Import faunaDB sdk */
const process = require('process')

const { query, Client } = require('faunadb');
const { response } = require('./helpers');

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

const handler = async (event) => {
  const { id } = event;

  try {
    const resp = await client.query(query.Delete(query.Ref(query.Collection('blog_posts'), id)))
    return response(200, null, 'ACCEPTED', 'Deleted.');
  }
  catch (error) {
    console.log('error', error.stack || error);
    return response(400, null, 'DELETE_FAILED', 'An unknown error occured.');
  }
}

module.exports = { handler }
