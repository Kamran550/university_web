module.exports = {
  apps: [
    {
      name: "eipu-next",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      cwd: "/home/eipu/htdocs/eipu.edu.pl",
      interpreter: "node",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
