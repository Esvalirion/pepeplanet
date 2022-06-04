import fns from 'date-fns';

const raceTime = (time) => fns.format(time, 'mm:ss:SSS');

export default raceTime;
