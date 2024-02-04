import { NextRequest, NextResponse } from "next/server";

export default function middleware(request : NextRequest){
    const path = request.nextUrl.pathname
    const isPrivatePath = path === '/questions' 

  const token = request.cookies.get('token')?.value || ''

  if(isPrivatePath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }   

}

