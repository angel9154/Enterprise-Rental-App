"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

const DiscoverSection = () => {
  return (
    <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.8 }}
    variants={containerVariants}
    className="py-24 px-6 sm:px-8 lg:px-12 xl:px-16 bg-white"
     >
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
            <motion.div
            variants={itemVariants}
            className="text-center my-12"
            >
               <h2 className='text-3xl font-semibold leading-tight text-gray-800'>
                Discover 
                </h2>
                <p className='mt-4 text-lg text-gray-600'>
                    Find Your Dream Rental Property Today!
                </p>
                <p className='mt-2 text-gray-500 max-w-3xl mx-auto'>
                    Searching for your dream rental property has never been easier.
                    Rentiful offers a wide range of rental properties tailored to fit your lifestyle and needs.
                    Start your journey with us today and find the perfect place to call home.
                </p>
            </motion.div>
            <div className="flex flex-col lg:flex-row lg:space-x-4">
             {[
                {
                    imageSrc: "/landing-icon-wand.png",
                    title: "Search for Properties",
                    description: "Search for rental properties by city, neighborhood or address",
                },
                {
                    imageSrc: "/landing-icon-calendar.png",
                    title: "Book your Rental",
                    description: "Once you find your dream rental property, book it with ease",
                },
                {
                    imageSrc: "/landing-icon-heart.png",
                    title: "Enjoy Your New Home",
                    description: "Move into your rental property and enjoy your new home",
                },
            ].map((card, index) => (
                 <motion.div key={index} variants={itemVariants}>
                    <DiscoverCard {...card} />

                 </motion.div>
            ))}

            
                 
            </div>
        </div>
    </motion.div>
  )
}

const DiscoverCard = ({
    imageSrc, 
    title,
    description,
    
}:{
    imageSrc: string, 
    title: string,
    description: string,
  
}) => (
    <div className="text-center px-4 py-12 shadow-lg rounded-lg bg-primary-50 md:h-72">
        <div className='bg-primary-700 p-[0.6rem] rounded-full mb-4 h-10 w-10 mx-auto'>
            <Image 
            src={imageSrc}
            width={30}
            height={30}
            className='w-full h-full '
            alt={title}
            />
        </div>
        <h3 className='mt-4 text-xl font-medium text-gray-800'>{title}</h3>
        <p className='mt--2 text-base text-gray-500'>{description}</p>
        

    </div>
)
export default DiscoverSection