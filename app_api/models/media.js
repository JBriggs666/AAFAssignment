const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });

const mediaDataSchema = new mongoose.Schema({
    versionID: { type: Number, required: true, default: 1 },
    FileName: { type: String, required: true},
    AudioChannelCount: Number,
    AudioEncodingBitRate: Number,
    AudioEncodingFormat: String,
    AudioSampleRate: Number,
    AudioSampleSize: Number,
    DRM: { type: Boolean, default: false },
    MediaDuration: String,
    VideoCompression: String,
    VideoEncodingBitRate: Number,
    VideoFrameHeight: Number,
    VideoFrameWidth: Number,
    VideoFrameRate: Number,
    VideoTotalBitRate: Number
});

const mediaSchema = new mongoose.Schema({
    mediaData: [mediaDataSchema]
});

mongoose.model('media', mediaSchema);
