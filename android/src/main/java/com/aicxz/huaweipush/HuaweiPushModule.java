package com.aicxz.huaweipush;

import android.app.NotificationManager;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.huawei.android.hms.agent.HMSAgent;
import com.huawei.android.hms.agent.common.handler.ConnectHandler;
import com.huawei.android.hms.agent.push.handler.DeleteTokenHandler;
import com.huawei.android.hms.agent.push.handler.EnableReceiveNormalMsgHandler;
import com.huawei.android.hms.agent.push.handler.EnableReceiveNotifyMsgHandler;
import com.huawei.android.hms.agent.push.handler.GetPushStateHandler;
import com.huawei.android.hms.agent.push.handler.GetTokenHandler;
import com.huawei.hms.support.api.push.PushReceiver;

public class HuaweiPushModule extends ReactContextBaseJavaModule {


    private static final String TAG = "HuaweiPushReceiver";

    private Context mContext;

    private static String mEvent;
    private static WritableMap mParams = null;
    private static ReactApplicationContext reactContext = null;

    private final static String RECEIVE_NOTIFICATION = "HuaweiPushReceiveNotification";
    private final static String RECEIVE_PUSH_STATE = "HuaweiPushReceivePushState";
    private final static String RECEIVE_TOKEN = "HuaweiPushReceiveToken";
    private final static String OPEN_NOTIFICATION = "HuaweiPushOpenNotification";

    public HuaweiPushModule() {
        super(reactContext);
    }

    public HuaweiPushModule(ReactApplicationContext reactContext) {
        super(reactContext);

        mContext = reactContext;
    }

    @Override
    public String getName() {

        return "RNHuaweiPush";

    }

    @ReactMethod
    public void init() {
        HMSAgent.init(getCurrentActivity());
        reactContext = getReactApplicationContext();
    }

    @ReactMethod
    public void connect(final Promise promise) {
        HMSAgent.connect(getCurrentActivity(), new ConnectHandler() {
            @Override
            public void onConnect(int rst) {
                promise.resolve(rst);
            }
        });
    }

    /**
     * 获取token
     */
    @ReactMethod
    public void getToken(final Promise promise) {
        HMSAgent.Push.getToken(new GetTokenHandler() {
            @Override
            public void onResult(int rtnCode) {
                promise.resolve(rtnCode);
            }
        });
    }

    /**
     * 删除token | delete push token
     */
    @ReactMethod
    public void deleteToken(String token, final Promise promise){
        HMSAgent.Push.deleteToken(token, new DeleteTokenHandler() {
            @Override
            public void onResult(int rst) {
                promise.resolve(rst);
            }
        });
    }

    /**
     * 获取push状态 | Get Push State
     */
    @ReactMethod
    public void getPushStatus(final Promise promise) {
        HMSAgent.Push.getPushState(new GetPushStateHandler() {
            @Override
            public void onResult(int rst) {
                promise.resolve(rst);
            }
        });
    }

    /**
     * 设置是否接收普通透传消息 | Set whether to receive normal pass messages
     * @param enable 是否开启 | enabled or not
     */
    @ReactMethod
    public void setReceiveNormalMsg(boolean enable, final Promise promise){
        HMSAgent.Push.enableReceiveNormalMsg(enable, new EnableReceiveNormalMsgHandler() {
            @Override
            public void onResult(int rst) {
                promise.resolve(rst);
            }
        });
    }

    /**
     * 设置接收通知消息 | Set up receive notification messages
     * @param enable 是否开启 | enabled or not
     */
    @ReactMethod
    public void setReceiveNotifyMsg(boolean enable, final Promise promise){
        HMSAgent.Push.enableReceiveNotifyMsg(enable, new EnableReceiveNotifyMsgHandler() {
            @Override
            public void onResult(int rst) {
                promise.resolve(rst);
            }
        });
    }

    private static void sendEvent() {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(mEvent, mParams);

        HuaweiPushModule.mParams = null;
    }

    public static class HuaweiPushReceiver extends PushReceiver {

        public HuaweiPushReceiver() {}

        @Override
        public void onToken(Context context, String token) {

            HuaweiPushModule.mEvent = RECEIVE_TOKEN;
            HuaweiPushModule.mParams = Arguments.createMap();
            HuaweiPushModule.mParams.putString("token", token);
            HuaweiPushModule.sendEvent();

            Log.d(TAG,"Push Token:"+token);
        }

        @Override
        public boolean onPushMsg(Context context, byte[] msg, Bundle bundle) {

            try {
                //CP可以自己解析消息内容，然后做相应的处理
                String content = new String(msg, "UTF-8");

                HuaweiPushModule.mEvent = RECEIVE_NOTIFICATION;
                HuaweiPushModule.mParams = Arguments.createMap();
                HuaweiPushModule.mParams.putString("msg", content);
                HuaweiPushModule.sendEvent();

                Log.d(TAG,"Push Message:" + content);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return false;
        }

    }

    public static class HuaweiPushReceiverEx extends PushReceiver {

        public HuaweiPushReceiverEx() {}

        @Override
        public void onPushState(Context context, boolean pushState) {

            HuaweiPushModule.mEvent = RECEIVE_PUSH_STATE;
            HuaweiPushModule.mParams = Arguments.createMap();
            HuaweiPushModule.mParams.putString("state", Boolean.toString(pushState));
            HuaweiPushModule.sendEvent();

            Log.d(TAG, "Push State：" + Boolean.toString(pushState));
        }

        /**
         * 回调此方法，必须要添加自定义数据
         */
        @Override
        public void onEvent(Context context, PushReceiver.Event event, Bundle extras) {

            try {
                if (Event.NOTIFICATION_OPENED.equals(event) || Event.NOTIFICATION_CLICK_BTN.equals(event)) {

                    int notifyId = extras.getInt(BOUND_KEY.pushNotifyId, 0);
                    String msgKey = extras.getString(BOUND_KEY.pushMsgKey, "");

                    HuaweiPushModule.mEvent = OPEN_NOTIFICATION;
                    HuaweiPushModule.mParams = Arguments.createMap();
                    HuaweiPushModule.mParams.putString("msgKey", msgKey);
                    HuaweiPushModule.sendEvent();

                    Log.d(TAG,"Notification event, notifyId:" + notifyId + "，msgKey:" + msgKey);

                    if (0 != notifyId) {
                        NotificationManager manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

                        manager.cancel(notifyId);
                    }
                }

                super.onEvent(context, event, extras);

            } catch (Exception e) {
                e.printStackTrace();
            }

        }

    }

}
