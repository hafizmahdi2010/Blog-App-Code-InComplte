import Navbar from "../components/Navbar";
import Blog_Card from "../components/Blog_Card";
import { useEffect, useState } from "react";
import { api_base_url } from "../helper/Helper";

const Home = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  function getBlogs() {
    fetch(api_base_url + "/getBlogs", { mode: "cors", method: "GET" }).then(res => res.json()).then(data => {
      if (data.success == false) {
        setError(data.message)
      }
      else {
        setData(data.blogs);
        console.log(data.blogs)
      }
    })
  };

  useEffect(() => {
    getBlogs();
  }, [])

  return (
    <>
      <Navbar />
      <div className="grid-itmes my-3 mt-5">
        {
          data ? data.map((el) => {
            return (
              <Blog_Card blog={el}/>
            )
          }) : ""
        }

      </div>
    </>
  );
};

export default Home;
