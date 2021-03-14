# react-node-mysql-practice-1
App Demo:

https://drive.google.com/file/d/17nBVc8Q4bTUO1hfHFXQrl7hRKrGezbTk/view?usp=sharing
https://drive.google.com/file/d/197arJwXX-Df9R49MHjv_pITTSyEzVUcB/view?usp=sharing

How to run the App?

1. Create folders named "client" and "server"
2. Download my project materials

Front-End

4. Go to your "client" folder and run "npx create-react-app ." to create React app in your folder
5. Copy the files from my "client" folder into your react app folder correspondingly

Back-End

7. Go to your "server" folder and run "npm init"
8. Run "npm install express express-session mysql bcrypt body-parser cors cookie-parser helmet nodemon"
9. Copy "index.js" from my "server" folder into your "server" folder
10. Add {"devStart": "nodemon index.js",} into your "package.json" under the "script" section
11. Run "npm run devStart"

Database

13. run "Set-ExecutionPolicy AllSigned"
14. run "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))"
15. run "choco install mysql"
16. run "mysql -uroot" to see if mysql is okay
17. run "mysqladmin --user=root password "root"
18. run "mysql -uroot -proot
19. run "create database clinic;"
20. run "create user 'clinic_app'@'%' identified by 'clinic_app';"
21. run "grant all privileges on clinic.* to 'clinic_app'@'%';"
22. run "flush privileges"
23. Login again using clinic_app user
24. Copy my "deployDB.sql" into your server folder and run "source deployDB.sql" in mysql shell

Start all services

25. Go to "client" folder and run "npm start"
26. Go to "server" folder and run "npm run devStart"
