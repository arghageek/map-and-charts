import apiClient from '.';

export const getCountryWiseDiseaseData = async () => {
  try {
    return await apiClient.get('/covid-19/countries');
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};
