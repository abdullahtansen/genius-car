import React from 'react';
import about from '../../../assets/images/about_us/person.jpg';
import parts from '../../../assets/images/about_us/parts.jpg'
const About = () => {
    return (
        <div className="hero my-20">
        <div className="hero-content flex-col lg:flex-row">
         <div className='w-1/2 relative'>
         <img src={about} className="max-w-sm w-4/5 h-full rounded-lg shadow-2xl" alt="" />
         <img src={parts} className="absolute right-5 top-1/2 border-8 w-3/5 max-w-sm rounded-lg shadow-2xl" alt="" />
         </div>
          <div className='w-1/2'>
            <p className='text-2xl font-bold text-orange-600'>About Us</p>
            <h1 className="my-5 text-5xl font-bold">We Are qualified
            <br />
            & of experience
            <br />
            in this field
            </h1>
            <p className="py-6">There Are Many Variations of passages of lorem ipsum Available.But The Majority Have Suffered Alteration in Some Form,By Injected Humour Or Randomised words which don't look.Even Slightly Believle</p>
            <button className="btn btn-primary">Get More Info</button>
          </div>
        </div>
      </div>
    );
};

export default About;