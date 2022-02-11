const getData = (url) => fetch(url).then((res) => res.json());

export default getData;
