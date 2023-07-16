"use client";


import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import {getProviders} from 'next-auth/react'
import {useSession} from 'next-auth/react'
import {signOut, signIn} from 'next-auth/react'

const Nav = () => {
    const {data : session} = useSession();
    const [providers, setProviders] = useState(null);
    useEffect(() => {
        const setupProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setupProviders();
    }, [])
  return (
    <nav className='flex justify-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
            <Image src='/assets/images/logo.svg' width={30} height={30} className='object-contain'/>
            <p className='logo_text'>Promptopia</p>
        </Link>
    
        <div className='sm:flex hidden'>
            {session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href='/create-prompt' className='black_btn'>Create prompt</Link>
                    <button type='button' className='outline_btn' onClick={signOut}>Sign out</button>

                    <Link href='/profile'>
                        <Image src={session?.user.image} width={37} height={37} className='rounded-full'/>
                    </Link>
                </div>
            ) : (
                <>
                {providers && Object.values(providers).map((provider) => (
                    <button key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign in</button>
                ))}
                 </>
            )}

        </div>
        

    </nav>
  )
}

export default Nav
