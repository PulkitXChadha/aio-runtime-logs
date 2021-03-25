const { Core } = require("@adobe/aio-sdk");

const openwhisk = require("openwhisk");
const {
  errorResponse,
  stringParameters,
  checkMissingRequestInputs,
} = require("../utils");

// main function that will be executed by Adobe I/O Runtime
async function main(params) {
  // create a Logger
  const logger = Core.Logger("main", { level: params.LOG_LEVEL || "info" });

  try {
    // 'info' is the default level if not set
    logger.info("Calling the main action");

    // check for missing request input parameters and headers
    const requiredParams = ["activationID"];
    const requiredHeaders = [];
    const errorMessage = checkMissingRequestInputs(
      params,
      requiredParams,
      requiredHeaders
    );
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger);
    }
    var ow = openwhisk();
    const logContent = await ow.activations.logs(params.activationID);
    const getContent = await ow.activations.get(params.activationID);
    const response = {
      statusCode: 200,
      body: { logs: logContent.logs, result: getContent },
    };

    // log the response status code
    logger.info(`${response.statusCode}: successful request`);
    return response;
  } catch (error) {
    // log any server errors
    logger.error(error);
    // return with 500
    return errorResponse(500, "server error", logger);
  }
}

exports.main = main;
