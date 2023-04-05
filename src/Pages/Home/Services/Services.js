import React, { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [isAsc,setIsAsc] = useState(true);
  const [search,setSearch] = useState('');
  const searchRef = useRef();
  useEffect(() => {
    fetch(`http://localhost:5000/services?search=${search}&order=${isAsc ? 'asc' : 'desc'}`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [isAsc,search]);

  const handleSearch =()=>{
    setSearch(searchRef.current.value)
  }

  return (
    <div>
      <div className="text-center mb-4">
        <p className="text-2xl font-bold text-orange-600">Service</p>
        <h2 className="text-5xl font-semibold">Our Service Area</h2>
        <p>
          The Majority hav suffered alternation in some form,by Injected humour,
          <br />
          or randomised words which don't look even slightly believable.
        </p>
        <input placeholder="enter your product name" ref={searchRef} className="input" type="text" /> <button onClick={handleSearch} className="btn btn-ghost">search</button>
      {/* Sorted */}
        <div className="dropdown">
          <label tabIndex={0} className="btn m-1">Sorted</label>
          <ul onClick={()=> setIsAsc(!isAsc)} tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
           {isAsc? <li>High</li>
            : 
            <li>Low</li>}
          </ul>
       {/* Sorted */}
      </div>

      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-3">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
     <div className="text-center pb-3">
     <button className="btn btn-outline btn-secondary font-semibold text-2xl">Button</button>
     </div>
    </div>
  );
};

export default Services;
