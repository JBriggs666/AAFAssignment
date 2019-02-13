const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });

const audioDataSchema = new mongoose.Schema({
    versionID: { type: Number, required: true, default: 1 },
    audioFileName: { type: String, required: true},
    audioAlbumArtist: String,
    audioAlbum: String,
    audioAlbumYear: Number,
    audioTrackNumber: Number,
    audioGenre: String,
    audioLength: String,
    audioBitRate: String,
    audioEncodingType: String,
    audioFileSize: String
});

const audioSchema = new mongoose.Schema({
    audioData: [audioDataSchema]
});

mongoose.model('audio', audioSchema);
