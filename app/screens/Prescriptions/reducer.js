import {
    SET_PHOTO,
    RESET_PRESCRIPTION,
    SET_PHARMACIE,
  } from './constants';
  

  const pharmacies = [
    {
      title: 'Pharmacie Principale',
      description: '83 Rue Danielle Casanova, 93200 Saint-Denis',
      latlng: {latitude: 48.924963, longitude: 2.368557},
      id: 1,
    },
    {
      title: 'Pharmacie du Métro Colonel Fabien',
      description: '83 Boulevard de la Villette, 75010 Paris',
      latlng: {latitude: 48.877343, longitude: 2.370516},
      id: 2,
    },
    {
      title: 'pharmacie Adil',
      description: '2 rue pierre dorlan, 75018 Paris france',
      latlng: {latitude: 48.895340, longitude: 2.362561},
      id: 3,
    },
  ];

  const initialState = {
    photo: false,
    pharmacie: false,
    pharmacies: pharmacies,
  };
  
  function appReducer(state = initialState, action) {
    switch (action.type) {
      case SET_PHOTO: {
        return { ...state, photo: action.payload };
      }
      case SET_PHARMACIE: {
        return { ...state, pharmacie: action.payload };
      }
      case RESET_PRESCRIPTION: {
        return initialState;
      }
      default:
        return state;
    }
  }
  
  export default appReducer;
  