import { performRequest } from '@/lib/datocms';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { GET_POSTS_QUERY, GET_POSTS_BY_CATEGORIES_QUERY } from '@/graphql/getPosts';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const search = searchParams.get('search') || '';
    const categories = searchParams.getAll('categories[]');
    const query = categories.length ? GET_POSTS_BY_CATEGORIES_QUERY : GET_POSTS_QUERY;
    const variables: { search: string; in?: string[] } = {
      search,
    };
    categories.length ? (variables.in = categories) : null;

    const response = await performRequest({
      query,
      variables,
    });

    return NextResponse.json(response.data.allPosts);
  } catch (error) {
    console.log(error);
  }
}
