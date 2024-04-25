import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from '@/styles/Home.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); //デフォルトのイベントをキャンセル UIの更新を防ぐため。

        console.log("title", title, "content", content);
        try { //try-catch文でエラーハンドリング
            await axios.post("http://back:3000/api/v1/posts", { 
                title: title,//titleとcontentをオブジェクトとして送信
                content: content,
            
            }); //	HTTP POSTリクエストを送信 axiosでAPIにデータを送信
            router.push("/"); //ルートページにリダイレクト
        } catch (err){ //エラーが発生した場合の処理を追加できる catchブロック
           alert("エラーが発生しました")
        }
       
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ブログ新規登録</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>タイトル</label>
                <input type="text" 
                className={styles.input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
                <label className={styles.label}>本文</label>
               <textarea 
               className={styles.textarea}
               onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}></textarea>
               <button type="submit" className={styles.button}>登録</button>
            </form>
        </div> //onChangeイベントの型はChangeEvnet<HTMLInputElement>で、e.target.valueで入力された値を取得
    );
}

export default CreatePost;