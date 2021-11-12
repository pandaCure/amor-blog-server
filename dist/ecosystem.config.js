module.exports = {
  apps: [
    {
      name: "blog",
      script: "./dist/server.js",
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
