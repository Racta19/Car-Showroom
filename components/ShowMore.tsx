"use client"

import React from 'react'
import CustomButton from './CustomButton'
import { useRouter } from 'next/navigation'

interface ShowMoreProps{
  pageNumber: number,
  isNext: boolean
}

const ShowMore = ({pageNumber, isNext}: ShowMoreProps) => {
  const router = useRouter();

  const updateSearchParams = (model: string, manufacturer: string) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Update or delete the 'model' search parameter based on the 'model' value
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    // Update or delete the 'manufacturer' search parameter based on the 'manufacturer' value
    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
       searchParams.delete("manufacturer");
    }

    // Generate the new pathname with the updated search parameters
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname);
  };

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10
    const newPathName = updateSearchParams("limit",`${newLimit}`)
    router.push(newPathName) 
  }

  return (
    <div className='w-full flex-center gap-5 mt-10'>
      {
        !isNext && (
          <CustomButton title='Show More' btnType='button' containerStyles='bg-primary-blue rounded-full text-white' handleClick={handleNavigation} />
        )
      }
    </div>
  )
}

export default ShowMore