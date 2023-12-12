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
      mainTag {
        name
      }
    }
    _allPostsMeta {
      count
    }
  }
`;

export const GET_POSTS_BY_TAGS_QUERY = `
    query GetPostsByTags($search: String!, $in: [ItemId] = "") {
        allPosts(
        filter: {
            OR: [
            { title: { matches: { pattern: $search } } },
            { content: { matches: { pattern: $search } } },
            ],
            AND: [
            { mainTag: { in: $in } }
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
        mainTag {
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
