package com.example.rndemo;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;

public class SplashModule extends ReactContextBaseJavaModule {
    public static final String NAME = "SplashModule";

    private final ReactApplicationContext reactContext;

    public SplashModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void hideSplash() {
        UiThreadUtil.runOnUiThread(() -> {
            if (!reactContext.hasActiveCatalystInstance()) {
                return;
            }

            MainActivity mainActivity = (MainActivity) reactContext.getCurrentActivity();
            if (mainActivity != null) {
                mainActivity.hideSplash();
            }
            // 虽然主界面已经 mount，但可能还没渲染成我们想要的样子，
            // 如果发现有白屏，请调整 delayInMs 参数
        }, 500);
    }
}