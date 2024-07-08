---
title: 'Setting up SSL in Nginx / Amazon Linux2'
status: 'published'
author:
  name: 'Byorn John De Silva'
  picture: 'https://avatars.githubusercontent.com/u/962948?v=4'
slug: 'setting-up-ssl-in-nginx-amazon-linux2'
description: 'How I set up SSL in my ec2 instance running Nginx'
coverImage: '/images/what-is-nginx-1024x512-ExNz.png'
tags: [{"label":"SSL","value":"ssl"}]
publishedAt: '2024-07-08T05:34:30.812Z'
---

The article below describes how I set up SSL for an Nginx instance hosted in Amazon Linux 2 AMI.

The below configuration also redirects port 80 traffic to my golang application runnning in port:8080

Steps

1. ssh into your ec2 instance

   install nginx

   ```
   sudo yum install nginx -y
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```
2. install certbot

   ```
   sudo yum update
   sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
   sudo yum-config-manager --enable epel
   sudo yum install certbot python3-certbot-nginx
   certbot --version
   ```
3. Generate certificates

   ```
   sudo certbot --nginx
   ```

   your certs will be stored in/etc/letsencrypt/live/yourdomain.com/cert.pem

   but you may not have permission to cd into the "live" folder

   so if you made mistakes in generating certs you can rerun the cert generation command with auto renewal as shown below

   ```
   sudo certbot certonly --force-renewal --webroot -w /usr/share/nginx/html -d yourdomain.com -d www.yourdomain.com --non-interactive --agree-tos -m your-email@example.com
   ```
   1. Add the necessary configurations to nginx

   ```
   sudo vi /etc/nginx/conf.d/default.conf
   ```

   copy and past the below config that redirects to  port 8080

   change below "[yourdomain.com](http://yourdomain.com)" to the domain name you provided

   ```
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;
   
       location / {
           proxy_pass http://localhost:8080;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   
       location /.well-known/acme-challenge/ {
           root /usr/share/nginx/html;
       }
   }
   
   server {
       listen 443 ssl;
       server_name yourdomain.com www.yourdomain.com;
   
       ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
   
       location / {
           proxy_pass http://localhost:8080;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```


1. check any errors in configuration

```
sudo nginx -t
```

1. restart nginx 

```
sudo systemctl restart nginx
```

make sure your application is running in localhost:8080