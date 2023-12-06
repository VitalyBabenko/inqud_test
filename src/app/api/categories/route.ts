import { GET_CATEGORIES_QUERY } from '@/graphql/getCategories';
import { performRequest } from '@/lib/datocms';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { data } = await performRequest({ query: GET_CATEGORIES_QUERY });

    return NextResponse.json(data.allCategories);
  } catch (error) {
    console.log(error);
  }
}
