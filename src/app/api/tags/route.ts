import { GET_TAGS_QUERY } from '@/graphql/getTags';
import { performRequest } from '@/lib/datocms';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { data } = await performRequest({ query: GET_TAGS_QUERY });

    return NextResponse.json(data.allTags);
  } catch (error) {
    console.log(error);
  }
}
