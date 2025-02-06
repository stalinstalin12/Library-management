const Book = require("../db/models/book");
const { fileUpload } = require("../utils/file-upload");

// Create a new book
const createBook = async (req, res) => {
    try {
        const { title, author, isbn, publishedYear, availableCopies, image } = req.body;

        if (!title || !author || !isbn || !image) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Create the book entry in MongoDB
        const book = new Book({
            title,
            author,
            isbn,
            publishedYear,
            availableCopies: availableCopies || 1,
            image, // Directly storing Base64 image
        });

        await book.save();
        res.status(201).json({ message: "Book created successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Get all books with pagination & search
const getBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;

        const query = search
            ? { $or: [{ title: new RegExp(search, "i") }, { author: new RegExp(search, "i") }] }
            : {};

        const books = await Book.find(query)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const totalBooks = await Book.countDocuments(query);

        res.json({
            books,
            totalPages: Math.ceil(totalBooks / limit),
            currentPage: Number(page),
            totalBooks,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a book
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, isbn, publishedYear, availableCopies, image } = req.body;

        let imagePath = "";
        if (image) {
            try {
                const uploadedPaths = await fileUpload([image], "books");
                imagePath = uploadedPaths[0];
            } catch (error) {
                return res.status(400).json({ message: "Image upload failed", error });
            }
        }

        const book = await Book.findByIdAndUpdate(
            id,
            { title, author, isbn, publishedYear, availableCopies, image: imagePath },
            { new: true }
        );

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Book updated successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createBook, getBooks, updateBook, deleteBook };
