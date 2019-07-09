
# react-native-huawei-push

## 安装
```
npm install react-native-huawei-push --save
```
or
```
yarn add react-native-huawei-push
```
## 

## 集成
#### android/app/src/main/AndroidManifest.xml 添加配置
```xml
<!-- 华为推送 -->
<application>
  <meta-data
    android:name="com.huawei.hms.client.appid"
    android:value="appid=${HUAWEI_APPID}" />
</application>
```
#### android/build.gradle 设置maven仓库地址
```
allprojects {
  repositories {
    maven { url 'http://developer.huawei.com/repo/' }
  }
}
```
#### android/app/build.gradle 设置申请的AppId
```
android {
  defaultConfig {
    manifestPlaceholders = [
	  HUAWEI_APPID: "<app_id>",
    ]
  }
}
```
## 使用
```javascript
import RNHuaweiPush from 'react-native-huawei-push';
```
