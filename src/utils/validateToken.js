import { deleteLocal } from './localStorageFunctions';

function validateToken(error, navigate) {
  if (error.response?.status === 401) {
    deleteLocal('linkrUserdata');
    navigate('/');
  }
}

export default validateToken;
