package com.example.rndemo;

import android.app.Application;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.common.logging.FLog;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.yl.lib.sentry.hook.PrivacyResultCallBack;
import com.yl.lib.sentry.hook.PrivacySentry;
import com.yl.lib.sentry.hook.PrivacySentryBuilder;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

	private final ReactNativeHost mReactNativeHost =
		new ReactNativeHost(this) {
			@Override
			public boolean getUseDeveloperSupport() {
				return BuildConfig.DEBUG;
			}

			@Override
			protected List<ReactPackage> getPackages() {
				@SuppressWarnings("UnnecessaryLocalVariable")
				List<ReactPackage> packages = new PackageList(this).getPackages();
				packages.add(new RnDemoPackage());
				return packages;
			}

			@Override
			protected String getJSMainModuleName() {
				return "index";
			}
		};

	@Override
	public ReactNativeHost getReactNativeHost() {
		return mReactNativeHost;
	}

	@Override
	public void onCreate() {
		super.onCreate();
		setupPrivacySentry();
	}

	public void initReactNative() {
		// 关闭隐私卫士安全安全模式
		PrivacySentry.Privacy.INSTANCE.updatePrivacyShow();

		// 加载 ReactNative
		SoLoader.init(this, /* native exopackage */ false);
		FLog.setMinimumLoggingLevel(FLog.INFO);
	}

	private void setupPrivacySentry() {
		// https://github.com/allenymt/PrivacySentry
		PrivacySentryBuilder builder = new PrivacySentryBuilder()
				// 自定义文件结果的输出名
				.configResultFileName("demo_privacy")
				// 配置游客模式，true打开游客模式，false关闭游客模式
				.configVisitorModel(false)
				// 输出日志，线上包不要打开
				.syncDebug(true)
				// 配置写入文件日志 , 线上包这个开关不要打开！！！！，true打开文件输入，false关闭文件输入
				.enableFileResult(true)
				// 持续写入文件 3 分钟
				.configWatchTime(3 * 60 * 1000)
				// 文件输出后的回调
				.configResultCallBack(new PrivacyResultCallBack() {
					@Override
					public void onResultCallBack(@NonNull String filePath) {
						Log.i("RnDemo", "privacy: " + filePath);
					}
				});
		// 添加默认结果输出，包含log输出和文件输出
		PrivacySentry.Privacy.INSTANCE.init(this, builder);
	}
	
}