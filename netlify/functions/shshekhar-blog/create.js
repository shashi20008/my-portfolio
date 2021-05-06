const process = require('process');

const { query, Client } = require('faunadb');
const { response, mapBlogPost } = require('./helpers');

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const handler = async (event) => {
  if (!event.userRef) {
    return response(401, null, 'UNAUTHORIZED', 'Please login before accessing this page.');
  }

  const data = {
    ...event.body,
    user: event.userRef,
    created_ts: Date.now()
  };

  const item = {
    data,
  };

  try {
    const resp = await client.query(query.Create(query.Collection('blog_posts'), item));
    return response(200, mapBlogPost(resp));
  }
  catch (error) {
    console.log('error', error.stack || error);
    return response(500, null, 'SERVER_ERROR', 'Something went wrong.');
  }
}

module.exports = { handler }
