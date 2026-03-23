import React from 'react';
import Navbar from '../shared/Navbar';
import Hero from './Hero';
import Banner from './Banner';
import AboutUs from './About';
import OurServices from './Services';
import Mission from './Mission';
import HowItWorks from './HowItWorks';
import CTA from './CTA';
import Testimonials from './Testimonials';
import { FoodIcon } from './Icons';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutUs></AboutUs>
            <OurServices></OurServices>
            <Mission></Mission>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
            <CTA></CTA>
           
        </div>
    );
};

export default Home;