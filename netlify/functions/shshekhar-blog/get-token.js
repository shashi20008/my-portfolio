const process = require('process');

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { query, Client } = require('faunadb');
const { response } = require('./helpers');

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

async function handler(event) {
  const {
    email,
    password
  } = event.body;

  if (!email || !password) {
    return response(400, null, 'MISSING_FIELD', 'A required field is missing.');
  }

  try {
    const user = await client.query(query.Get(query.Match(query.Index('users_by_email'), email)));
    const matches = await bcrypt.compare(password, user.data.password);

    if (!matches) {
      throw new Error();
    }

    const data = {
      token: uuidv4(),
      userRef: user.ref,
      userEmail: email,
      timestamp: Date.now()
    };

    await client.query(query.Create(query.Collection('tokens'), { data }));

    return response(200, {
      ...data,
      userRef: undefined,
      userId: data.userRef.id
    });
  }
  catch (e) {
    console.log(e.stack || e);
    return response(400, null, 'INVALID_CREDS', 'User not found, or password mismatch.');
  }
}

module.exports = {
  handler
};
