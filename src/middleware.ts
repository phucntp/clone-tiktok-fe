import { NextRequest, NextResponse } from 'next/server'

let locales = ['en', 'vi'];
let defaultLocale = 'en';
let localePaths = ['/en', '/vi'];
const auth = ['register']

export function middleware(request: NextRequest) {
  let authen = false
  const jwt = request.cookies.get('jwt')
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (loc) => !pathname.startsWith(`/${loc}/`) && pathname !== `/${loc}`
  )
  if(pathnameIsMissingLocale) {
    authen = auth.some(
      (auth) => pathname.includes(`/${auth}`) || pathname === '/'
    )
  } else {
    authen = auth.some(
      (auth) => pathname.includes(`/${auth}`) || localePaths.includes(pathname)
    )
  }

  if (authen && !jwt?.value) {
    const locale = defaultLocale
    return NextResponse.redirect(
      new URL(`/${locale}/login`, request.url)
    )
  } else {
    if (pathnameIsMissingLocale) {
      const locale = defaultLocale
      return NextResponse.redirect(
        new URL(`/${locale}/${pathname}`, request.url)
      )
    }
  }
}

export const config = {
  matcher: [
    '/((?!_next).*)',
  ],
}