export default useTimer = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const calculateTimeSpent = (startTime, endTime) => {
    if (startTime && endTime) {
      const timeDifference = (endTime - startTime) / 1000; // En segundos
      const minutes = Math.floor(timeDifference / 60);
      const seconds = Math.floor(timeDifference % 60);

      return `${minutes}m:${seconds}s`;
    }
  };
};
