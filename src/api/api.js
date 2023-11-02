import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImage = async (value, page = 1) => {
  const params = new URLSearchParams({
    key: '39156572-72d7647317d1c76660d8c9d12',
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });
  const resp = await axios.get(`?${params}`);
  return resp.data;
};
