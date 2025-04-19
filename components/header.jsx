// components/Header.tsx or wherever you defined it

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "../public/logo.png"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server' // ✅ correct import
import { Button } from './ui/button'
import { ArrowLeft, CarFront, Heart } from 'lucide-react'

const Header = async ({ isAdminPage = false }) => {
  const user = await currentUser()

  const isAdmin = user?.publicMetadata?.role === "admin" // or however you define admin

  return (
    <header className="fixed top-0 w-full bg-white/60 backdrop-blur-md z-50 border-b">
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={isAdminPage ? "/admin" : "/"} className="flex items-center">
          <Image
            alt="Vahiql Logo"
            width={1500}
            height={50}
            className="h-12 w-auto object-contain"
            src={logo}
          />
          {isAdminPage && (
            <span className="text-xs font-extralight ml-2">admin</span>
          )}
        </Link>

        <div className="flex items-center space-x-4">
          {isAdminPage ? (
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft size={18} />
                <span>Back to App</span>
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/saved-cars">
                <Button>
                  <Heart size={18} />
                  <span className="hidden md:inline">Saved Cars</span>
                </Button>
              </Link>

              {isAdmin ? (
                <Link href="/admin">
                  <Button variant="outline">
                    <CarFront size={18} />
                    <span className="hidden md:inline">Admin Portal</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/reservations">
                  <Button variant="outline">
                    <CarFront size={18} />
                    <span className="hidden md:inline">My Reservations</span>
                  </Button>
                </Link>
              )}
            </>
          )}

          <SignedOut>
            <SignInButton forceRedirectUrl="/">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}

export default Header
