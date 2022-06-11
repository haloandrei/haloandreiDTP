1How to start the app:
0) Optional step for virtual phone

cd C:\Programs\AndroidSDK\emulator 
.\emulator -avd Pixel_3a_API_30_x86 -netdelay none -netspeed full

1) 
npx react-native start

2)
npx react-native run-android


Or add in your IDE run Config the shell Script: 

Start-Job -ScriptBlock {cd C:\Programs\AndroidSDK\emulator; .\emulator -avd Pixel_3a_API_30_x86 -netdelay none -netspeed full} ; npx react-native start;

if the app doesn t connect run 2) again

TODO
- ~~move tasks not done segments after the clock and done tasks before the clock and fix edge cases~~
- ~~fix tasks reseting when closing app~~
- ~~make the tasks render in a non procastinator mode by rendering ongoing tasks next to handlebar~~
- ~~Text color reinforce black~~
- ~~repress task on tasklist to undo it being done~~
- swipe to open side menu
- add task limit to time available in the day
- ~~create a menu nav bar where you can add recursive tasks~~
- make the add task menu more user friendly
- ~~long press task splits it in two.~~
- make animation for split
- ~~add task menu: make auto min checker to fill estimate time if the unit of measure is in min otherwise make the estimate time appear.~~
- add task menu: preloaded icons to be showed as options in a recyle list.
- ~~change xml preprocessing to happen in add task menu~~
- add task menu: change icon picker to have png options not just svg as svg xml conversions get expensive.
- Add recursive tasks that alternate between some values like: call Adina/ Mona/ Dinu/ Andreas in different days.
- Or implement some sort of habit manager
- [Gesture] to activate tracker for the task performed now which will modify the task duration to be from when you started the track to when you finished it
- make the tracking leave a segment on the clock from the starting minute to the present 
- make a repeating task with a random list of activities that it cycles through: call [random friend from list]
- ~~Fix recursive tasks risking to dissapear after 


Thanks
Iulia Cozma - Tester/QA/UI&UX

