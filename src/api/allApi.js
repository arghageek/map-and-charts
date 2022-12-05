import apiClient from '.';

export const getOverallStat = async () => {
  try {
    return await apiClient.get('/covid-19/all');
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};
