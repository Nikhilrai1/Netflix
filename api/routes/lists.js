const express = require("express");
const router = express();
const List = require("../models/List");

const verify = require("../token/verifyToken");


//CREATE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);
        try {
            const savedList = await newList.save();
            res.status(201).json(savedList);
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
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json("Movie list has been successfully deleted...");
        } catch (error) {
            res.status(500).json("Server error");
        }

    } else {
        res.status(403).json("You are not allowed.");
    }
})

//GET
router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let lists = [];
    try {
        if (typeQuery) {
            if (genreQuery) {
                lists = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } }
                ])
            } else {
                lists = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } }
                ])
            }
        } else {
            lists = await List.aggregate([
                { $sample: { size: 10 } }
            ])
        }
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json("Server error");
    }
})

module.exports = router;