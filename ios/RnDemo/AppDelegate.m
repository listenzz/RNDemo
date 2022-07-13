#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTBridgeModule.h>
#import <HybridNavigation/HybridNavigation.h>

@interface AppDelegate ()

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
    [[HBDReactBridgeManager get] installWithBridge:bridge];
    
    // 加载 `LaunchScreen`，将它作为 `UIViewController` 的 `view`
    UIStoryboard *storyboard =  [UIStoryboard storyboardWithName:@"LaunchScreen" bundle:nil];
    UIViewController *rootViewController = [storyboard instantiateInitialViewController];
    
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window.windowLevel = UIWindowLevelAlert + 4;
    self.window.rootViewController = rootViewController;
    
    // 一直显示加载阶段的闪屏，直到 React Native 启动完成，
    // hybrid-navigation 会将 window 的 rootViewController 替换为主界面。
    [self.window makeKeyAndVisible];
    return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
#if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
