
import BannerComponent from './BannerComponent'
import MoviesComponent from './MoviesComponent'

function HomeComponent() {
 
  return (
    <div className='w-full p-4'>
        <BannerComponent />
        <MoviesComponent />
    </div>
  )
}

export default HomeComponent