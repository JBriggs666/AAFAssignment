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
    videoSize: String,
    fileisLocked: {type: Boolean, required: true, default: false},
    fileLockedBy: { type: String, default: ''}
});

const videoSchema = new mongoose.Schema({
    videoData: [videoDataSchema]
});

mongoose.model('video', videoSchema);
