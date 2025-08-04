import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils";

const backendUrl = import.meta.env.PUBLIC_BACKEND_URL;

const RideCard = ({ allRides }) => {

    const [token, setToken] = useState(null);
        const [user, setUser] = useState(null);   
        const [status, setStatus] = useState({}); 
    
    
        const onLeaveClick = async (rideId, to, us) => {
            
            if (!token || !user) {
              window.location.href = "/login";
              return;
            }
    
            
            const payload = JSON.stringify({ userId: user._id, rideId });
    
            try{
                const response = await fetch(import.meta.env.PUBLIC_BACKEND_URL+'/api/rides/leave-ride', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: payload,
                });
          
                const data = await response.json();
    
                if(data.success)
                {
                    setStatus((prev) => ({
                        ...prev,
                        [rideId]: data.message || "Ride Left Successfully",
                    }));
                    setTimeout(() => {
                        window.location.reload();
                        }, 900); // slight delay to allow UI message if needed
                }
                else {
                    setStatus((prev) => ({
                        ...prev,
                        [rideId]: data.message || "Failed to Leave Ride",
                    }));
                    setTimeout(() => {
                        setStatus((prev) => {
                        const newMap = { ...prev };
                        delete newMap[rideId];
                        return newMap;
                    });}, 1500);
                }
            }
            catch (error) {
                console.error(error);
                setStatus(response.json.message);
            }
    
          
    
          
    
        }


        const onDeleteClick = async (rideId, to, us) => {
            
            if (!token || !user) {
              window.location.href = "/login";
              return;
            }
    
            
            const payload = JSON.stringify({ userId: user._id, rideId });
    
            try{
                const response = await fetch(import.meta.env.PUBLIC_BACKEND_URL+'/api/rides/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: payload,
                });
          
                const data = await response.json();
    
                if(data.success)
                {
                        setStatus((prev) => ({
                        ...prev,
                        [rideId]: data.message || "Ride Deleted Successfully",
                    }));
                        setTimeout(() => {
                            window.location.reload();
                            }, 900); // slight delay to allow UI message if needed
                }
                else {
                    setStatus((prev) => ({
                        ...prev,
                        [rideId]: data.message || "Failed to Delete Ride",
                    }));

                    setTimeout(() => {
                        setStatus((prev) => {
                        const newMap = { ...prev };
                        delete newMap[rideId];
                        return newMap;
                    });}, 1500);
                }
            }
            catch (error) {
                console.error(error);
                setStatus(response.json.message);
            }
          
    
        }
    
    
      useEffect(() => {
        const t = sessionStorage.getItem("token");
        const u = JSON.parse(sessionStorage.getItem("user"));
    
        if (t) setToken(t);
        if (u) setUser(u);
    
      }, []);


  return (
    <>
    <style>{`
        @media screen and (min-width: 1024px) and (max-width: 1366px) {
          .ride-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
      {allRides.map((ri) => (
        <div
          key={ri._id}
          className="max-w-[400px] max-h-[800px] sm:max-w-[400px] h-full bg-white border border-black shadow-lg hover:shadow-[-7px_7px_0px_#000000] flex flex-col"
        >
          <img
            src="/images/logo/rides.jpeg"
            alt="ride cover"
            className="border-b border-black"
            loading="lazy"
            decoding="async"
            width="400"
            height="400"
          />

          <a href={`/ride/${ri._id}`} className="block hover:no-underline text-black">
            <div className="pt-3 pb-0">
              <p className="w-[75%] mt-5 p-2 inline-block bg-black text-white text-sm text-center">
                {ri.title}
              </p>
            </div>

            <div className="p-5 flex-grow">
              <div className="flex justify-between gap-5 mb-2">
                <p className="mb-2 text-lg font-medium tracking-tight text-gray-900">
                  From: {ri.from}
                </p>
                <p className="mb-2 text-lg font-medium tracking-tight text-gray-900">
                  To: {ri.to}
                </p>
              </div>
              <div className="flex justify-between gap-4 mb-2">
                <p className="mb-2 text-lg font-medium tracking-tight text-gray-900">
                  Date: {formatDate(ri.date)}
                </p>
                <p className="mb-2 text-lg font-medium tracking-tight text-gray-900">
                  Duration: {ri.duration}
                </p>
              </div>
              <p className="mb-2 text-md font-medium tracking-tight text-gray-900 pb-4">
                Riders Registered: {ri.riders.length}
              </p>
              <p className="mb-3 text-sm tracking-tight text-gray-700 line-clamp-4">{ri.description}</p>
            </div>
          </a>

          <div className="ride-card p-5">
            <div className="mt-auto flex justify-between items-center">
              <div onClick={()=>onLeaveClick(ri._id)} className="leave-btn inline-flex items-center py-2 font-semibold text-center cursor-pointer" data-ride-id={ri._id}>
                Leave Ride
              </div>
              <div onClick={()=>onDeleteClick(ri._id)} className="delete-btn inline-flex items-center py-2 font-semibold text-center cursor-pointer" data-ride-id={ri._id}>
                Delete
              </div>
            </div>
            <div className="result">{status[ri._id]}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RideCard;
