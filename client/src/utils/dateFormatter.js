module.exports = (timestamp = {}) => {
  const dateObj = new Date(timestamp);

  const formattedTimeStamp = `${
    dateObj.getMonth() + 1
  }/${dateObj.getDate()}/${dateObj.getFullYear()}`;

  return formattedTimeStamp;
};
