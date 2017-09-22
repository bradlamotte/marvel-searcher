const NE = require('node-exceptions')

class HttpNotFoundError extends NE.LogicalException {}

module.exports = HttpNotFoundError;
