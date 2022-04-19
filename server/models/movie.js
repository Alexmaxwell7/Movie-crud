const mongoose = require('mongoose')

const Movie = new mongoose.Schema(
	{
		moviename: { type: String, required: true },
		rating: { type: Number, required: true, },
		gener: { type: String, required: true },
		releasedate: { type: Date },
		cast:{type:Array}
	},
	{ collection: 'movie-data' }
)

const model = mongoose.model('MovieData', Movie)

module.exports = model