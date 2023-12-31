import { performRequest } from '@/lib/datocms';
import { NextRequest, NextResponse } from 'next/server';
import { GET_POSTS_QUERY, GET_POSTS_BY_TAGS_QUERY } from '@/graphql/getPosts';

type RequestVariables = {
  search: string;
  in?: string[];
  first: number;
  skip: number;
  tags?: [string];
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URLSearchParams(req.url);
    const search = searchParams.get('search') || '';
    const tags = searchParams.getAll('tags[]');
    const first = searchParams.get('first') || 6; //FIXME: add variable ALL_POSTS_COUNT
    const skip = searchParams.get('skip') || 0;

    const query = tags?.length ? GET_POSTS_BY_TAGS_QUERY : GET_POSTS_QUERY;
    const variables: RequestVariables = {
      search,
      first: +first,
      skip: +skip,
    };

    if (tags?.length) {
      variables.in = tags;
    }

    const { data } = await performRequest({
      query,
      variables,
    });

    const posts = data.allPosts;
    let postsCount;
    if (search.length) {
      postsCount = data.allPosts.length;
    } else if (data?._allPostsMeta?.count) {
      postsCount = data?._allPostsMeta?.count;
    } else {
      postsCount = data.allPosts.length;
    }

    return NextResponse.json({
      posts,
      postsCount,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: `getPosts error: ${error}`,
    });
  }
}
