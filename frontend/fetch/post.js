export async function fetchData(param) {
  const options = {
    method: "POST",
    body: JSON.stringify({
      query: `
        query fetchTailWhere ($tailParam: String){
          long_tails(where: {tail: {_eq: $tailParam}}) {
            json_id
          }
        }
        `,
      variables: {
        tailParam: param,
      },
      operationName: "fetchTailWhere",
    }),
  };
  const res = await fetch(process.env.ENDPOINT_HASURA, options);
  const respuesta = await res.json();
  return respuesta.data.long_tails[0];
}
