import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <>
      <h2 className='text-3xl pt-10 pb-2'>{pid}</h2>
    </>
  );
}
