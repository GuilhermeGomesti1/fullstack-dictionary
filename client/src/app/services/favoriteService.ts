import axios from "axios";

const API_URL = "http://localhost:5000";

export const addFavorite = async (word: string, token: string) => {
  await axios.post(
    `${API_URL}/entries/en/${word}/favorite`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFavorite = async (word: string, token: string) => {
  await axios.delete(`${API_URL}/entries/en/${word}/unfavorite`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
