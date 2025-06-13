"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"
import { Helmet } from "react-helmet"


const BannerHome = () => {
  const [bannerSlides, setBannerSlides] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    fetch("/bannerSlides.json")
      .then((res) => res.json())
      .then((data) => {
        setBannerSlides(data)
        setIsLoadingData(false)
      })
      .catch((error) => {
        console.error("Failed to load banner data:", error)
        setIsLoadingData(false)
      })
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    setIsImageLoading(true)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
    setIsImageLoading(true)
  }

  useEffect(() => {
    if (bannerSlides.length > 0) {
      const img = new Image()
      img.src = bannerSlides[currentSlide].image
      img.onload = () => setIsImageLoading(false)
    }
  }, [currentSlide, bannerSlides])

  if (isLoadingData) {
    return (
      <section className="w-full h-screen flex items-center justify-center bg-black text-white">
        <LoadingSpinner />
      </section>
    )
  }

  if (bannerSlides.length === 0) {
    return (
      <section className="w-full h-screen flex items-center justify-center bg-black text-white">
        <p>No slides available.</p>
      </section>
    )
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black dark:bg-zinc-900">
      {/* Helmet Meta Info */}
      <Helmet>
        <title>Books | Home</title>
      </Helmet>

      <AnimatePresence mode="wait">
        <motion.div
          key={bannerSlides[currentSlide].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center text-white text-center"
        >
          <motion.img
            src={bannerSlides[currentSlide].image}
            alt="Banner"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60 dark:bg-zinc-900/70 backdrop-blur-[3px]"></div>

          {isImageLoading ? (
            <div className="z-20 text-white flex flex-col items-center">
              <div className="h-10 w-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-lg font-semibold">Loading...</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 max-w-4xl px-6 md:px-10"
            >
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-4 text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl dark:text-white"
              >
                {bannerSlides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8 text-lg md:text-2xl text-gray-200 dark:text-gray-300"
              >
                {bannerSlides[currentSlide].subtitle}
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-3 text-lg font-semibold text-white shadow-md hover:from-blue-600 hover:to-cyan-500 transition"
              >
                {bannerSlides[currentSlide].cta}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.button
        onClick={prevSlide}
        aria-label="Previous Slide"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 dark:bg-white/20 p-2 text-white hover:bg-white/20 transition"
      >
        <ChevronLeft className="h-6 w-6" />
      </motion.button>
      <motion.button
        onClick={nextSlide}
        aria-label="Next Slide"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 dark:bg-white/20 p-2 text-white hover:bg-white/20 transition"
      >
        <ChevronRight className="h-6 w-6" />
      </motion.button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 space-x-3">
        {bannerSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setCurrentSlide(index)
              setIsImageLoading(true)
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className={`
              w-4 h-4 rounded-full 
              ${index === currentSlide
                ? "bg-white dark:bg-cyan-400 scale-125 shadow"
                : "bg-white/30 dark:bg-blue-500 hover:bg-white/50"}
              transition duration-300
            `}
          />
        ))}
      </div>
    </section>
  )
}

export default BannerHome
