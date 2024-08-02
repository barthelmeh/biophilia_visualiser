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
