import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';
import Card from './components/Card';
import Cards from './components/Cards';
import Filter from './components/Filter';
import { apiUrl, filterData } from './data'
import { toast } from 'react-toastify';


function App() {

  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    try {
      let response = await fetch(apiUrl);
      let output = await response.json();
      setCourses(output.data);
      // console.log(output);
    }

    catch (error) {
      toast.error("Network Error")
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='min-h-screen flex flex-col'>

      <div>
        <Navbar />
      </div>

      <div>
        <Filter
          filterData = {filterData}
        />
      </div>

      <div>
        {
          loading ? (<Spinner />) : (<Cards courses = {courses} />)
        }
      </div>

    </div>
  )
}

export default App;
