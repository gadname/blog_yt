import Head   from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Post } from "@/types";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  posts: Post[];
}

export async function getStaticProps() { //データを事前に取得してサーバーサイドで事前にhttp://localhost:3001/api/v1/postsからデータを生成
  const res = await fetch("http://back:3000/api/v1/posts");
  const posts = await res.json();

  console.log("posts",posts);

  return{ //posts 外部APIから取得したデータをpropsにセット
    props:{
      posts,
    },
    revalidate: 60 * 60 * 24,
  };
}

export default function Home({ posts }: Props) { //postsオブジェクトの型を定義
  const router = useRouter();
  const handleDelete = async (postId: string) => {
    try{
      await axios.delete(`http://back:3000/api/v1/posts/${postId}`);
  router.push("/");
    } catch (err) {
      alert("削除に失敗しました")
    }
  }
  return (
    <>
    <Head>
      <title>Next</title>
      <meta name="description" content="Next.js" />
      <meta name="keywords" content="Next.js" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

 <div className={styles.homeContainer}>
  <h2>Blog</h2>
  <Link href="/create-post" className={styles.createButton}>
    Create New Post
  </Link>
    <div>
      {posts.map((post: Post) => ( //postという新しい配列を作成
        <div key={post.id} className={styles.postcard}>
          <Link href={`post/${post.id}`} className={styles.postcardBox}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.content}</p>
         <Link href={`posts/${post.id}`}>
         </Link>
         <Link href={`edit-post/${post.id}`}>
          <button className={styles.editButton}>Edit</button>
          </Link>
          <button className={styles.deleteButton} onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
        ))}
    </div>
    </div>
    </>
  );
}