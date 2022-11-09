<h1>Travel Buddy</h1>
Travel Buddy is a travel app that allows users to plan trips by creating itineraries. Inspiration for this application comes from the desire for an easier way to organize my trips, travel history, and trip activities, in one central application. 

<h2>Features</h2>

- Separate Views for a Travel Buddy User and a Travel Buddy Admin.

- Travel Buddy Users can create, edit, and delete itineraries.

- Travel Buddy User's trips are organized by: current, upcoming, and completed trips.

- Travel Buddy Users can create, edit, and delete their itinerary activities.

- Travel Buddy Users can add a new activity to the database of activities.

- Travel Buddy Users can review their itinerary Activities and share them publicly with other users.

- Travel Buddy Users can view activity reviews of all other users in the app.

- Travel Buddy Users can search the full list of reviews, by review description and activity description.

- Travel Buddy Users can view a list of all activities that they’ve been on, located inside of their profile. 

- Travel Buddy Users can view a list of all of their favorite activities that they’ve been on.

- Travel Buddy Users can search the full list of their activities, by activity description.

- Travel Buddy Admin is able to moderate content of reviews, and suspend users.

<h2>Travel Buddy Demo<h2>

[![Travel Buddy Video Demo](https://img.youtube.com/vi/xbmfv558S3I/maxresdefault.jpg)](https://www.youtube.com/watch?v=xbmfv558S3I)

<h2>Initial Setup</h2>

Clone this repository (SSH OR HTTPS)
```
<!--  SSH: -->
  git clone git@github.com:jvw3/travel-buddy-capstone.git
  
<!--   HTTPS: -->
  git clone https://github.com/jvw3/travel-buddy-capstone.git
  ```


Clone the travel buddy API (SSH OR HTTPS)

```
<!-- SSH: -->
  git clone git@github.com:jvw3/travel-buddy-api.git

<!-- HTTPs:  -->
  git clone https://github.com/jvw3/travel-buddy-api.git
```

Host API using json-server on port 8099

```
cd travel-buddy-api
json-server database.json -p 8099 -w
```

Host the project using npm start in the travel buddy directory

```
cd travel-buddy-capstone
npm install 
npm start
```
*To Sign in to the application as a Traveler, use the following email: woodard@gmail.com*

*To Sign in to the application as an Admin, use the following email: admin@travelbuddy.com*

<h2>Entity Relationship Diagram</h2>
https://dbdiagram.io/d/631e94450911f91ba585c375 



<h2>Initial Wireframe</h2>
https://www.figma.com/file/phyeDZmazgMspyC1cfJ0wJ/TravelBuddy%3A-Wireframe 


<h2>Technologies used:</h2>

- HTML
- CSS
- Javascript
- React
- DbDiagram (Entity relationship Diagram)
- Figma (Wireframe)
- Canva (Logo Design)
- Mantine (UI/CSS)
- Tabler Icons (Icons)



<h2>Author Info</h2>

- Created by Jonathan Woodard

- LinkedIn: https://www.linkedin.com/in/jonathan-woodard/


