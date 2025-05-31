"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { addcar } from '@/actions/car';
import useFetch from '@/hooks/use-fetch';


const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"];
const transmissions = ["Automatic", "Manual", "Semi-Automatic"];
const bodyTypes = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Convertible",
  "Coupe",
  "Wagon",
  "Pickup",
];

const carStatuses = ["AVAILABLE", "UNAVAILABLE", "SOLD"];

const AddcarForm = () => {

  const [activeTab, setActiveTab] = useState("ai");

  const [uploadedImages, setUploadedImages] = useState([]);

  const [imageError, setImageError] = useState("")

  const carFormSchema = z.object({
    make: z.string().min(1, "make is required"),
    model: z.string().min(1, "model is required"),
    year: z.string().refine((val) => {
      const year = parseInt(val);

      return (
        !isNaN(year) && year >= 1900 && year <= new Date().getFullYear() + 1
      );
    }, "valid year is require"),
    price: z.string().min(1, "Price is required"),
    mileage: z.string().min(1, "Milage is required"),
    color: z.string().min(1, "Color is required"),
    fuelType: z.string().min(1, "FuelType is required"),
    transmissions: z.string().min(1, "Transmissions is required"),
    bodyType: z.string().min(1, "body Type is required"),
    seats: z.string().optional(),
    description: z.string().min(10, "Description must be at leatest 10 characters"),
    status: z.enum(["AVAILABLE", "UNAVALIABLE", "SOLD"]),
    featured: z.boolean().default(false)
  })

  const { register, setValue, getValues, formState: { errors }, handleSubmit, watch } = useForm({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      make: "",
      model: "",
      year: "",
      price: "",
      mileage: "",
      color: "",
      fuelType: "",
      transmissions: "",
      bodyType: "",
      seats: "",
      description: "",
      status: "AVAILABLE",
      featured: false
    }
  })

  const { data: addCarresult, loading: addCarLoading, fn: addCarFn } = useFetch(addcar)

  useEffect(() => {
    if (addCarresult?.success) {
      toast.success("car added successfully")
      Router.push("/admin/cars")
    }
  }, [addCarresult])

  const onSubmit = async (data) => {

    if (uploadedImages.length === 0) {
      setImageError("Pleace upload at latest one image")
      return;
    }

    const carData = {
      ...data,
      year: parseInt(data.year),
      price: parseInt(data.price),
      mileage: parseInt(data.mileage),
      seats: data.seats ? parseInt(data.seats) : null,
    }

    await addCarFn({
      carData,
      images: uploadedImages,
    })

    console.log(data, uploadedImages, "uploadedImages");
  };



  // Upload Image for searching cars 

  const onMultiImagesDrop = (acceptedFiles) => {
    const validFiles = acceptedFiles.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB limit and will be skipped`)
        return false
      }

      return true;
    })

    if (validFiles.length === 0) return;

    const newImages = [];

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {

        newImages.push(e.target.result);

        if (newImages.length === validFiles.length) {
          setUploadedImages((prev) => [...prev, ...newImages])
          setImageError("")
          toast.success(`successfully uploaded ${validFiles.length} images!`);
        }
      };

      reader.readAsDataURL(file);
    })
  };


  const { getRootProps: getMultiImageRootProps, getInputProps: getMultiImageInputProps } = useDropzone({
    onDrop: onMultiImagesDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"]
    },
    multiple: true,
  });


  const removeImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }


  return (
    <div>
      <Tabs
        defaultValue="ai"
        className="mt-6"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TabsList className='w-full grid grid-cols-2'>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="ai">AI Upload</TabsTrigger>
        </TabsList>
        <TabsContent value="manual" className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Car Details</CardTitle>
              <CardDescription>Enter the car details manually</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className='space-y-6'
                onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  <div className='space-y-2'>
                    <Label htmlFor='make'>Make</Label>
                    <Input id='make'
                      placeholder='Enter the make of the car'
                      {...register('make')}
                      className={`h-10 ${errors.make ? 'border-red-500' : ''}`} />
                    {errors.make && <p className='text-red-500'>{errors.make.message}</p>}
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='model'>Model</Label>
                    <Input id='model'
                      placeholder='Enter the model of the car'
                      {...register('model')}
                      className="h-10" />
                    {errors.model && <p className='text-red-500'>{errors.model.message}</p>}
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='year'>Year</Label>
                    <Input id='year'
                      placeholder='Enter the year of the car'
                      {...register('year')}
                      className="h-10" />
                    {errors.year && <p className='text-red-500'>{errors.year.message}</p>}
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='price'>Price</Label>
                    <Input id='price'
                      placeholder='Enter the price of the car'
                      {...register('price')}
                      className="h-10" />
                    {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='mileage'>Mileage</Label>
                    <Input id='mileage'
                      placeholder='Enter the mileage of the car'
                      {...register('mileage')}
                      className="h-10" />
                    {errors.mileage && <p className='text-red-500'>{errors.mileage.message}</p>}
                  </div>

                  {/* color */}
                  <div className='space-y-2'>
                    <Label htmlFor='color'>Color</Label>
                    <Input id='color'
                      placeholder='Enter the color of the car'
                      {...register('color')}
                      className="h-10" />
                    {errors.color && <p className='text-red-500'>{errors.color.message}</p>}
                  </div>

                  {/* fuel type */}
                  <div className='space-y-2 overflow-x-hidden'>
                    <Label htmlFor='fuelType'>Fuel Type</Label>
                    <Select onValueChange={(value) => setValue('fuelType', value)}
                      defaultValue={getValues('fuelType')}>
                      <SelectTrigger
                        className={`h-10 w-full ${errors.fuelType ? 'border-red-500' : ''}`}
                      >
                        <SelectValue placeholder="Select Fuel Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelTypes.map((type, idx) => {
                          return (
                            <SelectItem key={idx} value={type}>{type}</SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>

                    {errors.price && <p className='text-red-500'>{errors.fuelType.message}</p>}
                  </div>

                  {/* Transmission */}
                  <div className='space-y-2'>
                    <Label htmlFor='transmissions'>Transmission </Label>
                    <Select onValueChange={(value) => setValue('transmissions', value)}
                      defaultValue={getValues('transmissions')}>
                      <SelectTrigger
                        className={`h-10 w-full ${errors.transmissions ? 'border-red-500' : ''}`}
                      >
                        <SelectValue placeholder="Select Transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        {transmissions.map((type, idx) => {
                          return (
                            <SelectItem key={idx} value={type}>{type}</SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>

                    {errors.transmissions && <p className='text-red-500'>{errors.transmissions.message}</p>}
                  </div>

                  {/* Body Type */}
                  <div className='space-y-2'>
                    <Label htmlFor='bodyType'>Body Type</Label>
                    <Select onValueChange={(value) => setValue('bodyType', value)}
                      defaultValue={getValues('bodyType')}>
                      <SelectTrigger
                        className={`h-10 w-full ${errors.bodyType ? 'border-red-500' : ''}`}
                      >
                        <SelectValue placeholder="Select Body Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {bodyTypes.map((type, idx) => {
                          return (
                            <SelectItem key={idx} value={type}>{type}</SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>

                    {errors.bodyType && <p className='text-red-500'>{errors.bodyType.message}</p>}
                  </div>

                  {/* Seats */}
                  <div className='space-y-2'>
                    <Label htmlFor='seats'>
                      No of Seats { }
                      <span className='text-sm text-gray-500'>(Optional)</span>
                    </Label>
                    <Input id="seats"
                      {...register("seats")}
                      placeholder="e.g. 5"
                      className="h-10"
                    />
                  </div>

                  {/* Status  */}

                  <div className='space-y-2'>
                    <Label htmlFor='status'>Status</Label>
                    <Select onValueChange={(value) => setValue('status', value)}
                      defaultValue={getValues('status')}>
                      <SelectTrigger
                        className={`h-10 w-full ${errors.carStatuses ? 'border-red-500' : ''}`}
                      >
                        <SelectValue placeholder="Select Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {carStatuses.map((status, idx) => {
                          return (
                            <SelectItem key={idx} value={status}>
                              {status.charAt(0) + status.slice(1).toLowerCase()}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>

                    {errors.carStatuses && <p className='text-red-500'>{errors.carStatuses.message}</p>}
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea id='description'
                    placeholder='Enter the Description of the car'
                    {...register('description')}
                    className={
                      `min-h-32 ${errors.description ? "text-red-500" : ""}`
                    }
                  />
                  {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                </div>

                {/* featured */}
                <div className='flex items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <Checkbox
                    id="featured"
                    checked={watch("featured")}
                    onCheckedChange={(checked) => {
                      setValue("featured", checked)
                    }} />
                  <div className='space-y-1 leading-none'>
                    <Label htmlFor="featured">Feature this car</Label>
                    <p className='text-sm text-gray-500'>featured car appear on the homepage</p>
                  </div>
                </div>

                {/* Images */}

                <div>
                  <Label htmlFor="images"
                    className={imageError ? "text-red-500" : ""}
                  >
                    Images {" "}
                    {imageError && <span className='text-red-500'>*</span>}
                  </Label>


                  <div {...getMultiImageRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition mt-2
                           ${imageError ? "border-red-500" : "border-gray-300"}`}>
                    <input {...getMultiImageInputProps()} />

                    <div className="flex flex-col items-center justify-center">
                      <Upload className='w-12 h-12 text-gray-400 mb-3' />
                      <p className='text-gray-600 text-sm'>
                        Drag & drop or click to upload multiple images
                      </p>
                      <p className='text-gray-500 text-xs mt-1'>
                        (JPG, PNG, WebP ,Max 5MB each)
                      </p>
                    </div>
                    {imageError && (
                      <p className='text-red-500 mt-1 text-xs '>{imageError}</p>
                    )}
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className='mt-4'>
                      <h3 className='text-sm font-medium mb-2'>
                        Uploded Images ({uploadedImages.length})
                      </h3>
                      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                        {uploadedImages.map((images, idx) => {
                          return (
                            <div key={idx} className='relative group'>
                              <Image
                                src={images}
                                alt={`Car image ${idx + 1}`}
                                height={50}
                                width={50}
                                className='h-28 shadow w-full object-cover rounded-md'
                                property
                              />

                              <Button
                                type="button"
                                size="icon"
                                variant="destrictive"
                                className="absolute top-1 right-1 bg-red-500 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(idx)}>
                                <X className='h-3 w-3' />
                              </Button>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}


                  <Button
                    type="submit"
                    className="w-full mt-2.5 md:w-auto bg-gray-600"
                    disable={addCarLoading}
                  >
                    {addCarLoading ? (
                      <>
                        <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                        Adding car...
                      </>
                    ) : (
                      "Add car"
                    )}
                  </Button>

                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai" className='mt-6'>Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}

export default AddcarForm
