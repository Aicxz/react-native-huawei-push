import {
    Platform,
    NativeModules,
    DeviceEventEmitter
} from 'react-native';

const { RNHuaweiPush } = NativeModules;

const listeners = {};

const receiveToken = 'HuaweiPushReceiveToken';
const openNotification = 'HuaweiPushOpenNotification';
const receivePushState = 'HuaweiPushReceivePushState';
const receiveNotification = 'HuaweiPushReceiveNotification';

export default class HuaweiPush {

    /**
     * 初始化HuaweiPush 必须先初始化才能执行其他操作
     */
    static init() {

        if (Platform.OS === 'android') {
            RNHuaweiPush.init()
        }

    }

    /**
     * 建议在应用启动时调用Connect，返回错误码，0表示成功
     *  @returns {Promise<void>}
     */
    static async connect() {

        if (Platform.OS === 'android') {
            return await RNHuaweiPush.connect();
        }

    }

    /**
     * 获取token，返回错误码，0表示成功
     * @returns {Promise<*>}
     */
    static async getToken() {

        if (Platform.OS === 'android') {
            return await RNHuaweiPush.getToken();
        }

    }

    /**
     * 删除token，返回错误码，0表示成功
     * @param token
     * @returns {Promise<*>}
     */
    static async deleteToken(token) {

        if (Platform.OS === 'android') {
            return await RNHuaweiPush.deleteToken(token);
        }

    }

    /**
     * 设置是否接收普通透传消息，返回错误码，0表示成功
     * @param enable true or false
     * @returns {Promise<void>}
     */
    static async setReceiveNormalMsg(enable) {

        if (Platform.OS === 'android') {
            return await RNHuaweiPush.setReceiveNormalMsg(enable);
        }

    }

    /**
     * 设置接收通知消息，关闭后也将不能接收透传消息，返回错误码，0表示成功
     * @param enable true or false
     * @returns {Promise<void>}
     */
    static async setReceiveNotifyMsg(enable) {

        if (Platform.OS === 'android') {
            return await RNHuaweiPush.setReceiveNormalMsg(enable);
        }

    }

    /**
     * 查看Push通道是否已连接
     * @returns {Promise<void>}
     */
    static async getPushStatus() {

        if (Platform.OS === 'android') {
            return await RNHuaweiPush.getPushStatus();
        }

    }

    /**
     * Token下发事件
     */
    static addReceiveTokenListener(cb) {

        if (Platform.OS === 'android') {

            listeners[receiveToken] = DeviceEventEmitter.addListener(
                receiveToken,
                args => cb(args)
            )

        }

    }

    /**
     * 移除Token监听事件
     */
    static removeReceiveTokenListener() {

        if (!listeners[receiveToken]) {
            return;
        }

        listeners[receiveToken].remove();
        listeners[receiveToken] = null;

    }

    /**
     * 透传消息监听，应用不被后台进程杀死的情况下才能监听到
     */
    static addReceiveNotificationListener(cb) {

        if (Platform.OS === 'android') {

            listeners[receiveNotification] = DeviceEventEmitter.addListener(
                receiveNotification,
                args => cb(args)
            )

        }

    }

    /**
     * 移除透传消息监听
     */
    static removeReceiveNotificationListener() {

        if (!listeners[receiveNotification]) {
            return;
        }

        listeners[receiveNotification].remove();
        listeners[receiveNotification] = null;

    }

    /**
     * 通知栏点击事件，必须传递参数，并且应用不被后台进程杀死的情况下才能监听到
     */
    static addOpenNotificationListener(cb) {

        if (Platform.OS === 'android') {

            listeners[openNotification] = DeviceEventEmitter.addListener(
                openNotification,
                args => cb(args)
            )

        }

    }

    /**
     * 移除通知栏监听事件
     */
    static removeOpenNotificationListener() {

        if (!listeners[openNotification]) {
            return;
        }

        listeners[openNotification].remove();
        listeners[openNotification] = null;

    }

    /**
     * Push通道连接状态监听
     */
    static addReceivePushStateListener(cb) {

        if (Platform.OS === 'android') {

            listeners[receivePushState] = DeviceEventEmitter.addListener(
                receivePushState,
                args => cb(args)
            )

        }

    }

    /**
     * 移除Push通道连接状态监听
     */
    static removeReceivePushStateListener() {

        if (!listeners[receivePushState]) {
            return;
        }

        listeners[receivePushState].remove();
        listeners[receivePushState] = null;

    }

}
