import CarCard from "@/components/CarCard";
import CustomFilter from "@/components/CustomFilter";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import ShowMore from "@/components/ShowMore";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import Image from "next/image";

export default async function Home({searchParams}) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturers || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || ""
  });
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;


  return (
    <main className=" overflow-hidden">
      <Hero />

      <div className=" mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className=" text-xl font-extrabold">Car Catalogue</h1>
          <p>Explore all of our inventory</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="Fuel"  options={fuels} />
            <CustomFilter title="Year" options={yearsOfProduction} />
          </div>
        </div>

        {
          !isDataEmpty ? (
            <section>
              <div className="home__cars-wrapper">
                {
                  allCars?.map((car) => <CarCard key={car} car={car}/>)
                }
              </div>

              <ShowMore pageNumber={(searchParams.pageNumber|| 10 / 10 )} isNext={(searchParams.limit || 10) > allCars.length} />
            </section>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Oops, no results</h2>
              <p>{allCars?.message}</p>
            </div>
          )
        }

      </div>
    </main>
  );
} 
