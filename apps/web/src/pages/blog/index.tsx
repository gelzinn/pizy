import { useEffect, useState } from "react";

import Head from "next/head";

import Header from "../../components/Header";
import LoadingLemon from "../../components/Loaders/LoadingLemon";
import { db } from "../../services/firebase";

function Blog() {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const getBlogPosts = async () => {
  //     db.collection("posts")
  //       .get()
  //       .then(response => {
  //         return setPosts(
  //           response.docs.map(doc => ({
  //             ...doc.data(),
  //             id: doc.id,
  //           })),
  //         );
  //       });
  //   };

  //   getBlogPosts();
  // }, []);

  return (
    <>
      <Head>
        <title>
          PIZY · Novidades fresquinhas sobre o mundo de desenvolvimento.
        </title>
      </Head>

      <Header light />

      <main>
        <h1>Blog</h1>
        {/* {posts && posts.length > 0 ? (
          posts.map(post => {
            return (
              <div key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.summary}</p>
              </div>
            );
          })
        ) : (
          <LoadingLemon />
        )} */}

        <LoadingLemon />
      </main>
    </>
  );
}

export default Blog;
