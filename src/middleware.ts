import { NextRequest, NextResponse } from 'next/server'

let locales = ['en', 'vi'];
let defaultLocale = 'en';

const auth = ['register']

const isLogin = false

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  const authen = auth.every(
    (auth) => pathname.startsWith(`/${auth}/`) || pathname === `/${auth}`
  )

  console.log(authen)

  if (authen && !isLogin) {
    const locale = defaultLocale
    return NextResponse.redirect(
      new URL(`/${locale}`, request.url)
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