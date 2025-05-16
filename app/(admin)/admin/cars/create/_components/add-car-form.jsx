import React from 'react'
import { z } from 'zod';


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

  return (
    <div>
      hjddh
    </div>
  )
}

export default AddcarForm
