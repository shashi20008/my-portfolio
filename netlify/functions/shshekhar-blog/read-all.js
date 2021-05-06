/* Import faunaDB sdk */
const process = require('process')

const { query, Client } = require('faunadb');
const { mapBlogPost, response } = require('./helpers');

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const handler = async () => {
  try {
    const resp = await client.query(
      query.Paginate(query.Match(query.Index('all_posts_created_desc')), pageOpts())
    );
    const itemRefs = resp.data;
    const getAllItemsDataQuery = itemRefs.map(([_, ref]) => query.Get(ref));
    const ret = await client.query(getAllItemsDataQuery);

    return response(200, mapBlogPost(ret));
  }
  catch (error) {
    console.log('error', error.stack || error);
    return response(400, null, 'READ_FAILED', 'Unable to load the posts.');
  }
}

function pageOpts(size = 10) {
  return {
    size
  };
}

module.exports = { handler }
