const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-based
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

  export default formatDate