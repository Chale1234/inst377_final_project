Title of Your Project:
Weatherly: Your Personalized Weather Guide

Description of Your Project:
Weatherly is a simple yet powerful web app designed to give you all the weather information you need, right at your fingertips. Whether you're planning your day or your next vacation, Weatherly lets you quickly search for any city around the world and get up-to-the-minute weather updates.

Just type in a city, and Weatherly will give you the current temperature, humidity, air quality, and even a forecast for the days ahead. It's the perfect companion for staying informed about the weather, whether you're at home or on the go.

Key features:

Instant City Search: Find weather details for any city instantly.
Air Quality Information: Get important data about pollution and air quality levels in your city.
Detailed Forecasts: See not just today’s weather, but also predictions for the coming days.
Simple & Intuitive: A user-friendly interface that’s easy to navigate, no matter where you are.
Whether you're planning a trip or just curious about the weather, Weatherly has you covered!

Description of Target Browsers (iOS? Android? Which Ones?):
Weatherly works across a wide range of devices and browsers, so you can access it on just about any platform, wherever you are.

On Mobile:

iOS: Works smoothly on iPhones and iPads with iOS 12.0 or later (using Safari).
Android: Compatible with Android phones and tablets running Android 6.0 (Marshmallow) or later (using Chrome).
On Desktop:

Google Chrome: The best experience on Windows, macOS, or Linux.
Mozilla Firefox: Also supports recent versions on all major operating systems.
Safari: Optimized for macOS and iOS users.
Microsoft Edge: Compatible with Windows and macOS.
No matter your device, Weatherly adapts to give you a seamless experience—whether you’re browsing from a desktop or checking the weather on your phone.




Developer Manual: Weatherly
1. Welcome to Weatherly!
Welcome to Weatherly—we’re excited to have you on board! This manual is here to help you get up and running with the project, understand our coding standards, and contribute effectively. Whether you’re new to the project or just need a refresher, this guide is your go-to resource for everything you’ll need to start building, testing, and deploying.

2. What is Weatherly?
Weatherly is a web application designed to help users track and get real-time information about the weather in different locations. It’s more than just a weather app—it provides detailed forecasts, historical data, and even weather alerts to help users plan ahead.

We’re using a modern stack for this project:

Frontend: React and Redux for the user interface
Backend: Node.js and Express for handling business logic
Database: PostgreSQL to store everything securely
Dev Tools: Git for version control, and vercel for deployment
3. Setting Up Your Development Environment
Before you start coding, let’s make sure your development environment is ready to go. Here’s a simple guide to get everything up and running:

3.1 Prerequisites
Make sure you have these installed on your computer:

Node.js (version 14.x or higher)
PostgreSQL (version 12.x or higher)
Git (for version control)


BackEnd:
/backend
    ├── /src
    │   ├── /controllers      # Handles incoming requests
    │   ├── /models           # Database models
    │   ├── /routes           # API routes
    │   ├── /middleware       # Middlewares (authentication, logging, etc.)
    │   └── /utils            # Helper functions
    ├── /migrations           # Database schema changes
    └── package.json          # Project dependencies and scripts
  Front End:
  /frontend
    ├── /src
    │   ├── /components       # Reusable UI components
    │   ├── /redux            # Redux store and actions
    │   ├── /views            # Different pages of the app
    │   ├── /assets           # Images, CSS, and other assets
    │   └── /utils            # Helper functions
    ├── /public               # Static files (index.html, etc.)
    └── package.json          # React dependencies and scripts

Installation Guide :
Clone The repository 
git clone git@github.com:Chale1234/inst377_final_project.git

Install dependenccies:
Install @supabase/supabase-js
Install express: version 4.21.2 and above 
Install nodemone: version 3.1.9
install npm


Environmental variable:
port = 4000
DatabaseURL= 

Running the application 
To run the weatherly app on your local machin, use the following command:
npm start
http://localhost:4000

Running on a server 

For Production environments, follow these steps to run the application on a server:
Ensure you have node.js, and express.js installed on the server
Upload the code to the server 
set up necessary environment variable in the server

use npm start to start the server in production mode

API Documentation:
The weatherly app exposes several RESTful APIs for interacting with the system:
GET EndPoints
GET Response :
{
  "CityName": "Silver Spring",
  "search_count": 1,
  
}
Post Sample:
{
"CityName": "Rockville",
"search_count": 1

