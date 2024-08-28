import { useEffect, useState } from 'react'
import Header from './components/Header'
import Map from './pages/Map'
import { useDispatch } from 'react-redux'
import { getFlights } from './redux/actions'
import List from './pages/List'
import Modal from './components/Modal'

function App() {
  const [isMapView, setIsMapView] = useState(true);
  const [detailId, setDetailId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlights());
  }, []);
  
  return (
    <div>
      <Header />

      <div className='buttons'>
        <button className={isMapView ? "active" : ""} onClick={() => setIsMapView(true)}>Harita Görünümü</button>
        <button className={!isMapView ? "active" : ""} onClick={() => setIsMapView(false)}>Liste Görünümü</button>
      </div>

      {isMapView ? (
        <Map setDetailId={setDetailId} />
      ) : (
        <List setDetailId={setDetailId} />
      )}

      {detailId && (
        <Modal detailId={detailId} close={() => setDetailId(null)} />
      )}
    </div>
  )
}

export default App
