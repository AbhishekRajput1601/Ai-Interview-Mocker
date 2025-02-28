"use client"
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function Header() {
    const path = usePathname()
    return (
        <div className='flex items-center justify-between bg-secondary shadow-sm'>
            <Image
                src={'/download-removebg-preview.png'}
                width={160}
                height={100}
                alt='logo'
                className='bg-transparent ml-10'
            />
            <ul className='hidden md:flex gap-12'>
                <Link href="/dashboard">
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path =='/dashboard' && 'text-primary font-bold'}`
                    }>Dashboard</li>
                </Link>
                <Link href="/dashboard/how">
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path =='/dashboard/how' && 'text-primary font-bold'}`
                    }>How it Works?</li>
                </Link>
                <Link href="/dashboard/review">
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path =='/dashboard/review' && 'text-primary font-bold'}`
                    }>Review</li>
                </Link>
            </ul>
            <div className='mr-10'> <UserButton /> </div>
        </div>
    )
}

export default Header