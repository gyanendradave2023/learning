import { useEffect } from "react"
import { GetCurrentUser } from "../../api/users"; // ES module syntax for importing a named export

const Home = () => {

  useEffect(() => {
    const fetchUser = async () => {
      const response = await GetCurrentUser();
      console.log("response", response);
    }
    fetchUser();
  },[]);
   
  return (
    <div>Home</div>
  )
}

export default Home