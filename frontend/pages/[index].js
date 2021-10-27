import Head from "next/head";
import data from "../assets/data.json";
import { useEffect, useState } from "react";
import { fetchData } from "../fetch/post";
import { useRouter } from "next/router";
import { TitleDescription } from "../components/titleDescription";

export default function Home() {
  const router = useRouter();
  const { index } = router.query;
  const [idTail, setIdTail] = useState();

  useEffect(() => {
    const asincrono = async () => {
      if (index) {
        const resp = await fetchData(index);
        setIdTail(resp ? resp.json_id : null);
      }
    };
    asincrono();
  }, [index]);

  return (
    <div className="container">
      <Head>
        <title>Challenge</title>
        <meta name="description" content="Challenge to make" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        {!idTail ? (
          <div>ruta no existe</div>
        ) : (
          data.map((el) => {
            if (idTail === el.id) {
              return (
                <TitleDescription
                  key={el.id}
                  title={el.title}
                  description={el.description}
                ></TitleDescription>
              );
            }
          })
        )}
      </div>
    </div>
  );
}
