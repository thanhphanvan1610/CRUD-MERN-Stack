import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowAnimals = () => {
    const [animal, setAnimal] = useState({})
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    useEffect(() => {
        setLoading(true)
        axios
            .get(`http://localhost:3058/animals/${id}`)
            .then((res) => {
                setAnimal(res.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }, [])
    return (
        <div className='p-4'>
           <BackButton/>
           <h1 className='text-2xl my-4'>Show Animal</h1>
           {loading?(
            <Spinner/>):(
                <div className='flex flex-col border-dashed border-sky-500 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-600'>ID</span>
                        <span className=''>{animal._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-600'>name</span>
                        <span className=''>{animal.name}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-600'>Species</span>
                        <span className=''>{animal.species}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-600'>Longity</span>
                        <span className=''>{animal.longity}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-600'>Enviroment</span>
                        <span className=''>{animal.enviroment}</span>
                    </div>
                 </div>
            )}
        
        </div>
    )
}

export default ShowAnimals
