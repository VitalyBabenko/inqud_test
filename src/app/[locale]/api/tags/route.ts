import { GET_TAGS_QUERY } from '@/graphql/getTags';
import { performRequest } from '@/lib/datocms';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const locale = req.nextUrl.pathname.split('/')[1] || 'en';
    const query = GET_TAGS_QUERY;
    const variables = {
      locale,
    };

    const { data } = await performRequest({ query, variables });

    return NextResponse.json(data.allTags);
  } catch (error) {
    console.log(`Get tags error: ${error}`);
    return NextResponse.json(['error']);
  }
}
