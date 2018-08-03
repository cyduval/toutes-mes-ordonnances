import {
    SET_PHOTO,
    RESET_PRESCRIPTION,
    SET_PHARMACIE,
  } from './constants';
  
  export const setPhoto = (payload) => ({
    type: SET_PHOTO,
    payload,
  });

  export const setPharmacie = (payload) => ({
    type: SET_PHARMACIE,
    payload,
  });

  
  export const resetPrescription = () => ({
    type: RESET_PRESCRIPTION,
  });
  