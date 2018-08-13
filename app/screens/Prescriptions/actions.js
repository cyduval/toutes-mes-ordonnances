import {
    SET_PHOTO,
    RESET_PRESCRIPTION,
    SET_PHARMACIE,
    SEND_PRESCRIPTION,
    RESET_PHOTO,
  } from './constants';
  
  export const setPhoto = (payload) => ({
    type: SET_PHOTO,
    payload,
  });

  export const setPharmacie = (payload) => ({
    type: SET_PHARMACIE,
    payload,
  });

  export const sendPrescription = (payload) => ({
    type: SEND_PRESCRIPTION,
    payload,
  });

  export const resetPhoto = () => ({
    type: RESET_PHOTO,
  });
  
  export const resetPrescription = () => ({
    type: RESET_PRESCRIPTION,
  });
  