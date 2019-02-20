const chai = require('chai');
const expect = chai.expect;
const VIDEO = require('../models/video');

describe('CRUD Operations on a video record', () => {

    it('saves a video record', (done) => {

        const newVid = new VIDEO({
            videoData: {
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
                videoSize: '549 MB',
                videoAuthor: 'Jason Briggs',
                videoKeywords: 'Violence'   
            }
        });

        newVid.save((err, video) => {
            expect(video._id).to.exist;
            expect(err).to.not.exist;
            done();
        });
    });

    it('does not save records with missing videoFileName field', (done) => {

        const newVid = new VIDEO({
            videoData: {
                videoKeywords: 'Wrong'
            }
        });

        newVid.save((err, video) => {
            expect(video).to.not.exist;
            expect(err.errors).to.exist;
            done();
        });      
    });

    it('does not save records with missing videoAuthor field', (done) => {

        const newVid = new VIDEO({
            videoData: {
                videoFileName: 'testVideo',
                videoKeywords: 'Wrong'
            }
        });

        newVid.save((err, video) => {
            expect(video).to.not.exist;
            expect(err.errors).to.exist;
            done();
        });      
    });

    it('finds a saved video record', (done) => {

        VIDEO.find({ videoData: { $elemMatch: { videoFileName: 'Game of Thrones - 1x04 - Cripples, Bastards and Broken Things' } } }, (err, video) => {                    
            expect(video).to.exist;
            expect(err).to.not.exist;
            done();
        });
    });

    it('deletes a saved record', (done) => {
        VIDEO.findOneAndDelete({ videoData: { $elemMatch: { videoFileName: 'Game of Thrones - 1x04 - Cripples, Bastards and Broken Things' } } }, (err, video) => {
            expect(video).to.exist;
            expect(err).to.not.exist;
            

            VIDEO.findById(video._id, (err, video) => {
                expect(video).to.not.exist;
                done();
            });
        });
    });

    // Just to be sure that the last test did work correctly
    it('will no longer find a saved video record', (done) => {
        VIDEO.find({ videoData: { $elemMatch: { videoFileName: 'Game of Thrones - 1x04 - Cripples, Bastards and Broken Things' } } }, (err, video) => {                    
            expect(video).to.be.instanceOf(Array);
            expect(video).to.have.lengthOf(0);
            done();
        });
    });
});