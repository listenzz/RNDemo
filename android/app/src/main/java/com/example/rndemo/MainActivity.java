package com.example.rndemo;
  
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.UiThreadUtil;
import com.navigation.androidx.AwesomeFragment;
import com.navigation.androidx.StackFragment;
import com.reactnative.hybridnavigation.ReactAppCompatActivity;
import com.reactnative.hybridnavigation.ReactBridgeManager;

public class MainActivity extends ReactAppCompatActivity implements PrivacyFragment.PrivacyFragmentListener {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // 更改主题为 AppTheme，因为在 AndroidManifest.xml 中将主题设置成了 SplashTheme
        setTheme(R.style.AppTheme);
        super.onCreate(savedInstanceState);
        // 显示 SplashFragment 来作为加载阶段的闪屏
        launchSplash(savedInstanceState);

        // 检查是否已同意隐私政策
        if (!checkPrivacyAgreement()) {
            UiThreadUtil.runOnUiThread(() -> {
                showPrivacyAlert(savedInstanceState);
            }, 1000);
        } else {
            initReactNative();
        }
    }

    private void initReactNative() {
        if (getCurrentReactContext() == null) {
            ReactBridgeManager.get().initialize();
        }
    }

    private boolean checkPrivacyAgreement() {
        SharedPreferences sharedPreferences = getSharedPreferences("demo_privacy", MODE_PRIVATE);
        return sharedPreferences.getBoolean("demo_privacy_grant", false);
    }

    private void markPrivacyAgreement() {
        SharedPreferences sharedPreferences = getSharedPreferences("demo_privacy", MODE_PRIVATE);
        sharedPreferences.edit().putBoolean("demo_privacy_grant", true).apply();
    }

    private StackFragment privacyHolder;

    private void showPrivacyAlert(Bundle savedInstanceState) {
        if (savedInstanceState != null) {
            String tag = savedInstanceState.getString("privacy_tag");
            if (tag != null) {
                privacyHolder = (StackFragment) getSupportFragmentManager().findFragmentByTag(tag);
            }
        }

        if (privacyHolder == null) {
            StackFragment stackFragment = new StackFragment();
            stackFragment.setRootFragment(new PrivacyFragment());
            privacyHolder = stackFragment;
            showAsDialog(privacyHolder, 0);
        }

        AwesomeFragment rootFragment = privacyHolder.getRootFragment();
        if (rootFragment instanceof PrivacyFragment) {
            ((PrivacyFragment) rootFragment).setPrivacyListener(this);
        }
    }

    private void hidePrivacyAlert() {
        if (privacyHolder != null) {
            privacyHolder.hideAsDialog();
            privacyHolder = null;
        }
    }

    @Override
    public void onDeny() {
        finish();
    }

    @Override
    public void onAgree() {
        hidePrivacyAlert();
        Toast.makeText(getApplicationContext(), "正在加载资源，请稍后...", Toast.LENGTH_SHORT).show();
        markPrivacyAgreement();
        initReactNative();
    }

    @Override
    public void setActivityRootFragment(@NonNull AwesomeFragment fragment) {
        super.setActivityRootFragment(fragment);
        hideSplash();
    }

    private SplashFragment splashFragment;

    private void launchSplash(Bundle savedInstanceState) {
        if (savedInstanceState != null) {
            String tag = savedInstanceState.getString("splash_tag");
            if (tag != null) {
                splashFragment = (SplashFragment) getSupportFragmentManager().findFragmentByTag(tag);
            }
        }

        // 防止热重启时卡在闪屏
        // 如果在执行 setActivityRootFragment 之前，Activity 意外销毁重建，会出现卡在闪屏的情况
        if (splashFragment != null) {
            splashFragment.hideAsDialog();
            splashFragment = null;
        }

        // 当 Activity 销毁后重建，譬如旋转屏幕的时候，
        // 如果 React Native 已经启动完成，则不再显示闪屏
        ReactContext reactContext = getCurrentReactContext();
        if (reactContext == null) {
            splashFragment = new SplashFragment();
            showAsDialog(splashFragment, 0);
        }
    }

    private void hideSplash() {
        if (splashFragment == null) {
            return;
        }

        // 虽然 React Native 已经启动完成，UI 层级也已经构建好，
        // 但主界面可能还没完成渲染，如果发现有白屏，请调整 delayInMs 参数
        UiThreadUtil.runOnUiThread(() -> {
            if (splashFragment != null) {
                splashFragment.hideAsDialog();
                splashFragment = null;
            }
        }, 500);
    }

    @Override
    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        if (splashFragment != null) {
            outState.putString("splash_tag", splashFragment.getSceneId());
        }
        if (privacyHolder != null) {
            outState.putString("privacy_tag", privacyHolder.getSceneId());
        }
    }

}