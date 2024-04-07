import { useState } from 'react';

const BiorhythmCalculator = () => {
  const [dob, setDob] = useState('');
  const [physical, setPhysical] = useState(0);
  const [emotional, setEmotional] = useState(0);
  const [intellectual, setIntellectual] = useState(0);
  const [average, setAverage] = useState(0);

  const calculateBiorhythms = () => {
    const birthDate = new Date(dob);
    const currentDate = new Date();

    const physicalValue = Math.sin(
      2 * Math.PI * ((currentDate - birthDate) / (23 * 24 * 60 * 60 * 1000))
    ) * 100;

    const emotionalValue = Math.sin(
      2 * Math.PI * ((currentDate - birthDate) / (28 * 24 * 60 * 60 * 1000))
    ) * 100;

    const intellectualValue = Math.sin(
      2 * Math.PI * ((currentDate - birthDate) / (33 * 24 * 60 * 60 * 1000))
    ) * 100;

    const averageValue = (physicalValue + emotionalValue + intellectualValue) / 3;

    setPhysical(physicalValue);
    setEmotional(emotionalValue);
    setIntellectual(intellectualValue);
    setAverage(averageValue);
  };

  const handleInputChange = (e) => {
    setDob(e.target.value);
  };

  return (
    <div>
      <h2>Biorhythm Calculator</h2>
      <label htmlFor="dob">Enter your date of birth:</label>
      <input type="date" id="dob" value={dob} onChange={handleInputChange} />
      <button onClick={calculateBiorhythms}>Calculate</button>
      <div>
        <h3>Physical: {physical.toFixed(2)}</h3>
        <h3>Emotional: {emotional.toFixed(2)}</h3>
        <h3>Intellectual: {intellectual.toFixed(2)}</h3>
        <h3>Average: {average.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default BiorhythmCalculator;