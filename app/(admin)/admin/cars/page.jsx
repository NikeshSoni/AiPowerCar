import React from 'react'
import CarsList from './create/_components/car-list'


export const metadata = {
    title: "Cars | Nike Admin",
    description: "Manage cars in your marketplace"
}

const CarsPage = () => {
    return (
        <div className='p-6'>
            <h1 className="text-2xl font-bold mb-6 ">
                Cars Management
            </h1>

            <CarsList />
        </div>
    )
}

export default CarsPage
