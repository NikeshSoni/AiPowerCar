import React from 'react'
import AddcarForm from './_components/add-car-form'


export const metadata = {
    title: "Add New Car | Niks Admin",
    description: "Add a new car to the marketplace"
}

const AddCarPage = () => {
    return (
        <div className='p-6'>
            <h1 className="text-2xl font-bold mb-6 ">
                Add New Car
            </h1>

            <AddcarForm />
        </div>
    )
}

export default AddCarPage
