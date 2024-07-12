import axios from "axios";
import { useEffect, useState } from "react"

function BannerComponent() {

  const [bannerImg, setBannerImg] = useState(`https://bbdu.ac.in/wp-content/uploads/2020/02/utkarsh-website-banner-background.jpg`);
  const [bannerTitle, setBannerTitle] = useState('Title');

  useEffect( () => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=2af4c018ae5207101f6076ee341dc30d&language=en-US&page=1`)
    .then(response => {
      setBannerImg(response.data.results[0].backdrop_path)
      setBannerTitle(response.data.results[0].title)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, []);

  return (
    <div className='h-[30vh] md:h-[50vh] w-full bg-cover flex items-end justify-center p-4' style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${bannerImg})`}}>
        <div className='text-white text-4xl'>
            {bannerTitle}
        </div>
        
    </div>
  )
}

export default BannerComponent