const showAllUsers = () => fetch('http://localhost:3000/').then((res) => res.json());

const addUser = () => fetch('http://localhost:3000/register').then((res)=>res.json); 

export { showAllUsers, addUser};