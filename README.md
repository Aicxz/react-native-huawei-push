
# react-native-huawei-push

## Getting started

`$ npm install react-native-huawei-push --save`

### Mostly automatic installation

`$ react-native link react-native-huawei-push`

### Manual installation


#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.aicxz.huaweipush.HuaweiPushPackage;` to the imports at the top of the file
  - Add `new HuaweiPushPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-huawei-push'
  	project(':react-native-huawei-push').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-huawei-push/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-huawei-push')
  	```


## Usage
```javascript
import RNHuaweiPush from 'react-native-huawei-push';

// TODO: What to do with the module?
RNHuaweiPush;
```
