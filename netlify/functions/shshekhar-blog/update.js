/* Import faunaDB sdk */
const process = require('process')

const { query, Client } = require('faunadb');
const { response, mapBlogPost } = require('./helpers');

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

const handler = async (event) => {
  const data = event.body;
  const { id } = event;

  try {
    const resp = await client.query(query.Update(query.Ref(query.Collection('blog_posts'), id), { data }))
    return response(200, mapBlogPost(resp));
  }
  catch (error) {
    console.log('error', error.stack || error);
    return response(400, null, 'UPDATE_FAILED', 'An unknown error occured.');
  }
}

module.exports = { handler }
