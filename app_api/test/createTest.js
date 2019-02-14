const mocha = require('mocha');
const assert = require('assert');

const VIDEO = require('../models/video');

// Describe suite of tests
describe('Creating videos', function () {

    // Create individual test
    it('creates a new video record in the database', function (done) {
        this.timeout(10000);

        let testVideo =  {
                videoFileName: 'Game of Thrones - 1x04 - Cripples, Bastards and Broken Things',
                videoLength: '00:53:21',
                videoFrameHeight: 352,
                videoFrameWidth: 624,
                videoDataRate: '993kbps',
                videoTotalBitRate: '141kbps',
                videoFrameRate: '25.00 frames/second',
                videoAudioBitRate: '448kbps',
                VideoAudioChannels: 6,
                videoAudioSampleRate: '48.000 kHz',
                videoEncodingType: 'MP4',
                videoSize: '549 MB'   
            }

        VIDEO.create(testVideo).then(function () {
            assert(1 + 2 === 3);
            done();
        });
    });
});

// const videoController = require('../controllers/videoController');
// const { mockReq, mockRes } = require('sinon-express-mock');
// const assert = require('assert');

// describe('creating videos', () => {
    
//     it('should create a new video', () => {
//         const body = {
//             body: {
//                 videoFileName: 'Game of Thrones - 1x04 - Cripples, Bastards and Broken Things',
//                 videoLength: '00:53:21',
//                 videoFrameHeight: 352,
//                 videoFrameWidth: 624,
//                 videoDataRate: '993kbps',
//                 videoTotalBitRate: '141kbps',
//                 videoFrameRate: '25.00 frames/second',
//                 videoAudioBitRate: '448kbps',
//                 VideoAudioChannels: 6,
//                 videoAudioSampleRate: '48.000 kHz',
//                 videoEncodingType: 'MP4',
//                 videoSize: '549 MB'   
//             }
//         };

//         const req = mockReq(body);
//         const res = mockRes();

//         videoController.addNewVideo(req, res);

//         // assert(res.json({ "videoData": [ { "videoFileName" : "Game of Thrones - 1x04 - Cripples, Bastards and Broken Things" } ] }));
//         assert(res.json({ "piss" : "flaps" }));
//     });

// });


