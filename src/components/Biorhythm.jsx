import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import DailyInterpreTation from './DailyInterpreTation';

const BiorythmCalculator = () => {
  const [dob, setDob] = useState('');
  const [physical, setPhysical] = useState([]);
  const [emotional, setEmotional] = useState([]);
  const [intellectual, setIntellectual] = useState([]);
  const [average, setAverage] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [...Array(31).keys()].map((i) => i + 1),
        datasets: [
          {
            label: 'Physical',
            data: physical,
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'Emotional',
            data: emotional,
            borderColor: 'blue',
            fill: false,
          },
          {
            label: 'Intellectual',
            data: intellectual,
            borderColor: 'green',
            fill: false,
          },
          {
            label: 'Average',
            data: average,
            borderColor: 'purple',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Day',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Value',
            },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [physical, emotional, intellectual, average]);

  const handleDobChange = (event) => {
    const newDob = event.target.value;
    setDob(newDob);
    calculateBiorythm(newDob);
  };

  const calculateBiorythm = (dob) => {
    if (!dob) return;

    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const daysSinceBirth = (Date.now() - new Date(dob).getTime()) / millisecondsInDay;

    const physicalData = [...Array(31)].map((_, index) => Math.sin((2 * Math.PI * (daysSinceBirth + index)) / 23) * 100);
    const emotionalData = [...Array(31)].map((_, index) => Math.sin((2 * Math.PI * (daysSinceBirth + index)) / 28) * 100);
    const intellectualData = [...Array(31)].map((_, index) => Math.sin((2 * Math.PI * (daysSinceBirth + index)) / 33) * 100);

    const averageData = physicalData.map((value, index) => (value + emotionalData[index] + intellectualData[index]) / 3);

    setPhysical(physicalData);
    setEmotional(emotionalData);
    setIntellectual(intellectualData);
    setAverage(averageData);
  };

  return (
    <>
    <div>
    <div className='shadow-2xl bg-gray-100 text-black font-semibold font-serif pb-10 p-2'>
    <label className='text-center   text-black font-semibold font-serif text-2xl'>Your Date of Birth:  </label>
      <input className='text-3xlshadow-2xl bg-gray-600 text-white font-semibold font-serif ml-2' type="date" value={dob} onChange={handleDobChange} />

    </div>
      <div>
      <canvas className='canvas' style={{height:'150px'}}  ref={chartRef}  ></canvas>
      </div>
    
      <div className='m-4 p-2 shadow-2xl bg-gray-100'>
      <h1 className='text-3xl font-semibold text-red-500'>physical:{Math.floor(physical[0])}</h1>
      <h1 className='text-3xl font-semibold text-blue-500'>Emotional:{Math.floor(emotional[0])}</h1>
      <h1 className='text-3xl font-semibold text-gredn-500'>Intellectual:{Math.floor(intellectual[0])}</h1>
      <h1 className='text-3xl font-semibold text-gray-500'>Average:{Math.floor(average[0])}</h1>
      </div>
      
    </div>

    <div className='p-9 m-2 shadow-2xl bg-gray-100 text-black font-semibold font-serif'>
       <h1 className='text-4xl text-blue-800 font-bold mt-8'>The Biorhythms Cycles:</h1>
       <h1 className='text-3xl text-red-600 font-semibold mt-8'>The Physical Cycle</h1>
       <p className='text-xl mt-4'>The Physical cycle, with its 23-day span, touches upon our bodys stamina, strength, and overall
       well-being. It influences various physical attributes, including energy levels, recovery speed, and even disease resistance,
       marking our capacity for physical activites and challenges.</p>

       <h1 className='text-4xl text-blue-400 font-bold mt-8'>The Emotional cycle</h1>
       <p className='text-xl mt-4'>
        The Emotional cycle, lasting 28 days, mirrors the moons cycle and deeply affects our psychological
        state. It guides our feelings, moods, and emotional responses, impacting our interactions, creativity,
        and emotional resilience.
       </p>

       <h1 className='text-4xl text-green-500 font-bold mt-8'>The Intellectual Cycle</h1>
       <p className='text-xl mt-4'>Spanning 33 days, the Intellectual cycle shapes our mental faculties. It affects cogitive functions like 
       memory, analytical thinking, and problem-solving, invdicating periods of heightened intellectual activity of the 
       need for mental rest.</p>

       <h1 className='text-4xl text-gray-500 font-bold mt-8'>The Average</h1>
       <p className='text-xl mt-4'>The combined average of physical, emotional, and intellectual levels provides a holistic view of ones 
       current state. This overall Biorhythm score can guide decisions, indicating general well-being or suggesting 
       caution.</p>

       <h1 className='text-4xl text-blue-900 font-bold mt-8'>The Critical Days</h1>
       <p className='text-xl mt-4'>
        Critical days, or transition days, occur when a biorhythm cycle shifts polarity, moving across the boundry from 
        positive to negative phases. These shifts lead to lifes  natural fluctuations, contributing to periods  of instability
        that can aggect an individuals behavior and actions unusually. While not inherently negative, these days call for increased
        caution, as one might be more prone to accidents compared to other times in the cycle. Noteworthy are the double and triple transition days,
        though they are rare, happening once every 7 or 8 years, signaling even more significant shifts.
       </p>
    </div>

    <DailyInterpreTation 
    physical={Math.floor(physical[0])}
      emotional={Math.floor(emotional[0])}
      intellectual={Math.floor(intellectual[0])}
      average={Math.floor(average[0])}
    />
</>
  );
};

export default BiorythmCalculator;