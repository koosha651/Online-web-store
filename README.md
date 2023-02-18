Online piano shop enables users to search pianos by model name and their seller. Users can see the details of each piano as well as price of it and can choose to review and favorite the item they like. Piano shop also recommends pianos according to the use case of the user which is digital or acoustic piano.

## Table of Contents 🎹
* [About Me](#about-me)
* [Tech Stack](#tech-stack)
* [Features](#features)
* [Installation](#installation)



## <a name="about-me"></a>About Me 👩🏻‍💻
I am Koosha Sharifani an enthusiastic software engineer in Charlotte, NC. Find her on [LinkedIn](https://www.linkedin.com/in/kofani/).

## <a name="tech-stack"></a>Tech Stack 🖥

**Backend**:  JavaScript, PostgreSQL, MongoDB, Node.js  <br/>
**Frontend**:  React, CSS3, HTML5, JavaScript<br/>

## <a name="features"></a>Features 🔎
Homepage and piano shop details page before user login in. No favorite button shown and no review can be left. Sign in and sign up button is shown.

![Before user login in](/public/gifs/preview login.gif)

Register for an account and login to use any app features. Regex is used to check the format of the email address.

![Registration and Login](/static/image/gifs/register-login.gif)

Search for piano by their category.

![pianos Search](/static/image/gifs/search-rests.gif)

View a piano details and favourite a piano

![View piano Details](/static/image/gifs/view-details.gif)

Write a review for a piano.

![Write piano Review](/static/image/gifs/write-review.gif)

User profile page and upload your own profile picture.

![Upload Profile Picture](/static/image/gifs/user-profile-page.gif)

View your favorited pianos.

![View User Content](/static/image/gifs/view-favs-rests.gif)


## <a name="installation"></a>Set Up 🛠

* Install [VScode] <br/>
* Install [PostgreSQL](https://www.postgresql.org/download/)

Clone repository:
```
git clone https://github.com/WillaDai2022/Restaurant-Rating-App-2
```

Create and activate virtual environment:
```
virtualenv env
source env/bin/activate
```

Install the dependencies:
```
pip3 install -r requirements.txt
```
* Sign up to use the [Cloudinary API](https://cloudinary.com), [Google Maps Javascript API](https://developers.google.com/maps), [Yelp API](https://www.yelp.com/developers) and [Toastify JS API](https://apvarun.github.io/toastify-js/)

Save your Yelp and Cloudinary API keys to a file `secrets.sh`. The file should resemble this:
```
export YELP_KEY='***'
export CLOUDINARY_KEY='***'
export CLOUDINARY_SECRET='***'
```
Restrict your Google Maps key.

Source your keys:
```
source secrets.sh
```
Set up the database:
```
createdb restaurant_guide
psql restaurant_guide < restaurant_guide.sql
```

Run the app:
```
python3 server.py
```

* Go to 'localhost:5000' in your browser to view application locally.




