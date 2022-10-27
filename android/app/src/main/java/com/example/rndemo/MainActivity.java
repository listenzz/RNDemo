package com.example.rndemo;
  
import android.os.Bundle;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.UiThreadUtil;
import com.navigation.androidx.AwesomeFragment;
import com.reactnative.hybridnavigation.ReactAppCompatActivity;

public class MainActivity extends ReactAppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // 更改主题为 AppTheme，因为在 AndroidManifest.xml 中将主题设置成了 SplashTheme
        setTheme(R.style.AppTheme);
        super.onCreate(savedInstanceState);
        // 显示 SplashFragment 来作为加载阶段的闪屏
        launchSplash(savedInstanceState);
    }

    @Override
    protected void setActivityRootFragmentSync(AwesomeFragment fragment) {
        super.setActivityRootFragmentSync(fragment);
        // 此时 React Native 已经启动完成，App UI 层级已经构建好
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

        // 当 Activity 销毁后重建，譬如旋转屏幕的时候，
        // 如果 React Native 已经启动完成，则不再显示闪屏
        ReactContext reactContext = getCurrentReactContext();
        if (splashFragment == null && reactContext == null) {
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
    }
}