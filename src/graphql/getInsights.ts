// export const GET_INSIGHTS_PAGE_QUERY = `
//     query GetInsightsPage($locale: SiteLocale = en) {
//         insightsPage(locale: $locale) {
//         title
//         subtitle
//         searchButtonText
//         searchPlaceholder
//         allTagsButtonText
//         }
//     }
// `;

// export const GET_INSIGHTS_PAGE_QUERY = `
//     query GetInsightsPage($search: String = "", $first: IntType = 9, $skip: IntType = 0, $locale: SiteLocale = en) {
//         insightsPage(locale: $locale) {
//             title
//             subtitle
//             searchButtonText
//             searchPlaceholder
//             allTagsButtonText
//         }
//         allPosts(
//             filter: { OR: [{ title: { matches: { pattern: $search } } }] }
//             first: $first
//             skip: $skip
//             locale: $locale
//         ) {
//             id
//             publishDate
//             slug
//             title
//             coverImage {
//             url
//             }
//             timeToRead
//             mainTag {
//             name
//             }
//         }
//         _allPostsMeta {
//             count
//         }
//         allTags(locale: $locale) {
//             id
//             name
//         }
//     }
// `;

export const GET_INSIGHTS_PAGE_QUERY = `
    query GetInsightsPage(
        $search: String = "",
        $first: IntType = 9,
        $in: [ItemId],
        $skip: IntType = 0,
        $locale: SiteLocale = en
        ) {
            insightsPage(locale: $locale) {
                title
                subtitle
                searchButtonText
                searchPlaceholder
                allTagsButtonText
            }

            allPosts(
                first: $first
                skip: $skip
                locale: $locale
                filter: {
                    OR: [
                    {
                        title: {
                        matches: { pattern: $search }
                        }
                        mainTag: { in: $in }
                    }
                    {
                        title: {
                        matches: { pattern: $search }
                        }
                        mainTag: { exists: false }
                    }
                    ]
                }
            ) {
                id
                publishDate
                slug
                title
                coverImage {
                    url
                }
                timeToRead
                mainTag {
                    name
                }   
            }

            _allPostsMeta {
            count
            }

            allTags(locale: $locale) {
            id
            name
            }
    }
`;
