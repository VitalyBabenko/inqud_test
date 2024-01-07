export const GET_HEADER_QUERY = `
    query GetHeader($locale: SiteLocale = en) {
        header(locale: $locale) {
        loginbuttontext
        signupbuttontext
        logo {
            url
        }
        logolinks {
            href
            name
        }
        navigation {
                ... on DropdownlinkRecord {
                id
                title
                sublinks {
                    id
                    name
                    href
                }
                name
                }
                ... on LinkRecord {
                id
                name
                href
                }
            }
        }
    }
`;
