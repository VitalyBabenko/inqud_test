import { performRequest } from '@/lib/datocms';
import { NextRequest, NextResponse } from 'next/server';
import { GET_POSTS_QUERY, GET_POSTS_BY_CATEGORIES_QUERY } from '@/graphql/getPosts';

type RequestVariables = {
  search: string;
  in?: string[];
  first: number;
  skip: number;
  categories?: [string];
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const search = searchParams.get('search') || '';
    const categories = searchParams.getAll('categories[]');
    const first = searchParams.get('first') || 6; //FIXME: add variable ALL_POSTS_COUNT
    const skip = searchParams.get('skip') || 0;

    const query = categories.length ? GET_POSTS_BY_CATEGORIES_QUERY : GET_POSTS_QUERY;
    const variables: RequestVariables = {
      search,
      first: +first,
      skip: +skip,
    };

    categories.length ? (variables.in = categories) : null;

    const response = await performRequest({
      query,
      variables,
    });

    return NextResponse.json({
      posts: response.data.allPosts,
      postsCount: response.data._allPostsMeta.count,
    });
  } catch (error) {
    console.log(error);
  }
}
