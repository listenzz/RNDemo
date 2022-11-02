package com.example.rndemo;

import android.app.Dialog;
import android.content.Intent;
import android.os.Bundle;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.SpannableStringBuilder;
import android.text.TextPaint;
import android.text.method.LinkMovementMethod;
import android.text.style.ClickableSpan;
import android.text.style.ForegroundColorSpan;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;

public class PrivacyFragment extends DialogFragment {

    interface PrivacyFragmentListener {
        void onDeny();

        void onAgree();
    }

    private PrivacyFragmentListener listener;

    public void setPrivacyListener(PrivacyFragmentListener listener) {
        this.listener = listener;
    }

    @NonNull
    @Override
    public Dialog onCreateDialog(@Nullable Bundle savedInstanceState) {
        Dialog dialog = super.onCreateDialog(savedInstanceState);
        dialog.setCancelable(false);
        dialog.setCanceledOnTouchOutside(false);
        dialog.setOnKeyListener((dialog1, keyCode, event) ->
                keyCode == KeyEvent.KEYCODE_BACK);
        Window window = dialog.getWindow();
        window.setDimAmount(0);

        return dialog;
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
                Intent intent = new Intent();
                intent.setClass(requireContext(), WebViewActivity.class);
                intent.putExtra("url", "https://www.baidu.com");
                intent.putExtra("title", "用户服务协议");
                startActivity(intent);
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
        contractString.setSpan(contractSpan, 0, contract.length(), Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
        contractString.setSpan(new ForegroundColorSpan(linkColor), 0, contract.length(), Spannable.SPAN_INCLUSIVE_EXCLUSIVE);

        ClickableSpan privacySpan = new ClickableSpan() {
            @Override
            public void onClick(@NonNull View widget) {
                Intent intent = new Intent();
                intent.setClass(requireContext(), WebViewActivity.class);
                intent.putExtra("url", "https://imcoding.tech");
                intent.putExtra("title", "隐私权政策");
                startActivity(intent);
            }

            @Override
            public void updateDrawState(@NonNull TextPaint ds) {
                ds.setColor(ds.linkColor);
                ds.setUnderlineText(false);
            }
        };

        String privacy = "《隐私保护政策》";
        SpannableString privacyString = new SpannableString(privacy);
        privacyString.setSpan(privacySpan, 0, privacy.length(), Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
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
