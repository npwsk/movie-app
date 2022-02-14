import constants from './constants.js';
import getData from './getData.js';

const getAuxillaryData = async () => {
  const configObj = await getData(constants.CONFIG_URL);

  const {
    images: { base_url: imageBaseUrl },
  } = configObj;

  const { genres } = await getData(constants.GENRE_LIST_URL);

  return {
    imageBaseUrl,
    genres,
  };
};

export default getAuxillaryData;
