# Biophilia Visualiser

An application developed for a full year project at the _University of Canterbury_  
**Author**: Tom Barthelmeh  
**Supervisors**: Brionny Hooper (_Scion_), Chenyi Zhang (_University of Canterbury_)

## About

This application helps researchers at _Scion_ portray a participants psychophysiological response through a visual medium.
It allows users to input their details which is stored to a external database. Administrators (Scion employees) are then able to alter, playback, edit, and export participant data from the application.

#### Technologies

This application uses React Native and Expo with Nativewind for styling.

## How to run

Running the application is easy.
First, install the dependencies

```bash
npm install
```

Then, setup the environment file:

```bash
cp example.env .env; rm example.env
```

Fill the .env file with the following information:

```
EXPO_PUBLIC_BACKEND_URL="{url to the backend}"
EXPO_PUBLIC_API_VERSION="v1"
```

For example, if running the backend locally, use `http://localhost:4941`.  
Currently, the highest version of the API is v1.

Finally, run the application by running the following script.

```bash
npx expo start -c
```

## How to use

### For Participants
Participants are able to input their information after selecting the "Get Started" button on the Start Screen.  

Participants must also agree to the terms and conditions, and then their account will be setup in the database.  

After setting up their account, participants can hand the application back to the Scion employees.


### For Administrators
To setup an administrator account, create a new entry in the Administrator table in the database. Any of these administrator accounts can be used to login.

By clicking the "login" button in the top right of the Start Screen, administrators can then input their details, and log in.

#### View all Participants
Here, administrators can view all participants. They are able to search for a specific participants name, and can click on a participant for more information


#### View Single Participant
When viewing a single participant, administrators can view the sessions that participants have taken part in, as well as view participant details.

#### Creating a Session
When navigating to a single participants page, administrators can add a session by clicking the green + icon. This will bring up a modal where administrators can include information for the session, and upload the data straight from the device.

#### Viewing a Session
When viewing a single participant, administrators can click on a session card to view more information about that session.
This screen shows them information such as the session date and time, the name, the session timeframes, and a button to playback the session.

#### Playing back a session
When viewing a session, administrators can click a playback button to playback the session.

#### Adding a timeframe
When viewing a session, administrators can click the green + icon to add a new timeframe. This will bring up a modal where administrators can include information for the session, and upload the data straight from the device.
