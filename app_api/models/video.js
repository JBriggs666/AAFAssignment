const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });

const videoDataSchema = new mongoose.Schema({
    versionID: { type: Number, required: true, default: 1 },
    videoFileName: { type: String, required: true},
    videoLength: String,
    videoFrameHeight: Number,
    videoFrameWidth: Number,
    videoDataRate: String,
    videoTotalBitRate: String,
    videoFrameRate: String,
    videoAudioBitRate: String,
    videoAudioChannels: Number,
    videoAudioSampleRate: String,
    videoEncodingType: String,
    videoSize: String,
    videoAuthor: { type: String, required: true },
    videoCreationDate: { type: Date, required: true, default: Date.now },
    videoKeywords: { type: String }
});

const videoSchema = new mongoose.Schema({
    
    fileisLocked: {type: Boolean, required: true, default: false},
    fileLockedBy: { type: String, default: ''},
    videoData: [videoDataSchema]
});

// exported like this for unit testing to work
module.exports = VIDEO = mongoose.model('video', videoSchema);
