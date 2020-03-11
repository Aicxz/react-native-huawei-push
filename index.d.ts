export default class HuaweiPush {
    /**
     * 初始化HuaweiPush 必须先初始化才能执行其他操作
     */
    static init(): void;
  
    /**
     * 建议在应用启动时调用Connect，返回错误码，0表示成功
     *  @returns {Promise<number | undefined>}
     */
    static connect(): Promise<number | undefined>;
  
    /**
     * 获取token，返回错误码，0表示成功
     * @returns {Promise<number | undefined>}
     */
    static getToken(): Promise<number | undefined>;
  
    /**
     * 删除token，返回错误码，0表示成功
     * @param token
     * @returns {Promise<number | undefined>}
     */
    static deleteToken(token: string): Promise<number | undefined>;
  
    /**
     * 设置是否接收普通透传消息，返回错误码，0表示成功
     * @param enable true or false
     * @returns {Promise<number | undefined>}
     */
    static setReceiveNormalMsg(enable: boolean): Promise<number | undefined>;
  
    /**
     * 设置接收通知消息，关闭后也将不能接收透传消息，返回错误码，0表示成功
     * @param enable true or false
     * @returns {Promise<number | undefined>}
     */
    static setReceiveNotifyMsg(enable: boolean): Promise<number | undefined>;
  
    /**
     * 查看Push通道是否已连接
     * @returns {Promise<number | undefined>}
     */
    static getPushStatus(): Promise<number | undefined>;
  
    /**
     * Token下发事件
     */
    static addReceiveTokenListener(cb: Function): void;
  
    /**
     * 移除Token监听事件
     */
    static removeReceiveTokenListener(): void;
  
    /**
     * 透传消息监听，应用不被后台进程杀死的情况下才能监听到
     */
    static addReceiveNotificationListener(cb: Function): void;
  
    /**
     * 移除透传消息监听
     */
    static removeReceiveNotificationListener(): void;
  
    /**
     * 通知栏点击事件，必须传递参数，并且应用不被后台进程杀死的情况下才能监听到
     */
    static addOpenNotificationListener(cb: Function): void;
  
    /**
     * 移除通知栏监听事件
     */
    static removeOpenNotificationListener(): void;
  
    /**
     * Push通道连接状态监听
     */
    static addReceivePushStateListener(cb: Function): void;
  
    /**
     * 移除Push通道连接状态监听
     */
    static removeReceivePushStateListener(): void;
  }
  