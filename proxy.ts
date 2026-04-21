import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ROUTE_ROLES: Record<string, string> = {
	'/client': 'client',
	'/owner': 'owner',
	'/admin': 'admin',
}

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl
	const role = request.cookies.get('auth-role')?.value

	const requiredRole = ROUTE_ROLES[pathname]

	if (requiredRole) {
		if (role !== requiredRole) {
			return NextResponse.redirect(new URL('/login', request.url))
		}
	}

	if (pathname === '/login' && role && ROUTE_ROLES[`/${role}`]) {
		return NextResponse.redirect(new URL(`/${role}`, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/client', '/owner', '/admin', '/login'],
}
