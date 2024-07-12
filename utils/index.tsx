interface FilterProps{
  manufacturer: string,
  year: number,
  fuel: string,
  limit: number,
  model: string
}

export async function fetchCars(filters: FilterProps){
    const { manufacturer, year, model, limit, fuel} = filters
    const headers = {
      'x-rapidapi-key': '174bae978emsh0c3f17286fb2046p1330e8jsna0c4cdca0927',
      'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {headers: headers});
    const result = await response.json();

    return result
}

export const calculateCarRent = (city_mpg: number, year:number) => {
  const basePricePerDay = 50;
  const milageFactor = 0.1;
  const ageFactor = 0.05;

  const milageRate = city_mpg * milageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalPerDay = basePricePerDay + milageRate + ageRate;

  return rentalPerDay.toFixed(0);
}


interface CarProps{
  city_mpg: number,
  class: string,
  combination_mpg: number,
  cylinders: number,
  displacement: number,
  drive: string,
  fuel_type: string,
  highway_mpg: number,
  make: string,
  model: string,
  transmission: string,
  year: number
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL(`https://cdn.imagin.studio/getimage`)
  const {make, year, model} = car

  url.searchParams.append('customer', '--Key--')

  url.searchParams.append('make', make)
  url.searchParams.append('modelFamily', model.split(' ')[0])
  url.searchParams.append('zoomType', 'fullScreen')
  url.searchParams.append('angle', `${angle}`)
  url.searchParams.append('modelYear', `${year}`)

  return `${url}` 
}