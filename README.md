Online piano shop enables users to search pianos by model name and their seller. Users can see the details of each piano as well as price of it and can choose to review and favorite the item they like. Piano shop also recommends pianos according to the use case of the user which is digital or acoustic piano.

## Table of Contents 🎹
* [About Me](#about-me)
* [Tech Stack](#tech-stack)
* [Features](#features)
* [Installation](#installation)



## <a name="about-me"></a>About Me 👨🏻👨🏻‍💻
I am Koosha Sharifani an enthusiastic software engineer in Charlotte, NC. Find her on [LinkedIn](https://www.linkedin.com/in/kofani/).

## <a name="tech-stack"></a>Tech Stack 🖥

**Backend**:  JavaScript, PostgreSQL, MongoDB, Node.js  <br/>
**Frontend**:  React, CSS3, HTML5, JavaScript<br/>

## <a name="features"></a>Features 🔎
Homepage and piano shop details page before user login in. No favorite button shown and no review can be left. About, Contact us, Login and Sign up button is shown.

![Before user login in](/public/gifs/preview-login.gif)

Register for an account for login and purchasing any item. Regex is used to check the format of the email address.

![Registration and Login](/public/gifs/signe-up.gif)

Login to the profile that you make

![profile login](/public/gifs/login.gif)

Start trade and import information about the item

![View piano Details](/public/gifs/profie.gif)

Update your purchased information about the pianos.

![Write piano Review](/public/gifs/start-trade.gif)

User profile page and write piano Review and show intrest on 
other items

![View User Content](/public/gifs/add-and-drop%20item.gif)


## <a name="installation"></a>Set Up 🛠

* Install [VScode] <br/>
* Install [PostgreSQL](https://www.postgresql.org/download/)

Clone repository:
```
git clone https://github.com/koosha651/Online-web-store.git
```

Create and activate virtual environment:
```
virtualenv env
source env/bin/activate
```

Open new terminal and install the dependencies:
```
npm i
```
* Make sure to open CMD terminal

After run the code, add  `nodemon app.js`. The file should resemble this:
```
[nodemon] 2.0.20
[nodemon] to restart at any time enter >nodemon app.js
      
Server is running on port 3000
```
Restrict your Google page and in the address bar and run the app:

* Go to 'localhost:3000' in your browser to view application locally.




