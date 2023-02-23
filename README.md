# Badminton Lesson Scheduling and Management Application

Application used to manage scheduling lessons, tracking payments, and measuring lesson statistics. Comprised of using 4 http methods: **_GET, POST, PUT, DELETE_**. Used **_React_**, **_Redux_** to manage state, **_CSS_**, **_Auth0_**,**_Framer Motion_**, **_.env_**

Consist of 5 Pages:

- Login Page
- Main Page
- Users Page
- Lessons Page
- User Page

## Login Page

This application is using Auth0 library to handle authorization and authentication. If users are not logged in, users will be redirected to this login page. You can go to the clients website or login to the application.

##### Login Page Img:

![Login Page](./public/Login%20Page.jpg 'Go to application or client website')

## Main Page

Main page consists of two parts:

- Agenda
- Paytracker

##### Main Page Img:

![Main Page](./public/Main%20Page.jpg 'Main Page')

### Agenda

Keeps track of the lessons scheduled for the selected date and stores information about the lesson details. From here, you can confirm a student went to their lesson or did not attend their lesson and give them a store credit if they did not attend

### Paytracker

Shows a list of students who have attended lessons but did not pay. Shows which lessons they did not attend, if the receptionist has contacted those students and by which receptionist. Finally, you can also pay for the unpaid lessons as well.

## Lessons Page

List of all lessons that students can register for. On this page, you can add lessons, adjust their names and prices. Adjusting a lesson will not affect lessons that have already been scheduled.

##### Lessons Page Img:

![Lessons Page](./public/Lessons%20Page.jpg 'Lessons Page')

## Users Page

List of all users in Database. Clicking on a user will go to their individual **_User Page_**.

##### Users Page Img:

![Users Page](./public/Users%20Page.jpg 'Users Page')

## User Page

The User page has two main functions:

- get or update user information
- purchase a lesson for this specific user

##### Users Page Img:

![User Page](./public/User%20Page.jpg 'User Page')
