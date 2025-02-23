**Unsplash Clone**

**An Unsplash-style image browsing app built with React Native, Expo, Firebase, and the Unsplash API. This project allows users to explore high-quality images, like photos (if authenticated), and search for images.**

**Tech Stack**

    React Native with Expo (Managed Workflow)
    TypeScript for type safety
    Redux Toolkit for state management
    Firebase Authentication for user login/signup
    Firestore for storing user data and liked photos
    Unsplash API for fetching images
    Axios for API requests


**Setup & Installation**

**Clone the repository**

`git clone https://github.com/yourusername/unsplash-clone.git`
`cd unsplash-clone`

Install dependencies

`npm install`

**Set up environment variables**

*Create a .env file in the root directory and add your API keys:*

`EXPO_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key`

`FIREBASE_API_KEY=your_firebase_api_key`

`FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain`

`FIREBASE_PROJECT_ID=your_firebase_project_id`

`FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket`

`FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id`

`FIREBASE_APP_ID=your_firebase_app_id`


**Start the Expo development server**

`npx expo start`

**Future Improvements**
*Add infinite scrolling for images*
*Implement user profile and saved collections*
*Improve UI animations and transitions*

License
This project is for demonstration purposes and is not intended for commercial use.
