Chef’s Menu Manager

Project Overview

Chef’s Menu Manager is a mobile-style menu management application built
with React Native, TypeScript and Expo. It is designed to help an
administrator add dishes to a menu and view the items that have been
added.

The application uses a dark background with gold and light-coloured text
and buttons.

Main Features

1. Welcome Screen

● Displays the ADMIN heading and My Menu Manager subtitle.

● Shows a short introduction to the application.

● Provides a Start button that opens the menu-item form.

2. Add Menu Item

The form allows the administrator to enter details for a dish: - Dish
name - Description - Course - Price

The available course options shown in the app are: - Starter - Main
Course - Dessert - Beverage

The form includes a button to save the menu item. The form also displays
validation messages when required information is missing or incorrect.

3. Success Screen

After a dish is added successfully, the app displays a confirmation
message: Dish Added Successfully. A button on this screen allows the
user to continue using the app.

4. Menu List

The menu list displays dishes that have been added, including their
details. The app also provides an option to add another menu item.

Technologies Used

● React Native — for building the application interface.

● TypeScript — for typed JavaScript code.

● Expo — for running and testing the React Native application.

● Visual Studio Code — for editing the project code.

● Web browser — for testing the web version of the app.

Getting Started

Requirements

Install the following before running the project: - Node.js and npm - A
code editor such as Visual Studio Code - The project’s dependencies

Installation

1. Open the project folder in Visual Studio Code.

2. Open the terminal from the project folder.

3. Install the project dependencies:

```bash
npm install
```

4. If the project is configured for Expo, start the development server:

```bash
npx expo start
```

5. To run the web version, use:

```bash
npx expo start --web
```

If the web platform dependencies have not been installed in the
project, install them using Expo’s version-matched installer:

```bash
npx expo install react-native-web react-dom
```

How to Use the App

1. Open the application.

2. On the welcome screen, select Start.

3. Enter the dish name and description.

4. Select a course from the course options.

5. Enter the price.

6. Select the save/add-menu-item button.

7. Check the success message when the dish has been added.

8. Open the menu list to view added dishes.

9. Use the option to add another item when needed.

Project Structure

The main application code is in App.tsx. This file contains the screen
logic, form fields, validation, menu-item state and styles.

The package.json file contains the project scripts and dependencies
used to run the app.

A typical project also includes configuration files used by Expo and
TypeScript. The exact files and folders may differ depending on the
supplied project setup.

Data and Limitations

The video shows menu items being added and displayed in the menu list.
The current implementation appears to keep the menu items in application
state. Unless storage or a database has been added separately, the items
should be treated as temporary and may not remain after the app is
restarted.

The application is intended as a menu-management prototype. Possible
future improvements include: - Saving menu items permanently using local
storage or a database. - Adding options to edit and delete existing
dishes. - Improving price formatting and input validation. - Adding user
authentication for administrator access. - Providing clearer
confirmation and error messages.

Conclusion

Chef’s Menu Manager provides a simple interface for entering dish
information, confirming successful additions and viewing a menu list.
Its welcome screen and straightforward form flow are intended to make
the basic menu-management process easy to follow.

