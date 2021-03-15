# react-node-mysql-practice-1
### App Demo:

https://drive.google.com/file/d/17nBVc8Q4bTUO1hfHFXQrl7hRKrGezbTk/view?usp=sharing

https://drive.google.com/file/d/197arJwXX-Df9R49MHjv_pITTSyEzVUcB/view?usp=sharing

How to run the App?

1. Create folders named "client" and "server"
2. Download my project materials

Front-End

4. Go to your "client" folder and run "npx create-react-app ." to create React app in your folder
5. Copy the files from my "client" folder into your react app folder correspondingly
6. run "npm install axios"

Back-End

7. Go to your "server" folder and run "npm init"
8. Run "npm install express;" express-session mysql bcrypt body-parser cors cookie-parser helmet nodemon"
9. Run "npm install express-session;"
10. Run "npm install mysql;"
11. Run "npm install bcrypt;"
12. Run "npm install body-parser;"
13. Run "npm install cors;"
14. Run "npm install cookie-parser;"
15. Run "npm install helmet;"
16. Run "npm install nodemon;"
17. Copy "index.js" from my "server" folder into your "server" folder
18. Add {"devStart": "nodemon index.js",} into your "package.json" under the "script" section
19. Run "npm run devStart"

Database

13. Open the powershell using administrative rights
14. run "Set-ExecutionPolicy AllSigned"
15. run "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))"
16. run "choco install mysql"
17. run "mysql -uroot" to see if mysql is okay
18. If mysql command cannot run, add "C:\tools\mysql\current\bin" to system PATH, then restart computer
19. run "mysqladmin --user=root password "root"
20. run "mysql -uroot -proot"
21. run "create database clinic;"
22. run "create user 'clinic_app'@'%' identified by 'clinic_app';"
23. run "grant all privileges on clinic.* to 'clinic_app'@'%';"
24. run "flush privileges;"
25. Login again using clinic_app user, i.e. "mysql -uclinic_app -pclinic_app"
26. mysql> use clinic;
27. Copy my "deployDB-utf8.sql" into your server folder
28. mysql> source deployDB-utf8.sql

Start all services

25. Go to "client" folder and run "npm start"
26. Go to "server" folder and run "npm run devStart"
