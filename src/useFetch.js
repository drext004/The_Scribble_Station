import { useEffect, useState } from "react";

const useFetch= (url) => {
    const [data, setData] = useState(null);
    const [isPending, setisPending]= useState(true);
    const [error, setError]= useState(null);

    useEffect(()=>{
      const abortCont= new AbortController();
    setTimeout(()=> {
      fetch(url,{signal: abortCont.signal })
    .then(res =>{
      // console.log(res);
      if(!res.ok){
        throw Error('Could not fetch the data for that resource');

      }
      return res.json();
    })
      .then(data=>{
        // console.log(data);
        setData(data);
        setisPending(false);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          setError(err.message);
        setisPending(false);  
        }
      })
    },500)

    return ()=> abortCont.abort();
  },[url]);

  return {data, isPending, error};
}


export default useFetch;