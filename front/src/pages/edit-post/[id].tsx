import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from '@/styles/Home.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Post } from '@/types';

type Props  = {
    post: Post;
}

export async function getServerSideProps(context: any) { //SSR = リクエスト時のみデータを取得したい時使用。の場合はgetServerSidePropsを使用
    const id = context.params.id; //idを取得
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts/${id}`); //Next.jsは取得したデータを静的ページとして事前に用意する
    const post = await res.json(); 
    return {
        props: {
            post,
        },
    };
}


const EditPost = ({ post }: Props) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const router = useRouter();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); //デフォルトのイベントをキャンセル UIの更新を防ぐため。

        console.log("title", title, "content", content);
        try { //try-catch文でエラーハンドリング
            await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts/${post.id}`, { 
                title: title,//titleとcontentをオブジェクトとして送信
                content: content,
            
            }); //	HTTP POSTリクエストを送信 axiosでAPIにデータを送信
            router.push("/"); //ルートページにリダイレクト
        } catch (err){ //エラーが発生した場合の処理を追加できる catchブロック
           alert("編集に失敗しました")
        }
       
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ブログ編集</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>タイトル</label>
                <input type="text" 
                className={styles.input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                value={title}
                />
                <label className={styles.label}>本文</label>
               <textarea 
               className={styles.textarea}
               onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
               value={content}></textarea>
               <button type="submit" className={styles.button}>編集</button>
            </form>
        </div> //onChangeイベントの型はChangeEvnet<HTMLInputElement>で、e.target.valueで入力された値を取得
    );
}

export default EditPost;