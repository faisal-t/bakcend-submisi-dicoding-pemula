const { nanoid } = require('nanoid');

const addBookHandler = (request, h) => {
    
    const id = nanoid(16);

    const { name, year, author,summary,publisher,pageCount,readPage,reading, } = request.payload;

    const finished = () => {
        if(pageCount === readPage){
            return true;
        }

        else{
            return false;
        }
    }

    const insertedAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newBook = {
        name, year, author,summary,publisher,pageCount,readPage,reading,finished,insertedAt,updatedAt,
      };
      
    notes.push(newBook);

    const isError = books.filter((book) => book.name == null);

    let response;

    if (isError) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku" 
          });
          response.code(400);
          return response;
      }else{
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
              bookid: id,
            },
          });
            response.code(201);
            return response;
      }

      const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
      });
      
      response.code(500);
      return response;

};

module.exports = { addBookHandler };