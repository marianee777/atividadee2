const mongoose = require("mongoose")

const comentarioSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    dataC:{
        type: String,
        required: true
    },
    comentario:{
        type: String,
        required: true
    }
})

const comentario = mongoose.model('comentario', comentarioSchema)

module.exports = comentario