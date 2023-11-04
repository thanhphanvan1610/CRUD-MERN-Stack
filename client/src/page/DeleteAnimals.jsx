import BackButton from '../components/BackButton';
import React, { useState } from 'react';
import axios from "axios";
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack'

const DeleteAnimals = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  

  const handleDeleteAnimal = () => {
    setLoading(true);
    axios.delete(`http://localhost:3058/animals/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Detele Successful!', {variant: 'success'})
       navigate('/')
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar('Error Delete!', {variant: 'error'})
        console.log(err.message)
      });
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Animals</h1>
      {loading ? <Spinner /> : null}
      <div className='flex flex-col border-dashed border-sky-500 rounded-xl p-8 w-[600px] mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete the animal?</h3>
        <button className='p-4 bg-orange-600 text-white m-8 w-full' onClick={handleDeleteAnimal}>
          Yes, Delete it
        </button>
      </div>
    </div>
  );
}

export default DeleteAnimals;
