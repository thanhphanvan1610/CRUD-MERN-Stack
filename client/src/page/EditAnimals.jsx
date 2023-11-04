import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack'

const EditAnimals = () => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [longity, setLongity] = useState('');
  const [enviroment, setEnv] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar()
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3058/animals/${id}`)
      .then((res) => {
        const { name, species, longity, enviroment } = res.data;
        setName(name);
        setSpecies(species);
        setLongity(longity);
        setEnv(enviroment);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  }, [id]); // Include id in the dependency array to re-fetch data when id changes

  const handleEditAnimal = () => {
    const data = {
      name,
      species,
      longity,
      enviroment
    };

    setLoading(true);
    axios
      .put(`http://localhost:3058/animals/${id}`, data) // Use axios.put to update the record
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Update Successful!',{variant: 'success'})
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error!', {variant: 'error'})
        console.log(error.message);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      {loading ? <Spinner /> : ''}
      <h1 className="text-3xl text-green-600 font-semibold">Edit Animals</h1>
      <div className="flex flex-col border-dashed border-sky-400 rounded-2xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600">Name Animal</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-600 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600">Species</label>
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="border-2 border-gray-600 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600">Longity</label>
          <input
            type="text"
            value={longity}
            onChange={(e) => setLongity(e.target.value)}
            className="border-2 border-gray-600 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600">Enviroment</label>
          <input
            type="text"
            value={enviroment}
            onChange={(e) => setEnv(e.target.value)}
            className="border-2 border-gray-600 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 rounded-2xl bg-blue-600 m-8"
          onClick={handleEditAnimal}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditAnimals;
