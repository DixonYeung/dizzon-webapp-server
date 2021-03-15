# react-node-mysql-practice-1
### App Demo:

https://drive.google.com/file/d/17nBVc8Q4bTUO1hfHFXQrl7hRKrGezbTk/view?usp=sharing

https://drive.google.com/file/d/197arJwXX-Df9R49MHjv_pITTSyEzVUcB/view?usp=sharing

## How to run the App?

1. Create folders named ```client``` and ```server```
2. Download my project materials

### Front-End

4. Open powershell
5. Change directory to your "client" folder
6. run ```npx create-react-app .``` to create React app in your folder
7. Copy the files from my "client" folder into your react app folder correspondingly
8. run ```npm install axios``` for React app to call restful-api

### Back-End

7. Open another powershell
8. Change directory to your "server" folder
9. run ```npm init```
10. Run ```npm install express```
11. Run ```npm install express-session```
12. Run ```npm install mysql```
13. Run ```npm install bcrypt```
14. Run ```npm install body-parser```
15. Run ```npm install cors```
16. Run ```npm install cookie-parser```
17. Run ```npm install helmet```
18. Run ```npm install nodemon```
19. Copy "index.js" from my "server" folder into your "server" folder
20. Add key-value pair ```"devStart": "nodemon index.js",``` into your "package.json" ( under the "script" section )
21. Run ```npm run devStart```

### Database

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

### Start all services

25. Go to "client" folder and run "npm start"
26. Go to "server" folder and run "npm run devStart"
