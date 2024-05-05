const axios = require("axios");
const { Reviews } = require('../db');

const getReviews = async () => {
  try {
      const reviewsAll = await Promise.all(data.results.map(async (data) => {
          let resp = await axios.get(data.db);
          const reviewAdd = {
              id: resp.data.id,
              score: resp.data.score
          };
          
          const [review, created] = await Reviews.findOrCreate({
              where: { score: resp.data.score },
          });

          if (created) {
              console.log(`Nueva Review creada: ${review.name}`);
          } else {
              console.log(`Review existente encontrada: ${review.name}`);
          }

          return reviewAdd;
      }));
      return reviewsAll;
  } catch (error) {
      
      res.status(400).json({ error: error.message });
  }
};

module.exports = getReviews;

