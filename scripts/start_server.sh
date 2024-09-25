#!/bin/bash
cd /home/ec2-user/JenkinDevOps
pm2 stop all || true
pm2 start app.js --name "app"
