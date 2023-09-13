// pm2.config.js

module.exports = {
    apps: [
      {
        name: 'eidcarosse_backend',  // Replace with your app's name
        script: 'app.js',       // Replace with your app's entry point file
        watch: true,            // Enable watch mode to automatically restart on file changes
        ignore_watch: ['node_modules', 'logs'], // Directories or files to ignore in watch mode
        instances: 1,           // Number of instances to run (1 for single app)
        exec_mode: 'fork',      // Execution mode (fork or cluster)
        max_memory_restart: '100M', // Maximum memory threshold for auto-restart
        env: {
          NODE_ENV: 'development', // Set your environment variables here
          PORT: 3000               // Set your application's port here
        },
        env_production: {
          NODE_ENV: 'production' // Production environment variables
        },
        error_file: 'logs/error.log', // Log file for errors
        out_file: 'logs/out.log',     // Log file for standard output
        log_date_format: 'YYYY-MM-DD HH:mm Z' // Log date format
      }
    ]
  };
  