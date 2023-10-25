// NOTE: This file was generated by the ServiceGenerator.

// ----------------------------------------------------------------------------
// API:
//   Embed API (embed/v1)
// Description:
//   Provides the ability to embed various Bloombox data in 3rd party apps and
//   websites.

#import <GoogleApiClientForRest/GTLRQuery.h>

#if GTLR_RUNTIME_VERSION != 3000
#error This file was generated by a different version of ServiceGenerator which is incompatible with this GTLR library source.
#endif

NS_ASSUME_NONNULL_BEGIN

// ----------------------------------------------------------------------------
// Constants - For some of the query classes' properties below.

// ----------------------------------------------------------------------------
// style

/** Value: "MASTER_DETAIL" */
GTLR_EXTERN NSString * const kGTLRBBEmbedStyleMasterDetail;
/** Value: "MASTER_ONLY" */
GTLR_EXTERN NSString * const kGTLRBBEmbedStyleMasterOnly;

// ----------------------------------------------------------------------------
// Query Classes
//

/**
 *  Parent class for other BBEmbed query classes.
 */
@interface GTLRBBEmbedQuery : GTLRQuery

/** Selector specifying which fields to include in a partial response. */
@property(nonatomic, copy, nullable) NSString *fields;

@end

/**
 *  Retrieve menu data for a partner location.
 *
 *  Method: embed.data
 *
 *  Authorization scope(s):
 *    @c kGTLRAuthScopeBBEmbedPlusMe
 *    @c kGTLRAuthScopeBBEmbedUserinfoEmail
 */
@interface GTLRBBEmbedQuery_Data : GTLRBBEmbedQuery
// Previous library name was
//   +[GTLQueryBBEmbed queryForDataWithpartner:location:]

/** Location ID. */
@property(nonatomic, copy, nullable) NSString *location;

/** Partner ID. */
@property(nonatomic, copy, nullable) NSString *partner;

/**
 *  Fetches a @c GTLRBBEmbed_EmbeddedData.
 *
 *  Retrieve menu data for a partner location.
 *
 *  @param partner Partner ID.
 *  @param location Location ID.
 *
 *  @returns GTLRBBEmbedQuery_Data
 */
+ (instancetype)queryWithPartner:(NSString *)partner
                        location:(NSString *)location;

@end

/**
 *  Retrieve a prepared embedded menu view for a given partner location.
 *
 *  Method: embed.view
 *
 *  Authorization scope(s):
 *    @c kGTLRAuthScopeBBEmbedPlusMe
 *    @c kGTLRAuthScopeBBEmbedUserinfoEmail
 */
@interface GTLRBBEmbedQuery_View : GTLRBBEmbedQuery
// Previous library name was
//   +[GTLQueryBBEmbed queryForViewWithpartner:location:style:]

/** Location ID. */
@property(nonatomic, copy, nullable) NSString *location;

/** Partner ID. */
@property(nonatomic, copy, nullable) NSString *partner;

/**
 *  UI embed style to return.
 *
 *  Likely values:
 *    @arg @c kGTLRBBEmbedStyleMasterOnly Value "MASTER_ONLY"
 *    @arg @c kGTLRBBEmbedStyleMasterDetail Value "MASTER_DETAIL"
 */
@property(nonatomic, copy, nullable) NSString *style;

/**
 *  Fetches a @c GTLRBBEmbed_EmbeddedViewSpec.
 *
 *  Retrieve a prepared embedded menu view for a given partner location.
 *
 *  @param partner Partner ID.
 *  @param location Location ID.
 *  @param style UI embed style to return.
 *
 *  Likely values for @c style:
 *    @arg @c kGTLRBBEmbedStyleMasterOnly Value "MASTER_ONLY"
 *    @arg @c kGTLRBBEmbedStyleMasterDetail Value "MASTER_DETAIL"
 *
 *  @returns GTLRBBEmbedQuery_View
 */
+ (instancetype)queryWithPartner:(NSString *)partner
                        location:(NSString *)location
                           style:(NSString *)style;

@end

NS_ASSUME_NONNULL_END