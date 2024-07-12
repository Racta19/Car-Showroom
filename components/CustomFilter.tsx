"use client"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'

interface optionProps{
  title: string,
  value: string
}

interface CustomFilterProps{
    title: string,
    options: optionProps[]
}

const CustomFilter = ({title, options}: CustomFilterProps) => {
  const router = useRouter()
  const [selected, setSelected] = useState(options[0])
  
  const handleUpdateParams = (type: string, value: string) => {

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(type.toLowerCase(), value.toLowerCase())
 
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    router.push(newPathname)
  }

  return (
    <div className='w-fit'>
      <Listbox value={selected} onChange={(e) => {setSelected(e); handleUpdateParams(e.title, e.value)}}>
        <div className='relative w-fit z-10'>
          <ListboxButton className='custom-filter__btn'>
            <span className='block truncate '>{selected.title}</span>
            <Image src='/chevron-up-down.svg' width={20} height={20} className='ml-4 object-contain' alt='chevron up down' />
          </ListboxButton>

          <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <ListboxOptions className='custom-filter__option'>
              {options.map((option) => (
                <ListboxOption key={option.title} value={option} className={({focus}) => `relative cursor-default select-none py-2 px-4 ${focus ? 'bg-primary-blue text-white': 'text-gray-900'}`}>{({selected}) => (
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{option.title}</span>
                )}</ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter