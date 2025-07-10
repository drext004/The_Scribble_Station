import Bloglist from "./Bloglist";
import useFetch from "./useFetch";


const Home = () => {
   const {data: blogs, isPending, error}= useFetch(`${process.env.REACT_APP_BACKEND_URL}/posts`);
   console.log(`${process.env.REACT_APP_BACKEND_URL}/posts`);
    return (
        <div className="home">
            {error && <div>{ error }</div>}
            {isPending && <div> Loading...</div>}
            {blogs && < Bloglist blogs={blogs} title='All blogs' />}
        </div>
     );
}
 
export default Home;