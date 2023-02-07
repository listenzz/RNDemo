#import "SplashWindow.h"

@implementation SplashWindow

- (void)show {
    UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"LaunchScreen" bundle:nil];
    UIViewController *splash = [storyboard instantiateInitialViewController];
    self.rootViewController = splash;
    self.backgroundColor = UIColor.clearColor;// 避免横竖屏旋转时出现黑色
    self.windowLevel = UIWindowLevelAlert + 4;
    [self makeKeyAndVisible];
}

- (void)hide:(void (^)(BOOL finished))completion {
    UIWindow *mainWindow = [UIApplication sharedApplication].delegate.window;
    [UIView transitionWithView:mainWindow duration:0.5f options:UIViewAnimationOptionTransitionCrossDissolve animations:^{
        [[UIApplication sharedApplication].delegate.window makeKeyAndVisible];
    } completion:completion];
}

@end
