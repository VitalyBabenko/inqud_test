import { GET_INSIGHTS_PAGE_QUERY } from '@/graphql/getInsights';
import { performRequest } from '@/lib/datocms';
import { NextRequest, NextResponse } from 'next/server';

type RequestVariables = {
  locale: string;
  search: string;
  first: number;
  skip: number;
  in?: string[];
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'en';
    const search = searchParams.get('search') || '';
    const first = Number(searchParams.get('first')) || 6; //FIXME: add variable ALL_POSTS_COUNT
    const skip = Number(searchParams.get('skip')) || 0;
    const tags = searchParams.getAll('tags[]');

    const variables: RequestVariables = {
      locale,
      search,
      first,
      skip,
    };
    if (tags?.length) {
      variables.in = tags;
      variables.skip = 0;
    }

    const { data } = await performRequest({
      query: GET_INSIGHTS_PAGE_QUERY,
      variables,
    });

    console.log({ searchParams, locale, search, tags });

    let postsCount;
    if (search.length || tags.length) {
      postsCount = data.allPosts.length;
    } else {
      postsCount = data._allPostsMeta?.count;
    }

    const result = {
      pageContent: data.insightsPage,
      tags: data.allTags,
      posts: data.allPosts,
      postsCount,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
  }
}
