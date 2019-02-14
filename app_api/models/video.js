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
    VideoAudioChannels: Number,
    videoAudioSampleRate: String,
    videoEncodingType: String,
    videoSize: String
});

const videoSchema = new mongoose.Schema({
    videoData: [videoDataSchema]
});

const Video = mongoose.model('video', videoSchema);

module.exports = Video;