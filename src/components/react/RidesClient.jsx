import { useEffect, useState } from 'react';
import RideCard from '../react/RideCard';
import RideCardOthers from '../react/RideCardOthers';
import DividerRides from '../react/DividerRides';

export default function RidesClient() {
  const [userRides, setUserRides] = useState([]);
  const [otherRides, setOtherRides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(sessionStorage.getItem('user'));

      const res2 = await fetch(import.meta.env.PUBLIC_BACKEND_URL+'/api/rides/list-user-rides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user._id }),
      });
      const data2 = await res2.json();
      setUserRides(data2.userRides || []);
      setOtherRides(data2.otherRides || []);
    };

    fetchData();
  }, []);

  return (
<>
    
        {userRides.length >= 1 && ( <DividerRides title={"MY RIDES"} />)}

        <div className="ride-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 mb-20">
            <RideCard allRides={userRides}/>            
        </div>
        
        {otherRides.length >= 1 && ( <DividerRides title={"ALL RIDES"} /> )}
        
        <div className="ride-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            <RideCardOthers allRides={otherRides}/>          
        </div>

        
        
    
    
      {/* {userRides.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-8 mb-4">MY RIDES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {userRides.map((ride) => (
              <div key={ride._id} className="border p-4 rounded">
                <h3 className="font-bold">{ride.title}</h3>
                <p>{ride.from} → {ride.to}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {otherRides.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-8 mb-4">ALL RIDES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {otherRides.map((ride) => (
              <div key={ride._id} className="border p-4 rounded">
                <h3 className="font-bold">{ride.title}</h3>
                <p>{ride.from} → {ride.to}</p>
              </div>
            ))}
          </div>
        </>
      )} */}
    
</>
  );
  
}
