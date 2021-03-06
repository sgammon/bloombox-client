// NOTE: This file was generated by the ServiceGenerator.

// ----------------------------------------------------------------------------
// API:
//   Embed API (embed/v1)
// Description:
//   Provides the ability to embed various Bloombox data in 3rd party apps and
//   websites.

#import "GTLREmbed.h"

// ----------------------------------------------------------------------------
// Authorization scope

NSString * const kGTLRAuthScopeEmbedUserinfoEmail = @"https://www.googleapis.com/auth/userinfo.email";

// ----------------------------------------------------------------------------
//   GTLREmbedService
//

@implementation GTLREmbedService

- (instancetype)init {
  self = [super init];
  if (self) {
    // From discovery.
    self.rootURLString = @"https://staging-dot-api-dot-bloombox-io.appspot.com/_ah/api/";
    self.servicePath = @"embed/v1/";
    self.batchPath = @"batch";
    self.prettyPrintQueryParameterNames = @[ @"prettyPrint" ];
  }
  return self;
}

@end
