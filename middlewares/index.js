const validateBody = require("./validateBody");
const handleMongooseError = require("./handleMongooseError");

module.exports = {
    validateBody: validateBody,
    handleMongooseError: handleMongooseError,
}