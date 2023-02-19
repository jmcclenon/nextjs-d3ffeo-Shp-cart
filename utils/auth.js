import { getSession } from 'next-auth/client';

export async function checkAuth(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: { session } };
}
