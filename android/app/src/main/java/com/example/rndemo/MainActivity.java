package com.example.rndemo;


import android.os.Bundle;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // 更改主题为 AppTheme，因为在 AndroidManifest.xml 中将主题设置成了 SplashTheme
        setTheme(R.style.AppTheme);
        super.onCreate(null);
    }

    @Nullable
    @Override
    protected String getMainComponentName() {
        return "RNDemo";
    }
}