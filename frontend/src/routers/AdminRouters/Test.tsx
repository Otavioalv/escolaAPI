// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';


// export default function Teste() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const { state } = navigate.getState(); // Obtém o estado passado pela rota anterior
//     if (state) {
//       console.log(state.values);
//     }
//   }, []);

//   return (
//     <div>
//       <h1>Teste</h1>
//     </div>
//   );
// }

// // PRINCIPAL
// export  function Principal() {
//   const navigate = useNavigate();

//   function click() {
//     navigate('/teste', { state: { values: 'Hello World' } }); // Passa o valor 'Hello World' como estado para a rota de teste
//   }

//   return (
//     <div>
//       <h1>Principal</h1>
//       <button onClick={click}>Ir para teste</button>
//     </div>
//   );
// }