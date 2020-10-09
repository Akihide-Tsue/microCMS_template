import Link from 'next/link';
export default function Home({ page }) {
//page は設定したAPIエンドポイント

  return (
    <div>
      <ul>
        {page.map(page => (
          <li key={page.id}>
            <Link href={`page/${page.id}`}>
              <a>{page.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://jamstack-template.microcms.io/api/v1/page', key)
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      page: data.contents,
    },
  };
};