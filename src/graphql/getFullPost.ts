export const GET_FULL_POST_QUERY = `
    query GetFullPost($slug: String!, $locale: SiteLocale = en) {
        post(filter: { slug: { eq: $slug } }, locale: $locale) {
        title
        allTags {
            name
        }
        authors {
            name
        }
        content {
            title
            text {
            value
            }
            image {
            url
            }
        }
        timeToRead
        publishDate
        industries {
            name
        }
        products {
            name
        }
        }
        tag {
            name
        }
        postPage(locale:$locale) {
            backButtonText
            leftAsideTitle
            industriesTitle
            productsTitle
            tagsTitle
            authorsTitle        
        }
    }
`;
