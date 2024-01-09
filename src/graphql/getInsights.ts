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
                emptyPostsText
                timeToReadText
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
