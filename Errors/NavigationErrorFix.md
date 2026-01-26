# Navigation error fix

## Error messages
- ERROR [Error: Exception in HostFunction: TypeError: expected dynamic type 'boolean', but had type 'string'].  
- Debugger important lookouts: Error Stack:
at RNSScreen (<anonymous>)  

## Fix (Do within project folder)
- (terminal) npx expo-doctor
Look out for duplicate packages and keep an eye out for version mismatches
- (terminal) npm uninstall react-native-screens @react-navigation/stack  
- (terminal) npx expo install react-native-screens react-native-safe-area-context  
- (terminal) npx expo start -c