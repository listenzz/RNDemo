#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@protocol SplashDelegate <NSObject>

- (void)hideSplash;

@end

@interface SplashWindow : UIWindow

- (void)show;
- (void)hide:(void (^)(BOOL finished))completion;

@end

NS_ASSUME_NONNULL_END
