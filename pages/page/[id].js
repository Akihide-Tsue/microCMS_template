import styles from '../../styles/Home.module.scss'
export default function BlogId({ page }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{page.title}</h1>
      <p className={styles.publishedAt}>{page.publishedAt}</p>
      <p className={styles.category}>{page.category && `${page.category.name}`}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${page.body}`,
        }}
        className={styles.post}
      />
    </main>
  );
}
// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://jamstack-template.microcms.io/api/v1/page', key)
    .then(res => res.json())
    .catch(() => null);

  const paths = data.contents.map(content => `/page/${content.id}`);
  return { paths, fallback: false };
};
// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async context => {
  const id = context.params.id;
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch(
    'https://jamstack-template.microcms.io/api/v1/page/' + id,
    key,
  )
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      page: data,
    },
  };
};