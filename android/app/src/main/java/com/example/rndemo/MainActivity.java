package com.example.rndemo;

import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.UiThreadUtil;
import com.navigation.androidx.AwesomeFragment;
import com.reactnative.hybridnavigation.ReactAppCompatActivity;

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
        MainApplication application = (MainApplication) getApplication();
        application.initReactNative();
    }

    private boolean checkPrivacyAgreement() {
        SharedPreferences sharedPreferences = getSharedPreferences("demo_privacy", MODE_PRIVATE);
        return sharedPreferences.getBoolean("demo_privacy_grant", false);
    }

    private void markPrivacyAgreement() {
        SharedPreferences sharedPreferences = getSharedPreferences("demo_privacy", MODE_PRIVATE);
        sharedPreferences.edit().putBoolean("demo_privacy_grant", true).apply();
    }

    private PrivacyFragment privacyFragment;

    private void showPrivacyAlert(Bundle savedInstanceState) {
        if (savedInstanceState != null) {
            String tag = savedInstanceState.getString("privacy_tag");
            if (tag != null) {
                privacyFragment = (PrivacyFragment) getSupportFragmentManager().findFragmentByTag(tag);
            }
        }

        if (privacyFragment == null) {
            privacyFragment = new PrivacyFragment();
            showAsDialog(privacyFragment, 0);
        }

        privacyFragment.setPrivacyListener(this);
    }

    private void hidePrivacyAlert() {
        if (privacyFragment != null) {
            privacyFragment.hideAsDialog();
            privacyFragment = null;
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
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            getSplashScreen().setOnExitAnimationListener(view -> {
                view.remove();
                getSplashScreen().clearOnExitAnimationListener();
            });
        }

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
        if (privacyFragment != null) {
            outState.putString("privacy_tag", privacyFragment.getSceneId());
        }
    }

}