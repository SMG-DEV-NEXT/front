'use client'
import { getAccessToken } from '@/utils/token'
import { useLocale } from 'next-intl'
import { redirect } from 'next/navigation'
import REact from 'react'

const ProtectedAdminRoute = ({children}) => {
    const token = getAccessToken()
    const locale = useLocale()
    if(token){
        redirect(`/${locale}/admin/dashboard`)
    }
    return children
}

export default ProtectedAdminRoute