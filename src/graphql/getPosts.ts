// export const GET_POSTS_QUERY = `
//     query GetPosts($search: String!) {
//         allPosts(
//         filter: {
//             OR: [
//             { title: { matches: { pattern: $search } } }
//             { content: { matches: { pattern: $search } } }
//             ]
//         }
//         ) {
//         id
//         publishDate
//         slug
//         title
//         coverImage {
//             url
//         }
//         mainCategory {
//             name
//         }
//         content {
//             value
//         }
//         }
//     }
// `;

export const GET_POSTS_QUERY = `
query GetPosts($search: String!, $first: IntType = 9, $skip: IntType = 0) {
    allPosts(
      filter: {OR: [{title: {matches: {pattern: $search}}}, {content: {matches: {pattern: $search}}}]}
      first: $first
      skip: $skip
    ) {
      id
      publishDate
      slug
      title
      coverImage {
        url
      }
      content {
        value
      }
      mainCategory {
        name
      }
    }
    _allPostsMeta {
      count
    }
  }
`;

export const GET_POSTS_BY_CATEGORIES_QUERY = `
    query GetPostsByCategories($search: String!, $in: [ItemId] = "") {
        allPosts(
        filter: {
            OR: [
            { title: { matches: { pattern: $search } } },
            { content: { matches: { pattern: $search } } },
            ],
            AND: [
            { mainCategory: { in: $in } }
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
        mainCategory {
            name
        }
        content {
            value
        }
        }
        _allPostsMeta {
            count
        }
    }
`;
