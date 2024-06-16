const { client } = require('../config/database');
const {success, serverError} = require('../helpers/response')

const getAll = async (req, res) => {
  const query = 'SELECT * FROM messages';

  client.execute(query, [], { prepare: true }, (err, result) => {
    if (err) {
      console.log('err :>> ', err);
      return serverError({res, status: 500, error: err});
    }
    const sortedRows = result.rows.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    const latest50Records = sortedRows.slice(0, 50);

    success({res, data: latest50Records});
  });
};



module.exports = {getAll}