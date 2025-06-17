const chalk = require("chalk");

const requestLogger = (req, res, next) => {
  const start = process.hrtime.bigint();
  const now = new Date();
  const timestamp = now
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/,/g, "");

  const { method, originalUrl: url, ip } = req;

  const colorMethod = (method) => {
    switch (method) {
      case "GET":
        return chalk.blue(method);
      case "POST":
        return chalk.green(method);
      case "PUT":
        return chalk.yellow(method);
      case "DELETE":
        return chalk.red(method);
      default:
        return chalk.white(method);
    }
  };

  console.log(
    chalk.gray(`[${timestamp}]`) +
      ` ${colorMethod(method)}: ` +
      chalk.cyan(url) +
      chalk.white(` from IP: `) +
      chalk.magenta(ip || "N/A")
  );

  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const duration = (Number(end - start) / 1_000_000).toFixed(2); // milliseconds
    const { statusCode, statusMessage } = res;

    const colorStatus = (code) => {
      if (code >= 200 && code < 300) return chalk.bgGreen.black(code);
      if (code >= 300 && code < 400) return chalk.bgBlue.white(code);
      if (code >= 400 && code < 500) return chalk.bgYellow.black(code);
      if (code >= 500) return chalk.bgRed.white(code);
      return chalk.bgWhite.black(code);
    };

    console.log(
      chalk.gray(`[${timestamp}]`) +
        ` ${colorMethod(method)}: ` +
        chalk.cyan(url) +
        chalk.white(` [`) +
        colorStatus(statusCode) +
        chalk.white(` ${statusMessage || getStatusDescription(statusCode)}]`) +
        chalk.white(` - ${duration}ms`)
    );
  });

  next();
};

const getStatusDescription = (statusCode) => {
  const descriptions = {
    // 1xx Informational
    100: "Continue",
    101: "Switching Protocols",
    103: "Early Hints",
    // 2xx Success
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non-Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    // 3xx Redirection
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    307: "Temporary Redirect",
    308: "Permanent Redirect",
    // 4xx Client Error
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    422: "Unprocessable Entity",
    429: "Too Many Requests",
    // 5xx Server Error
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
  };
  return descriptions[statusCode] || "Unknown Status";
};

module.exports = requestLogger;
