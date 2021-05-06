const createRoute = require('./create');
const deleteRoute = require('./delete');
const readRoute = require('./read');
const readAllRoute = require('./read-all');
const updateRoute = require('./update');
const tokenRoute = require('./get-token');
const { prepareEvent, response } = require('./helpers');

const handler = async (event, context) => {
  try {
    await prepareEvent(event);
  }
  catch (e) {
    console.log(e);
    const statusCode = e.message === 'INVALID_TOKEN' ? 401 : 500;
    return response(statusCode, null, 'INVALID_REQUEST', 'Could not understand request.');
  }

  switch (event.httpMethod) {
    case 'GET':
      if (!event.id) {
        return readAllRoute.handler(event, context)
      }
      if (event.id === 'token') {
        // This can used to test validity of token.
        return response(200, {});
      }
      else {
        return readRoute.handler(event, context)
      }

    case 'POST':
      if (event.id === 'token') {
        return tokenRoute.handler(event, context);
      }

      return createRoute.handler(event, context);

    case 'PUT':
      if (event.id) {
        return updateRoute.handler(event, context)
      }
      return response(500, null, 'INVALID_URI', 'No handler found for the URI.');

    case 'DELETE':
      if (event.id) {
        return deleteRoute.handler(event, context)
      }
      return response(500, null, 'INVALID_URI', 'No handler found for the URI.');

    default:
      return response(405, null, 'METHOD_NOT_SUPPORTED', 'Method not implemented.');
  }
}

module.exports = { handler }
