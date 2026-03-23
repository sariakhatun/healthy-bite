import React from 'react';
import { useBMI } from '../context/BMIContext';

const MedicineSuggestion = () => {
    const { bmi } = useBMI();
    console.log("bmi from medicine page", bmi, )

    return (
        <div>
            <h1 className='mt-24'>medicine suggestion page</h1>
        </div>
    );
};

export default MedicineSuggestion;