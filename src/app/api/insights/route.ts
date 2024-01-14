import { GET_FULL_POST_QUERY } from '@/graphql/getFullPost';
import { GET_INSIGHTS_PAGE_QUERY } from '@/graphql/getInsights';
import { performRequest } from '@/lib/datocms';
import { InsightsRequestVariables } from '@/types/insightsPage';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body?.slug) {
    // send one post
    try {
      const { data } = await performRequest({
        query: GET_FULL_POST_QUERY,
        variables: {
          slug: body.slug,
          locale: body.locale,
        },
      });
      return NextResponse.json({ pageContent: data.postPage, post: data.post });
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        message: `getPost error: ${error}`,
      });
    }
  }

  try {
    // send all posts
    const variables: InsightsRequestVariables = {
      locale: body.locale || 'en',
      search: body.search || '',
      first: body.first || 6, //FIXME: add variable ALL_POSTS_COUNT
      skip: body.skip || 0,
    };
    if (body.tags?.length) {
      variables.in = body.tags;
      variables.skip = 0;
    }
    const { data } = await performRequest({
      query: GET_INSIGHTS_PAGE_QUERY,
      variables,
    });
    let postsCount;
    if (variables.search.length || variables?.in?.length) {
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
    return NextResponse.json(error);
  }
}
