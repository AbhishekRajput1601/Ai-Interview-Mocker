"use client"
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {

    const path = usePathname()
return (
    <div className='flex items-center justify-between bg-secondary shadow-sm'>
        <Image
            src={'/download-removebg-preview.png'}
            width={160}
            height={100}
            alt='logo'
            className='bg-transparent ml-4'
        />
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
             ${path =='/dashboard' && 'text-primary hover:font-bold'}`
            }>Dashboard</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
             ${path =='/dashboard/questions' && 'text-primary hover:font-bold'}`
            }>Question</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
             ${path =='/dashboard/upgrade' && 'text-primary hover:font-bold'}`
            }>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
             ${path =='/dashboard/how' && 'text-primary hover:font-bold'}`
            }>How it Works?</li>
        </ul>
       <div className='mr-6'> <UserButton /> </div>
    </div>

 )
}

export default Header