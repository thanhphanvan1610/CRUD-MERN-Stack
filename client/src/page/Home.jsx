import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const Home = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading as true
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3058/animals')
      .then((res) => {
        setAnimals(res.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Animals List</h1>
        <Link to='/animals/create'>
          <button className='bg-blue-400 text-white rounded-xl px-4 py-2'>ADD</button>
        </Link>
      </div>
      {loading ? (
       <Spinner/>
      ) : (
        <div className='w-full mx-auto'>
          <table className='min-w-full border bg-white'>
            <thead>
              <tr>
                <th className='px-6 py-3 text-left border-b-2 border-gray-300 bg-gray-100 text-gray-600'>
                  No
                </th>
                <th className='px-6 py-3 text-left border-b-2 border-gray-300 bg-gray-100 text-gray-600'>
                  Name
                </th>
                <th className='px-6 py-3 text-left border-b-2 border-gray-300 bg-gray-100 text-gray-600'>
                  Species
                </th>
                <th className='px-6 py-3 text-left border-b-2 border-gray-300 bg-gray-100 text-gray-600'>
                  Longity
                </th>
                <th className='px-6 py-3 text-left border-b-2 border-gray-300 bg-gray-100 text-gray-600'>
                  Environment
                </th>
                <th className='px-6 py-3 text-left border-b-2 border-gray-300 bg-gray-100 text-gray-600'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {animals.length > 0 ? animals.map((animal, index) => (
                <tr key={animal._id}>
                  <td className='px-6 py-4 whitespace-nowrap border-b border-gray-300'>
                    {index + 1}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap border-b border-gray-300'>
                    {animal.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap border-b border-gray-300'>
                    {animal.species}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap border-b border-gray-300'>
                    {animal.longity}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap border-b border-gray-300'>
                    {animal.enviroment}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap border-b border-gray-300'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/animals/details/${animal._id}`}><button>Detail</button></Link>
                      <Link to={`/animals/edit/${animal._id}`}><button>Edit</button></Link>
                      <Link to={`/animals/delete/${animal._id}`}><button>Delete</button></Link>
                    </div>
                  </td>
                </tr>
              )):<div className="text-center bg-cover">
              <img
                alt='Nothing'
                src='https://cdn.dribbble.com/users/453325/screenshots/5573953/empty_state.png?resize=400x300&vertical=center'
              />
            </div>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
