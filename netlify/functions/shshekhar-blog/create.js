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

  const {
    title = '',
    headline = '',
    markdown = '',
    tags = []
  } = event.body;

  try {
    const text = await client.query(
      query.Create(
        query.Collection('blog_text'),
        {
          data: {
            markdown
          }
        }
      )
    );

    const data = {
      title,
      tags,
      body: headline,
      bodyRef: text.ref,
      userRef: event.userRef,
      created_ts: Date.now()
    };

    const resp = await client.query(
      query.Create(
        query.Collection('blog_posts'),
        { data }
      )
    );

    return response(200, mapBlogPost(resp));
  }
  catch (error) {
    console.log('error', error.stack || error);
    return response(500, null, 'SERVER_ERROR', 'Something went wrong.');
  }
}

module.exports = { handler }
