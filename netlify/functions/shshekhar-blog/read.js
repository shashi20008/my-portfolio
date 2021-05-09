/* Import faunaDB sdk */
const process = require('process')

const { query, Client } = require('faunadb');
const { response, mapBlogPost } = require('./helpers');

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

const handler = async (event) => {
  const { id } = event;

  try {
    const resp = await client.query(
      query.Get(
        query.Ref(query.Collection('blog_posts'), id)
      )
    );

    if (resp.data.bodyRef) {
      resp.data.body = (await client.query(query.Get(resp.data.bodyRef))).data.markdown;
      resp.data.bodyRef = undefined;
    }

    return response(200, mapBlogPost(resp));
  }
  catch (error) {
    console.log('error', error.stack || error);
    return response(400, null, 'READ_FAILED', 'Post not found.');
  }
}

module.exports = { handler }
