package com.example.rndemo;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.CookieManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.ProgressBar;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.navigation.androidx.AwesomeFragment;

public class WebViewFragment extends AwesomeFragment {

    private WebView mWebView;
    
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_web_view, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        WebView webView = view.findViewById(R.id.myWebView);
        mWebView = webView;
        
        // 进度条
        ProgressBar progressBar = view.findViewById(R.id.progressBar);
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                super.onProgressChanged(view, newProgress);
                if (newProgress == 100) {
                    progressBar.setVisibility(View.GONE);

                } else {
                    progressBar.setVisibility(View.VISIBLE);
                    progressBar.setProgress(newProgress);
                }
            }

            @Override
            public void onReceivedTitle(WebView view, String title) {
                super.onReceivedTitle(view, title);
            }
        });

        CookieManager.getInstance().setAcceptCookie(true);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setSavePassword(false);
        if (BuildConfig.DEBUG) {
            WebView.setWebContentsDebuggingEnabled(true);
        }
        
        Bundle args = getArguments();
        webView.loadUrl(args.getString("url"));
    }

    @Override
    public void onDestroyView() {
        mWebView.destroy();
        super.onDestroyView();
    }
}