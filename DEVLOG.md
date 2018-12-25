[Setup](#setup)

[WelcomeScreen](#welcomeScreen)
# Setup

  *reactnative01*

  12.24.2018
  - Installed new Expo CLI
    - Create React Native App has been folded into the Expo CLI

  12.25.2018
  - Tried to create a new project in Firebase and discovred that there is now a project limit on my all accounts.
   - Logged in with a new account to create a project

  - Tried setting up the React Native Firebase library and ran into an error soon after that RNFirebase Pod was not found. This turned out to be because I needed to install CocoaPods.
  - Tried installing CocoaPods and discovered that a legit XCode project file/workspace was needed.
    React Native app needed to be ejected to create an ios/android folder with the rquired xcode files
    - Installed CocoaPods using a gem install

  - Tried opening my Podfile in XCode and ran into the No Editor issue where I couldn't edit the text in there. Did not solve this and instead used Atom to edit the files to add the Firebase Pod

  - Tried building the app via Expo and ran into an error code 134
  - Tried building the app in XCode and ran into this error message:

  `Showing Recent Issues
  dyld: Library not loaded: /usr/local/opt/icu4c/lib/libicui18n.60.dylib`

  - After some SO'ing it seems it could be related to an outdated/corrupt NPM install so now trying to upgrade NPM using Brew

  - This allowed me to get past the RNFirebase error but now I am coming across another error, this time native:

  `libc++abi.dylib: terminating with uncaught exception of type NSException
  (lldb) `

  - The above error was first seemingly related to a missing plist link in XCode. Resolving this still didn't solve the error though.

  - More research led to an issue with Firebase and the solution was to bump down the Pod version from 5.11.0 to 5.6.0
    - Bumping down this package also led to a different error:

  `Error satisfying GoogleUtilities/MethodSwizzler dependency.`

  - This error was known and a work around was provided here: https://github.com/firebase/firebase-ios-sdk/issues/1845
    - `pod 'GoogleUtilities', '5.2.3'`

  - The newest error is being unable to connect to the URL where Expo is running the React Native app. This is Expo related but none of the solutions seem to work:
    - Reinstalling all node_modules and Pods did nothing
    - The next solution seems to be making a new React Native app...

  *reactnative02*

  - New `expo init`
    - `yarn eject`
    - Build app manually in XCode
    - New warnings in Simulator
    - Hot reloading editing is working. Now to try to add Firebase again...
    - Added the GoogleService plist and rebuilt -- still launching fine
    - Added Firebase/Core to podfile and installed -- still launching fine
    - Attempted to link react-native with react-native-firebase and got this error:

  `{ Error: Cannot find module '/Users/jimyang/Code/reactnative02/node_modules/react-native-firebase/package.json'`

  - Oh yes, that's right. Forgot to install Firebase via NPM
  - And a new error:

  ` LSOpenURLsWithRole() failed for the application /Applications/Atom.app with error -10810.`

  - A rebuild in XCode fixed this

  - A new error but at least more sensible:

  `Ensure you have the required Firebase iOS SDK pod for this module, confirm you've added pod 'Firebase/Auth'`

  - Annnnnd back to this error:

  `libc++abi.dylib: terminating with uncaught exception of type NSException`

  - Now to try updating Firebase/Core to 5.15.0 instead which leads to this new error:

  `objc[4399]: Class VCWeakObjectHolder is implemented in both /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/Library/CoreSimulator/Profiles/Runtimes/iOS.simruntime/Contents/Resources/RuntimeRoot/System/Library/PrivateFrameworks/AVConference.framework/Frameworks/ViceroyTrace.framework/ViceroyTrace (0x1268ee4d0) and /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/Library/CoreSimulator/Profiles/Runtimes/iOS.simruntime/Contents/Resources/RuntimeRoot/System/Library/PrivateFrameworks/AVConference.framework/AVConference (0x12676ee38). One of the two will be used. Which one is undefined.
  libc++abi.dylib: terminating with uncaught exception of type NSException`

  - Ok that version didn't work. Downgraded back to 5.6.0, then manually tried to find an older Firebase/Auth that would work. Eventually tried reinstalling Firebase/Auth again and now it works!

  - I don't know why. Some combo of uninstall/reinstall/clean/build did it.

  - Now I can create an anonymous user via firebase in React-Native on iOS

  *moving DEVLOG.md over to reactnative02 project folder*

# WelcomeScreen

  - Now it's time to create a simple welcome screen that can create an email/pass login for Firebase
  - Fiddled with MainTabNavigator and it seems that the order of the tabs on the bottom are directly related to the order they are pushed into the navigator. However, I do want a separate screen before even showing the app itself.
  - Styling with React Native is certainly not CSS. Nested Flex is kinda weird here. I had to set a maxHeight on a nested flex section for the input label and input field. Otherwise it forced the entire element to the height of the screen.
