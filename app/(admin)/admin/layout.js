import React from 'react';
import { getAdmin } from "@/actions/admin"
import { notFound } from 'next/navigation';
import Headers from "@/components/header"

const AdminLayout = async () => {

  const admin = await getAdmin()

  if (!admin.authorized) {
    return notFound()
  }
  return (
    <div className='h-full'>
      <Headers isAdminPage={true} />
    </div>
  )
}

export default AdminLayout
