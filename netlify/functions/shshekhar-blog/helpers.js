const process = require('process');
const { query, Client } = require('faunadb');

const HEADER_CONTENT_TYPE = 'content-type';
const HEADER_AUTHORIZATION = 'authorization';
const APP_JSON = 'application/json';
const PATH_PREFIX = /\.netlify\/functions\/[^/]+/;
const MSECS_IN_DAY = 24 * 60 * 60 * 1000;

async function prepareEvent(event) {
  const contentType = (event.headers[HEADER_CONTENT_TYPE] || '').trim();
  const auth = (event.headers[HEADER_AUTHORIZATION] || '').trim().split(/\s+/);
  const token = (auth.length > 1 && auth[1]) ? auth[1] : null;

  if (contentType.startsWith(APP_JSON)) {
    event.body = JSON.parse(event.body);
  }

  if (token) {
    event.token = token;
    event.userRef = await verifyToken(token);
  }

  event.path = (event.path || '').replace(PATH_PREFIX, '');
  event.id = event.path.split('/').filter(Boolean)[0];
}

function within24Hours(timestamp) {
  // A time stamp was not saved. Valid till FaunaDB deletes it.
  if (timestamp === undefined) {
    return true;
  }

  return Date.now() - timestamp < MSECS_IN_DAY;
}

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

async function verifyToken(token) {
  const result = await client.query(query.Get(query.Match(query.Index('tokens_by_token'), token)));
  if (result.data.token !== token || !within24Hours(result.data.timestamp)) {
    throw new Error('INVALID_TOKEN');
  }

  // A ref to the owner. Client can fetch it if required.
  return result.data.user;
}

function response(statusCode, body, code, message) {
  if (!body) {
    body = {
      code, message
    };
  }

  return {
    statusCode,
    body: JSON.stringify(body)
  };
}

function mapBlogPost(resp) {
  if (Array.isArray(resp)) {
    return resp.map(r => mapBlogPost(r));
  }

  return {
    id: resp.ref.id,
    ...resp.data,
    user: resp.data.user.id
  };
}

module.exports = {
  prepareEvent,
  verifyToken,
  response,
  mapBlogPost
};
