const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {

  const id = nanoid(16);

  const { name, year, author, summary, publisher, pageCount, readPage, reading, } = JSON.parse(request.payload);

  const finished = () => {
    if (pageCount === readPage) {
      return true;
    }

    else {
      return false;
    }
  }

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt,
  };

  books.push(newBook);

  const isError = books.filter((book) => book.name != null).length < 1;

  let response;

  if (readPage > pageCount) {
    response = h.response({
      "status": "fail",
      "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",

    });
    response.code(400);
  }
  else if (!name) {
    response = h.response({
      "status": "fail",
      "message": "Gagal menambahkan buku. Mohon isi nama buku",
      data: {
        bookid: id,
      },
    });
    response.code(400);
  }
  else if (!isError) {
    response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookid: id,
      },
    });
    response.code(201);
  } else {
    response = h.response({
      "status": "error",
      "message": "Buku gagal ditambahkan"
    });

    response.code(500);
  }


  console.log(JSON.stringify(books))
  return response;
};

module.exports = { addBookHandler };