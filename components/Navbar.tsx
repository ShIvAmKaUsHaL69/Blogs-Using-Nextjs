import { auth, signOut, signIn } from '@/auth'
import Image from 'next/image';
import Link from 'next/link'



export default async function Navbar() {
    const session = await auth()
    return (
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center'>
                <Link href='/'>
                    <img src='/logo.png' alt='logo' width={250} height={42} className='rounded-full' />
                </Link>

                <div className='flex items-center gap-5 text-black'>
                    {session && session?.user ? (
                        <>
                            <Link href='/blogs/create'>
                                <span>Create</span>
                            </Link>
                            <form action={async () => {
                                'use server';
                                await signOut({ redirectTo: '/' })
                            }}>
                                <button type='submit'>signout</button>
                            </form>
                            <Link href={`/user/${session?.id}`}>
                            <Image src={session?.user?.image} alt='placeholder' width={48} height={48} className='rounded-full'/>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            "use server";
                            await signIn('github')
                        }}>
                            <button type='submit'>Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}
