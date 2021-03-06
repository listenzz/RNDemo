package com.example.rndemo;

import android.app.Dialog;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.navigation.androidx.AwesomeFragment;

public class SplashFragment extends AwesomeFragment {
    @NonNull
    @Override
    public Dialog onCreateDialog(@Nullable Bundle savedInstanceState) {
        setStyle(STYLE_NO_FRAME, R.style.SplashTheme);
        setCancelable(false);
        return super.onCreateDialog(savedInstanceState);
    }
}
