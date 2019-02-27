const defaultContext = {
    appKey: '<Your HuaweiPush appid>'
}

/**
 * @param {object} [ctx]
 * @return {{ [string]: (Recipe|Recipe[]) }}
 */
module.exports = (ctx = defaultContext) => ({
    'android/**/AndroidManifest.xml': {
        pattern: `</activity>`,
        patch: `
        <!-- 接入HMSSDK 需要注册的appid参数。格式 android:value="appid=xxxxxx"-->
        <meta-data
          android:name="com.huawei.hms.client.appid"
          android:value="appid=${ctx.appid}"/>`
    },
    'android/build.gradle': [
        {
            pattern: /allprojects {[\s\S]*repositories {[\s\S]*maven.*}/g,
            patch: `
        maven { url 'http://developer.huawei.com/repo/' }`
        }
    ],
})
