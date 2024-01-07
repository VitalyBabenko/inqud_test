export const GET_TAGS_QUERY = `
    query GetTags($locale: SiteLocale = en) {
        allTags(locale: $locale) {
        id
        name
        }
    }
`;
