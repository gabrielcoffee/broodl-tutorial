'use client'
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import React from 'react'
import Button from './Button';

export default function CallToAction() {
    const { currentUser } = useAuth();

    if (currentUser) {
        return (
            <div className="mx-auto max-w-[600px] w-full">
                <Link href={'/dashboard'}>
                    <Button dark full text="Go to Dashboard"/>
                </Link>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
            <Link href={'/dashboard'}>
            <Button text="Sign up"/>
            </Link>

            <Link href={'/dashboard'}>
            <Button text="Login" dark/>
            </Link>
            
        </div>
    )
}
