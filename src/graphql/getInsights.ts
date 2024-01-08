export const GET_INSIGHTS_PAGE_QUERY = `
    query GetInsightsPage($locale: SiteLocale = en) {
        insightsPage(locale: $locale) {
        title
        subtitle
        searchButtonText
        searchPlaceholder
        allTagsButtonText
        }
    }
`;
