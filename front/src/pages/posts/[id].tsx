import React from 'react';
import type { Post } from '@/types'; //Post型をインポート
import { useRouter } from 'next/router';
import styles from '@/styles/Post.module.css';

type Props = {
    post: Post;
}

//pages/posts/[id].tsx

export async function getStaticPaths() { //ビルド時に動的ルーティングの設定時に使用される = getStaticPaths
    const res = await fetch('http://back:3000/api/v1/posts'); //Next.jsは取得したデータを静的ページとして事前に用意する
    const posts: Post[] = await res.json();
    const paths = posts.map((post) => ({
        params: { id: post.id.toString() },//文字列に変換し、URLパラメータとして使用
    })); //idを取得してパスを生成
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({params}: {params: { id: string } }) { //データを事前に取得してサーバーサイドで事前にhttp://localhost:3001/api/v1/postsからデータを生成
    const res = await fetch(`http://back:3000/api/v1/posts/${params.id}`); //idを使用して、動的に外部APIからデータを取得
    const post = await res.json();
  
    console.log("post",post);
  
    return{ //posts 外部APIから取得したデータをpropsにセット
      props:{
        post,// 取得した投稿データをpostという名前のpropsとしてセット //オブジェクトとしてセット
      },
      revalidate: 60,// ISR(Incremental Static Regeneration)の設定。60秒後にページの再生成を許可
    };
  }
const Post = ({ post }: Props) => {
    const router = useRouter(); //useRouterフックを使用して、routerオブジェクトを取得
    if (router.isFallback) { //isFallbackプロパティを使用して、データが取得されるまでの間に表示されるコンテンツを作成 //オブジェクトに対してプロパティを使用できる
        return <div>Loading...</div>
    }
    return (
        <div className={styles.container}>
            <div className={styles.title}>{post.title}</div>
            <div className={styles.date}>{post.created_at}</div>
            <p className={styles.content}>{post.content}</p>
        </div>
    );
}

export default Post;