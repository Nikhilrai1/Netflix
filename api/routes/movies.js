const express = require("express");
const router = express();
const Movie = require("../models/Movie");

const verify = require("../token/verifyToken");


//CREATE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } catch (error) {
            res.status(500).json("Server error");
        }

    } else {
        res.status(403).json("You are not allowed.");
    }
})


//UPDATE
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updateMovie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updateMovie);
        } catch (error) {
            res.status(500).json("Server error");
        }

    } else {
        res.status(403).json("You are not allowed.");
    }
})


//DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("Movie has been successfully deleted...");
        } catch (error) {
            res.status(500).json("Server error");
        }

    } else {
        res.status(403).json("You are not allowed.");
    }
})

//GET
router.get("/find/:id", verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (error) {
        console.log(error)
        res.status(500).json("Server error");
    }
})

//RANDOM MOVIE ON FEATURED
router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } }, // $sample give random movie size give total movie in this case no. of movie is one
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }, // $sample give random movie size give total movie in this case no. of movie is one
            ]);
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json("Server error");
    }

})


//GET ALL MOVIE
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse());
        } catch (error) {
            res.status(500).json("Server error");
        }

    } else {
        res.status(403).json("You are not allowed.");
    }
})

module.exports = router;