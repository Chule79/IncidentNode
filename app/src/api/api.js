const getData = async (filtro) => {
  const data = await fetch(`https://incidentnode-back.onrender.com/api/v1/${filtro}`);
  const res = await data.json();
  return res;
};

export default getData;
