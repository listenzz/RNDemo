package com.example.rndemo;

import android.graphics.Color;
import android.os.Bundle;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.SpannableStringBuilder;
import android.text.TextPaint;
import android.text.method.LinkMovementMethod;
import android.text.style.ClickableSpan;
import android.text.style.ForegroundColorSpan;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.navigation.androidx.AwesomeFragment;
import com.navigation.androidx.AwesomeToolbar;
import com.navigation.androidx.BarStyle;
import com.navigation.androidx.Style;

public class PrivacyFragment extends AwesomeFragment {
    
    interface PrivacyFragmentListener {
        void onDeny();
        void onAgree();
    }

    @Override
    protected void onCustomStyle(@NonNull Style style) {
        style.setScreenBackgroundColor(Color.TRANSPARENT);
    }

    @NonNull
    @Override
    protected BarStyle preferredStatusBarStyle() {
        return BarStyle.LightContent;
    }

    @Override
    protected int preferredNavigationBarColor() {
        return Color.WHITE;
    }

    @Nullable
    @Override
    protected AwesomeToolbar onCreateToolbar(View parent) {
        return null;
    }

    @Override
    protected boolean onBackPressed() {
        return true;
    }
    
    private PrivacyFragmentListener listener;
    
    public void setPrivacyListener(PrivacyFragmentListener listener) {
        this.listener = listener;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_privacy, container, false);
    }
    
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        TextView denyButton = view.findViewById(R.id.deny);
        TextView agreeButton = view.findViewById(R.id.agree);
        
        denyButton.setOnClickListener(v -> {
            if (listener != null) {
                listener.onDeny();
            }
        });
        
        agreeButton.setOnClickListener(v -> {
            if (listener != null) {
                listener.onAgree();
            }
        });

        ClickableSpan contractSpan = new ClickableSpan() {
            @Override
            public void onClick(@NonNull View widget) {
                WebViewFragment webView = new WebViewFragment();
                Bundle bundle = new Bundle();
                bundle.putString("url", "https://www.baidu.com");
                bundle.putString("title", "用户服务协议");
                webView.setArguments(bundle);
                requireStackFragment().pushFragment(webView);
            }

            @Override
            public void updateDrawState(@NonNull TextPaint ds) {
                ds.setColor(ds.linkColor);
                ds.setUnderlineText(false);
            }
        };

        int linkColor = requireContext().getResources().getColor(R.color.colorAccent);

        String contract = "《用户服务协议》";
        SpannableString contractString = new SpannableString(contract);
        contractString.setSpan(contractSpan, 0 , contract.length(), Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
        contractString.setSpan(new ForegroundColorSpan(linkColor), 0, contract.length(), Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
        
        ClickableSpan privacySpan = new ClickableSpan() {
            @Override
            public void onClick(@NonNull View widget) {
                WebViewFragment webView = new WebViewFragment();
                Bundle bundle = new Bundle();
                bundle.putString("url", "https://imcoding.tech");
                bundle.putString("title", "隐私权政策");
                webView.setArguments(bundle);
                requireStackFragment().pushFragment(webView);
            }
            @Override
            public void updateDrawState(@NonNull TextPaint ds) {
                ds.setColor(ds.linkColor);
                ds.setUnderlineText(false);
            }
        };

        String privacy = "《隐私保护政策》";
        SpannableString privacyString = new SpannableString(privacy);
        privacyString.setSpan(privacySpan, 0 , privacy.length(), Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
        privacyString.setSpan(new ForegroundColorSpan(linkColor), 0, privacy.length(), Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
        
        TextView content = view.findViewById(R.id.content);
        content.setMovementMethod(LinkMovementMethod.getInstance());
        
        SpannableStringBuilder builder = new SpannableStringBuilder();
        
        builder.append("我们非常重视您的个人信息和隐私保护，为了有效保障您的个人权益，在使用 RNDemo 服务前，请您务必审慎阅读");
        builder.append(contractString);
        builder.append("、");
        builder.append(privacyString);
        builder.append("内的所有条款，尤其是：");
        builder.append("\n1、我们对您的个人信息收集/保存/使用/对外提供/保护等条款，以及您的用户权利等条款；");
        builder.append("\n2、约定我们的限制责任、免责条款；");
        builder.append("\n3、其它以及颜色或者加粗进行标识的重要条款。");
        builder.append("\n如果同意上述协议及声明的内容，请点击“同意并继续”开始使用产品和服务。如果再次使用 RNDemo，即表示您已同意《用户服务协议》、《隐私保护政策》。否则，请退出本应用程序并建议卸载本应用。");
        
        content.setText(builder, TextView.BufferType.SPANNABLE);

    }
    
}
