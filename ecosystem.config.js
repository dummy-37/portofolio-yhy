module.exports = {
  apps: [{
    name: "portfolio-yhy",
    script: "/opt/portofolio-yhy/.next/standalone/server.js",
    cwd: "/opt/portofolio-yhy/.next/standalone",
    env: {
      PORT: 3001
    },
    autorestart: true,
    watch: false,
    max_restarts: 10,
    restart_delay: 3000
  }]
};