import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/dist/client/router'
import { format } from 'date-fns'
import IntoCard from '../components/IntoCard'
import Map from '../components/Map'

function Search({searchResults}) {
    const router = useRouter()
    const {location, startDate, endDate, noOfGuests} = router.query
    const formatedStartDate = format(new Date(startDate), "dd MMM yy")
    const formatedEndDate = format(new Date(endDate), 'dd MMM yy')
    const range = `${formatedStartDate} - ${formatedEndDate}`

       
    return (
        <div>
            <Header placeholder = {`${location} | ${range} | ${noOfGuests} guests`} />
            <main className = 'flex'>
                <section className = 'flex-grow pt-14 px-6'>
                    <p className = 'text-xs'>300+ Stay - {range} - for {noOfGuests} guests</p>

                    <h1 className = 'text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>

                    <div className = 'hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                        <p className = 'button'>
                            Cancelation Flexibility
                        </p>
                        <p className = 'button'>
                            Type of place
                        </p>
                        <p className = 'button'>
                            Price
                        </p>
                        <p className = 'button'>
                            Type of place
                        </p><p className = 'button'>
                            Rooms and Beds
                        </p>
                        <p className = 'button'>
                            Type of place
                        </p>
                    </div>

                    <div className = 'flex flex-col'>
                        {
                            searchResults.map(item => {
                                return <IntoCard
                                    key = {item.img}
                                    img = {item.img}
                                    location = {item.location}
                                    title = {item.title}
                                    description = {item.description}
                                    star = {item.star}
                                    total = {item.total}
                                    price = {item.price}
                                />
                            })
                        }
                    </div>

                </section>

                <section className = 'hidden xl:inline-flex xl:min-w-[600px]'>
                    <Map searchResults = {searchResults}/>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default Search


export async function getServerSideProps(){
    const searchResults = await fetch('https://links.papareact.com/isz').
        then(res => res.json())

        return {
            props: {
                searchResults,
            }
        }
}