import axios from 'axios';

export const getAll = async () => {
  const { data } = await axios.get('/api/foods');
  return data;
};

export const search = async searchTerm => {
  const { data } = await axios.get('/api/foods/search/' + searchTerm);
  return data;
};

export const getAllCategories = async () => {
  const { data } = await axios.get('/api/foods/categories');
  return data;
};

export const getAllByCategory = async category => {
  if (category === 'All') return getAll();
  const { data } = await axios.get('/api/foods/category/' + category);
  return data;
};

export const getById = async foodId => {
  const { data } = await axios.get('/api/foods/' + foodId);
  return data;
};
