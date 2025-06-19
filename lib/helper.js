


export const serializedCarsData = (car, wishlisted = false) => {

    return {
        ...car,
        price: car.price ? parseFloat(car.price.toString()) : 0,
        createdAt: car.createdAt?.toString(),
        updatedAt: car.updatedAt?.toString(),
        wishlisted: wishlisted,
    }

}