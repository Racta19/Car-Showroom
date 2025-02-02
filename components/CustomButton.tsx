"use client";

import Image from 'next/image';
import React, { MouseEventHandler } from 'react'

interface CustomButtonProps{
    title: string,
    containerStyles?: string,
    btnType?: "button" | "submit",
    handleClick?: MouseEventHandler<HTMLButtonElement >
    textStyles?: string,
    rightIcon?: string,
    isDisabled?: boolean
}

const CustomButton = ({title, btnType, containerStyles, handleClick, textStyles, rightIcon, isDisabled}: CustomButtonProps) => {
  return (
    <button disabled={isDisabled} type={btnType || 'button'} className={`custom-btn ${containerStyles}`} onClick={handleClick}>
        <span className={`flex-1 ${textStyles}`}>{title}</span>
        {rightIcon && (
          <div className=' relative w-6 h-6'>
            <Image src={rightIcon} alt='right icon' fill className=' object-contain' />
          </div>
        )}
    </button>
  )
}

export default CustomButton