package com.example.rndemo;

import android.app.Activity;
import android.view.WindowManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SoftInputModule extends ReactContextBaseJavaModule {

    public SoftInputModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "SoftInputMode";
    }

    @ReactMethod
    public void addListener(String eventType) {
        // do nothing
    }

    @ReactMethod
    public void removeListeners(int count) {
        // do nothing
    }

    @ReactMethod
    public void setAdjustNothing(Callback callback) {
        Activity activity = getCurrentActivity();
        if (activity == null) {
            callback.invoke(null, "");
            return;
        }
        activity.runOnUiThread(() -> {
            activity.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_NOTHING);
            callback.invoke(null, "");
        });
    }

    @ReactMethod
    public void setAdjustResize(Callback callback) {
        Activity activity = getCurrentActivity();
        if (activity == null) {
            callback.invoke(null, "");
            return;
        }

        activity.runOnUiThread(() -> {
            activity.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
            callback.invoke(null, "");
        });
    }
}
