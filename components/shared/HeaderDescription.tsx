'use client'

import {usePathname} from 'next/navigation'

type Route = '/' | '/wx-server' | '/wx-client' | '/blog'

const description: {[key in Route]: string} = {
  '/': 'About',
  '/wx-server': 'Weather (Server)',
  '/wx-client': 'Weather (Client)',
  '/blog': 'WordPress Blog (Server)'
}

const HeaderDescription = () => {
  const pathname = usePathname()

  return <h2>{description[pathname as Route]}</h2>
}

export default HeaderDescription
