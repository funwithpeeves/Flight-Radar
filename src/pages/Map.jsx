import '../../node_modules/leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from "react-redux";
import { icon } from "leaflet";
import { setPath } from "../redux/slices/flight";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";

const Map = ({ setDetailId }) => {

  const { flights, path } = useSelector((store) => store.flightReducer)
  const dispatch = useDispatch();

  const planeIcon = icon({
    iconUrl: "plane-icon.png",
    iconSize: [30, 30],
  })
  return (
    <div>
    <MapContainer
      center={[38.690289, 35.546780]}
      zoom={6}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {flights.map((flight) => (
        <Marker
          key={flight.id}
          icon={planeIcon}
          position={[flight.lat, flight.lng]}
        >
          <Popup>
            <div className="popup">
              <span>Kod: {flight.code}</span>
              <button onClick={() => setDetailId(flight.id)}>Detay</button>
              {path.length > 1 && (
                <button onClick={() => dispatch(setPath([]))}>
                  Rotayı Temizle
                </button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      <Polyline positions={path} />
    </MapContainer>
  </div>
  )
}

export default Map