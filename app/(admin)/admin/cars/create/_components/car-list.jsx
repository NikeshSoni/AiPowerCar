"use client"
import { deleteCar, getCars, updateCarStatus } from '@/actions/car'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/use-fetch'
import { Plus, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const CarsList = () => {

    const [search, setSearch] = useState("")

    const router = useRouter();

    const {
        loading: loadingCars,
        fn: fetchcars,
        data: carsData,
        error: carsError
    } = useFetch(getCars);

    useEffect(() => {
        fetchcars(search)
    }, [search])


    const {
        loading: deleteCars,
        fn: deleteCarfn,
        data: deleteResult,
        error: deleteError
    } = useFetch(deleteCar);

    const {
        loading: updateingCar,
        fn: updateCarStatusFn,
        data: updateResult,
        error: updateError
    } = useFetch(updateCarStatus);



    const handleSearchSubmit = (e) => {

        e.preventDefault()

        // API Calling 

    }

    return (
        <div className='space-y-4'>
            <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
                <Button
                    onClick={() => router.push("/admin/cars/create")}
                    className="flex items-center">
                    <Plus className='h-4 w-4' /> Add car
                </Button>

                <form className='flex w-full sm:w-auto' onSubmit={handleSearchSubmit}>
                    <div className='relative flex-1'>
                        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 w-full sm:w-60"
                            type="search"
                            placeholder="Search Cars..." />
                    </div>
                </form>
            </div>

            {/* Cars Table   */}


            <Card> 
                <CardContent className="p-0">
                    <p>Card Content</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default CarsList
