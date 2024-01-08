import { GET_INSIGHTS_PAGE_QUERY } from '@/graphql/getInsights';
import { performRequest } from '@/lib/datocms';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'en';

    const query = GET_INSIGHTS_PAGE_QUERY;
    const variables = { locale };

    const { data } = await performRequest({
      query,
      variables,
    });

    return NextResponse.json(data.insightsPage);
  } catch (error) {
    console.error(error);
  }
}
