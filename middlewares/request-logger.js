const chalk = require("chalk");

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toLocaleString("en-GB", {
    timeZone: "UTC",
    hour12: false,
  });
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;

  let coloredMethod;
  switch (method) {
    case "GET":
      coloredMethod = chalk.blue(method);
      break;
    case "POST":
      coloredMethod = chalk.green(method);
      break;
    case "PUT":
      coloredMethod = chalk.yellow(method);
      break;
    case "DELETE":
      coloredMethod = chalk.red(method);
      break;
    default:
      coloredMethod = chalk.white(method);
  }

  console.log(
    chalk.gray(`[${timestamp}]`) +
      ` ${coloredMethod}: ` +
      chalk.cyan(url) +
      chalk.white(` from IP: `) +
      chalk.magenta(ip)
  );

  next();
};

module.exports = requestLogger;
