#import <UIKit/UIKit.h>
#import <React/RCTBridgeDelegate.h>

#import "SplashWindow.h"
  
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, SplashDelegate>

@property (strong, nonatomic) UIWindow *window;

@end
