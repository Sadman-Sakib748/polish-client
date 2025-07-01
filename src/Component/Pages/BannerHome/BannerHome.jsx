import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img1 from '../../../assets/img1.jpg';
import img2 from '../../../assets/img2.jpg';
import img3 from '../../../assets/img3.jpg';




import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link, useParams } from 'react-router';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const BannerHome = () => {
  const { id } = useParams();

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{ delay: 3000 }}
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div className="relative w-full h-[400px]">
          <img
            src={img1}
            alt="Banner 1"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 flex items-center h-full px-10 text-white bg-opacity-40">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold mb-4">Discover Your Next Great Read</h2>
              <p className="mb-6 text-lg">
                Join thousands of book lovers in building their digital library
              </p>
              <Link to={`/Bookshelf`}>
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded shadow-lg transition">
                  Start Reading
                </button>
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div className="relative w-full h-[400px]">
          <img
            src={img2}
            alt="Banner 2"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 flex items-center h-full px-10 text-white  bg-opacity-40">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold mb-4">Track Your Reading Journey</h2>
              <p className="mb-6 text-lg">
                Monitor your progress and celebrate your achievements
              </p>
              <Link to={`/profile`}>
                <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded shadow-lg transition">
                  View Progress
                </button>
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide>
        <div className="relative w-full h-[400px]">
          <img
            src={img3}
            alt="Banner 3"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 flex items-center h-full px-10 text-white  bg-opacity-40">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold mb-4">Share Your Reviews</h2>
              <p className="mb-6 text-lg">
                Help others discover amazing books through your insights
              </p>
              <Link>
                <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded shadow-lg transition">
                  Write Review
                </button>
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default BannerHome;
