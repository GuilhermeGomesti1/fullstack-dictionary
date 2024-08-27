import { Router } from "express";
import axios from "axios";
import Word, { IWord } from "../models/word";
import User from "../models/user";
import authenticateToken from "../middlewares/authenticateToken";

const router = Router();

router.get("/en", async (req, res) => {
  const { page = 1, limit = 20, search = "", startLetter = "" } = req.query;

  try {
    const filter: any = {
      word: {
        $regex: search,
        $options: "i",
      },
    };

    if (startLetter) {
      filter.word.$regex = `^${startLetter}`;
    }

    const words = await Word.find(filter)
      .limit(parseInt(limit as string))
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))
      .exec();

    const totalDocs = await Word.countDocuments(filter);
    res.json({
      message: "Fullstack Challenge 🏅 - Dictionary",
      results: words.map((word) => word.word),
      totalDocs,
      page: parseInt(page as string),
      totalPages: Math.ceil(totalDocs / parseInt(limit as string)),
      hasNext: parseInt(page as string) * parseInt(limit as string) < totalDocs,
      hasPrev: parseInt(page as string) > 1,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching words", error });
  }
});

router.get("/en/:word", async (req, res) => {
  try {
    const word = await Word.findOne({ word: req.params.word }).exec();

    if (word) {
      const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.word}`;
      const apiResponse = await axios.get(apiUrl);

      const phonetics = apiResponse.data[0].phonetics
        .filter((phonetic: any) => phonetic.audio)
        .map((phonetic: any) => ({
          text: phonetic.text,
          audio: phonetic.audio,
        }));

      const definitions = apiResponse.data[0].meanings
        .flatMap((meaning: any) => meaning.definitions)
        .map((definition: any) => definition.definition);

      res.json({ word: word.word, phonetics, definitions });
    } else {
      res.status(404).json({ message: "Word not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching word", error });
  }
});

router.post("/en/:word/favorite", authenticateToken, async (req: any, res) => {
  try {
    const { word } = req.params;
    const user = await User.findById(req.user.id);

    if (user.favorites.includes(word)) {
      return res.status(400).json({ message: "Word already in favorites" });
    }

    user.favorites.push(word);
    await user.save();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error adding word to favorites", error });
  }
});

router.delete(
  "/en/:word/unfavorite",
  authenticateToken,
  async (req: any, res) => {
    try {
      const { word } = req.params;
      const user = await User.findById(req.user.id);

      user.favorites = user.favorites.filter((fav) => fav !== word);
      await user.save();
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error removing word from favorites", error });
    }
  }
);

router.post("/en/:word/viewed", authenticateToken, async (req: any, res) => {
  try {
    const { word } = req.params;
    const user = await User.findById(req.user.id);

    if (!user.history.includes(word)) {
      user.history.push(word);
    }

    await user.save();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error adding word to history", error });
  }
});

export default router;
