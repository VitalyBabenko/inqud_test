import { GET_HEADER_QUERY } from '@/graphql/getHeader';
import { performRequest } from '@/lib/datocms';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const locale = req.nextUrl.searchParams.get('locale');

    const { data } = await performRequest({
      query: GET_HEADER_QUERY,
      variables: {
        locale,
      },
    });

    return NextResponse.json({ header: data.header });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: `getHeader error: ${error}`,
    });
  }
}
