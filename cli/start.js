#!/usr/bin/env node

const { spawn } = require('child_process');

const reactScriptsPath = require.resolve('react-scripts/scripts/start');
const command = process.execPath;
const args = [reactScriptsPath];

const child = spawn(command, args, {
  stdio: 'inherit',
  env: {
    ...process.env,
    HTTPS: process.env.HTTPS || 'true'
  }
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error('Failed to launch local frontend:', error);
  process.exit(1);
});
