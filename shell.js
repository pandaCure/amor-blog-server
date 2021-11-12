const fs = require("fs");
const path = require("path");
const child_process = require("child_process");
const { promisify } = require("util");
const copyFile = promisify(fs.copyFile);
const exec = promisify(child_process.exec);
const main = async () => {
  // copy
  await copyFile(
    path.join(__dirname, "package.json"),
    path.join(__dirname, "dist/package.json")
  );
  await copyFile(
    path.join(__dirname, "ecosystem.config.js"),
    path.join(__dirname, "dist/ecosystem.config.js")
  );
  await fs.mkdir(path.join(__dirname, "dist/config"));
  //
  await copyFile(
    path.join(__dirname, "../server-config/config.json"),
    path.join(__dirname, "dist/config/config.json")
  );
  //   执行命令
  await exec(["pnpm", "install"].join(" "), {
    cwd: path.join(__dirname, "dist"),
  });
  await exec(["pm2", "restart", "--env", "production"].join(" "), {
    cwd: path.join(__dirname, "dist"),
  });
};
main();
