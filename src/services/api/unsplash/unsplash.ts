import axios from "axios";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
// const UNSPLASH_ACCESS_KEY = "araraasa";
const BASE_URL = "https://api.unsplash.com";

//fetch photos from the api
export const fetchPhotos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/photos?client_id=${UNSPLASH_ACCESS_KEY}`);
    return response.data;
  } catch (error) {
    // console.error("Error fetching photos", error);
    return [];
  }
};

// fetch photos based on topics/categories
export const fetchTopicImages = async (topicId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/topics/${topicId}/photos?client_id=${UNSPLASH_ACCESS_KEY}`
    );
    return response.data;
  } catch (error) {
    // console.error("Error fetching topic photos", error);
    return [];
  }
};

//fetch details for a photo
export const fetchPhotoDetails = async (photoId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/photos/${photoId}?client_id=${UNSPLASH_ACCESS_KEY}`
    );
    return response.data;
  } catch (error) {
    // console.error("Error fetching photo details:", error);
    return null;
  }
};

//search photos with a query
export const searchPhotos = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/photos`, {
      params: { query, per_page: 20 },
      headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
    });
    return response.data.results;
  } catch (error) {
    // console.error("Error fetching search results:", error);
    return [];
  }
};

//fetch users photos
export const fetchUserPhotos = async (userName: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/users/${userName}/photos?client_id=${UNSPLASH_ACCESS_KEY}`
    );
    return response.data;
  } catch (error) {
    // console.error("Could not retrieve user photos", error);
    return [];
  }
};

//fetch a list of topics
// export const fetchTopics = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/topics?client_id=${UNSPLASH_ACCESS_KEY}`);
//     return response.data;
//   } catch (error) {
//     return [];
//   }
// };
