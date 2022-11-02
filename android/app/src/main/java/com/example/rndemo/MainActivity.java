package com.example.rndemo;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.UiThreadUtil;

public class MainActivity extends ReactActivity implements PrivacyFragment.PrivacyFragmentListener{

    private final static String SPLASH_TAG = "splash_tag";

    private SplashFragment splashFragment;
    private PrivacyFragment privacyFragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // 更改主题为 AppTheme，这是一个 App 的正常主题
        setTheme(R.style.AppTheme);
        super.onCreate(null);
        // 显示 SplashFragment 来作为加载阶段的闪屏
        showSplash(savedInstanceState);

        // 检查是否已同意隐私政策
        if (!checkPrivacyAgreement()) {
            UiThreadUtil.runOnUiThread(() -> {
                showPrivacyAlert(savedInstanceState);
            }, 1000);
        } else {
            initReactNative();
        }
    }

    @Nullable
    @Override
    protected String getMainComponentName() {
        // 修改这里，之前是返回 "RNDemo"
        return null;
    }

    private boolean checkPrivacyAgreement() {
        SharedPreferences sharedPreferences = getSharedPreferences("demo_privacy", MODE_PRIVATE);
        return sharedPreferences.getBoolean("demo_privacy_grant", false);
    }

    private void markPrivacyAgreement() {
        SharedPreferences sharedPreferences = getSharedPreferences("demo_privacy", MODE_PRIVATE);
        sharedPreferences.edit().putBoolean("demo_privacy_grant", true).apply();
    }

    private void showPrivacyAlert(Bundle savedInstanceState) {
        if (savedInstanceState != null) {
            String tag = savedInstanceState.getString("privacy_tag");
            if (tag != null) {
                privacyFragment = (PrivacyFragment) getSupportFragmentManager().findFragmentByTag(tag);
            }
        }

        if (privacyFragment == null) {
            privacyFragment = new PrivacyFragment();
            privacyFragment.show(getSupportFragmentManager(), "privacy_tag");
        }

        privacyFragment.setPrivacyListener(this);
    }

    private void hidePrivacyAlert() {
        if (privacyFragment != null) {
            privacyFragment.dismiss();
            privacyFragment = null;
        }
    }

    public void onDeny() {
        hidePrivacyAlert();
        finish();
    }

    @Override
    public void onAgree() {
        hidePrivacyAlert();
        Toast.makeText(getApplicationContext(), "正在加载资源，请稍后...", Toast.LENGTH_SHORT).show();
        markPrivacyAgreement();
        initReactNative();
    }

    private void initReactNative() {
        // 如果还没有启动 RN
        if (getReactNativeHost().getReactInstanceManager().getCurrentReactContext() == null) {
            loadApp("RNDemo");
        }
    }

    private void showSplash(Bundle savedInstanceState) {
        if (savedInstanceState != null) {
            splashFragment = (SplashFragment) getSupportFragmentManager()
                    .findFragmentByTag(SPLASH_TAG);
        }

        // 防止热重启时卡在闪屏
        hideSplash();

        // 当 Activity 销毁后重建，譬如旋转屏幕的时候，
        // 如果 React Native 已经启动完成，则不再显示闪屏
        ReactContext reactContext = getReactInstanceManager().getCurrentReactContext();
        if (splashFragment == null && reactContext == null) {
            splashFragment = new SplashFragment();
            splashFragment.show(getSupportFragmentManager(), SPLASH_TAG);
        }
    }

    public void hideSplash() {
        if (splashFragment != null) {
            splashFragment.dismiss();
            splashFragment = null;
        }
    }

}