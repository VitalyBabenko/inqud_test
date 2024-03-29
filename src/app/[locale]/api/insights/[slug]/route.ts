import { NextRequest, NextResponse } from 'next/server';
import { GET_FULL_POST_QUERY } from '@/graphql/getFullPost';
import { performRequest } from '@/lib/datocms';

export async function GET(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const pathParts = pathname.split('/');
    const slug = pathParts[pathParts.length - 1];
    const { searchParams } = new URL(req.nextUrl);
    const locale = searchParams.get('locale');

    if (!locale) {
      console.error({ locale });
    }

    const { data } = await performRequest({
      query: GET_FULL_POST_QUERY,
      variables: {
        slug,
        locale,
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
