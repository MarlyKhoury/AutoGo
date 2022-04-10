<img src="./readme/title1.svg"/>

<div align="center">

> Hello world! This is the project’s summary that describes the project plain and simple, limited to the space available.  

**[PROJECT PHILOSOPHY](#philosophy) • [WIREFRAMES](#wireframes) • [TECH STACK](#stacks) • [IMPLEMENTATION](#implementation) • [HOW TO RUN?](#run)**

</div>

<br><br>


<img src="./readme/title2.svg" id='philosophy'/>

> AutoGo is a carpooling app built to help people share rides and split costs.
> 
> AutoGo is built on the principle of less cars, less costs and less pollution. Indeed, AutoGo encourages users to carpool, meet new people and share the cost all while staying comfortable and safe. So the next time you find yourself needing a ride, or wanting to share your ride costs with others, get on AutoGo.

### User Stories
- As a user, I want to quickly find and book a ride, so that I can reach my destination early.
- As a user, I want to find other people going to the same destination as mine, so that we can split the cost between us.
- As a user, I want to specify the gender of the people I’m going to share my ride with, so that I feel more comfortable and safe.


<br><br>

<img src="./readme/title3.svg" id='wireframes'/>

> This design was planned before on paper, then moved to Figma app for the fine details.
Note that i didn't use any styling library or theme, all from scratch and using pure css modules.

| Landing  | Home/Search  |
| -----------------| -----|
| ![Landing](https://github.com/MarlyKhoury/AutoGo/blob/main/Demo/Landing_Page.jpg) | ![Home/Search](https://github.com/MarlyKhoury/AutoGo/blob/main/Demo/Ride_Booking_Page.jpg) |

<!-- | Artists results  | Artist's Albums  |
| -----------------| -----|
| ![Artists results](https://github.com/julescript/spotifyndr/blob/master/demo/Artists_Page.jpg) | ![Artist's Albums](https://github.com/julescript/spotifyndr/blob/master/demo/Albums_Page.jpg) | -->


<br><br>

<img src="./readme/title4.svg" id='stacks'/>

Here's a brief high-level overview of the tech stack the AutoGo app uses:

- Frontend: This project uses the [React Native App Development Framework](https://reactnative.dev/). React Native is a JavaScript framework for writing real, natively rendered mobile applications for iOS and Android. It is based on React and Facebook's JavaScript library for building user interfaces. However, instead of targeting the browser, it targets mobile platforms.
- Backend: This project uses the [Laravel 8 Framework](https://laravel.com/docs/8.x/releases). Laravel is a web application framework with expressive, elegant syntax. A web framework provides a structure and starting point for creating your application, allowing you to focus on creating something amazing while we sweat the details.
- For persistent storage (database), the app uses [MySQL](https://www.mysql.com/) which allows the app to create a scalable and reliable database.
- To send local push notifications, the app uses the [Expo Local Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) package which supports Android and iOS.
- To get the origin and destination, the calculated travel distance and the calculated travel time, the app uses the Google Places API (Google Autocomplete), the Google Directions API and the Distance Matrix API from [Google Cloud Platform](https://cloud.google.com/).
- The design of the app adheres to the material design guidelines.



<br><br>
<img src="./readme/title5.svg" id='implementation'/>

> Using the above mentioned tech stacks and the wireframes built with figma from the user sotries we have, the implementation of the app is shown as below, these are screenshots from the real app.

<table>
  <tr>
    <td><img src="https://github.com/MarlyKhoury/AutoGo/blob/main/Demo/Landing_Page_Application.jpg" /></td>
    <td><img src="https://github.com/MarlyKhoury/AutoGo/blob/main/Demo/HomeScreen.jpg" /></td>
    <td><img src="https://github.com/MarlyKhoury/AutoGo/blob/main/Demo/Origin_Destination.jpeg" /></td>
  </tr>
    <td><img src="https://github.com/MarlyKhoury/AutoGo/blob/main/Demo/Animation2.gif" /></td>
    <td><img src="https://github.com/MarlyKhoury/AutoGo/blob/main/Demo/Animation3.gif" /></td>
    <td><img src="https://github.com/MarlyKhoury/AutoGo/blob/main/Demo/Animation4.gif" /></td>
  <tr>
    <td><img src="https://github.com/MarlyKhoury/AutoGo/blob/main/Demo/Ride_Booking.jpg" /></td>
    <td><img src="https://github.com/MarlyKhoury/AutoGo/blob/main/Demo/Animation1.gif" /></td>
    <td><img src="https://github.com/MarlyKhoury/AutoGo/blob/main/Demo/Animation6.gif" /></td>
  </tr>
</table>

<br><br>
<img src="./readme/title6.svg" id='run'/>


>To get a local copy up and running follow these simple steps.

### Prerequisites

* Download and install [Laravel 8](https://laravel.com/docs/8.x/installation)

* npm
  ```sh
  npm install npm@latest -g
  ```
* Expo CLI
  ```sh
  npm install --global expo-cli
  ```
* Expo Go app for iOS and Android  

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/MarlyKhoury/AutoGo.git
   ```
2. Navigate to the Frontend folder and install dependencies
   ```sh
   cd AutoGo-Frontend

   npm install
   ```
3. Run the start up command
   ```sh
   npm start
   ```
4. Scan the generated QR code with your camera (IOS) or through the Expo Go application (Android)

