#import "SplashModule.h"
#import "SplashWindow.h"

#import <UIKit/UIKit.h>

@implementation SplashModule

RCT_EXPORT_MODULE(SplashModule);

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(hideSplash) {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        id<UIApplicationDelegate> appDelegate = [UIApplication sharedApplication].delegate;
        if ([appDelegate conformsToProtocol:@protocol(SplashDelegate)]) {
            [(id<SplashDelegate>)appDelegate hideSplash];
        }
    });
}
@end
