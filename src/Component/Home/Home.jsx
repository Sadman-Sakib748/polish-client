import BannerHome from "../Pages/BannerHome/BannerHome";
import CallToAction from "../Pages/CallToAction/CallToAction";
import CommunityStats from "../Pages/CommunityStats/CommunityStats";
import FeaturedCategories from "../Pages/FeaturedCategories/FeaturedCategories";
import PopularBooks from "../Pages/PopularBooks/PopularBooks";



const Home = () => {
    return (
        <div>
            <BannerHome></BannerHome>
            <PopularBooks></PopularBooks>
            <FeaturedCategories />
            <CommunityStats />
            <CallToAction />
        </div>
    );
};

export default Home;