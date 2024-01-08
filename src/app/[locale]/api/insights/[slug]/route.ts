import { GET_FULL_POST } from '@/graphql/getPost';
import { performRequest } from '@/lib/datocms';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const locale = req.nextUrl.searchParams.get('locale');
    const pathname = req.nextUrl.pathname;
    const pathParts = pathname.split('/');
    const slug = pathParts[pathParts.length - 1];

    const { data } = await performRequest({
      query: GET_FULL_POST,
      variables: {
        slug,
        locale,
      },
    });

    return NextResponse.json({ post: data.post });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: `getPost error: ${error}`,
    });
  }
}
