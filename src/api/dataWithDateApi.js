import apiClient from '.';

export const getDiseaseInfoWithDate = async (days = 30) => {
  try {
    return await apiClient.get(`/covid-19/historical/all?lastdays=${days}`);
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};
