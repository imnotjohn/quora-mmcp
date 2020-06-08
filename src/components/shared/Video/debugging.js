import React, { Component } from 'react';
import './index.css';
import MobilityManager from '../../img/Mobility-Manager.png';
import { connect, createLocalTracks } from 'twilio-video';

class Video extends Component {
    constructor(props) {
        super(props);

        this.state = {
            room: '',
            previewTracks: null,
            localMediaAvailable: false,
            hasJoinedRoom: false,
            identity: null,
            token: '',
            activeRoom: '',
            shouldUseEffect: true,
        }
    }

    joinRoom = () => {
        if (!this.state.room.trim()) {
            console.log("error joining room");
            return;
        }

        console.log("joining room...");
        createLocalTracks({
            audio: true,
            video: { width: 450, height: 450 },
        })
            .then(localTracks => {
                return connect(this.state.token, {
                    name: this.state.room,
                    tracks: localTracks,
                })
                    .then(room => {
                        this.roomJoined(room);
                    })
            })
    }

    // Attach a track to the DOM
    attachTrack = (track, container) => {
        container.appendChild(track.attach());
    }

    // Attach an array of tracks to the DOM
    attachTracks = (tracks, container) => {
        tracks.forEach(track => {
            container.appendChild(track.attach());
        });
    }

    attachParticipantTracks = (participant, container, isLocal) => {
        let tracks = this.getTracks(participant);
        this.attachTracks(tracks, container, isLocal);
    }

    // Detach given track from the DOM
    detachTrack = (track) => {
        track.detach().forEach(element => {
            element.remove();
        });
    }

    // Detach an array of tracks from the DOM
    // detachTracks = (tracks) => {
    // for (let track of tracks) {
    // const htmlElements = track.detach();

    // for (let htmlElement of htmlElements) {
    // htmlElement.remove();
    // }
    // }
    // }

    // A new RemoteTrack was published to the room.
    trackPublished = (publication, container) => {
        if (publication.isSubscribed) {
            this.attachTrack(publication.track, container);
        }

        publication.on('subscribed', (track) => {
            console.log('Subscribed to ' + publication.kind + ' track');
            this.attachTrack(track, container);
        });

        publication.on('unsubscribed', this.detachTrack);
    }

    // A RemoteTrack was unpublished from the Room
    trackUnpublished = (publication) => {
        console.log(publication.kind + ' track was unpublished.');
    }

    participantConnected = (participant, container) => {
        participant.tracks.forEach((publication) => {
            this.trackPublished(publication, container);
        });
        participant.on('trackPublished', (publication) => {
            this.trackPublished(publication, container);
        });
        participant.on('trackUnpublished', this.trackUnpublished);
    }

    detachParticipantTracks = (participant) => {
        let tracks = this.getTracks(participant);
        // this.detachTracks(tracks);
        tracks.forEach(this.detachTrack);
    }

    // test test
    getTracks = (participant) => {
        return Array.from(participant.tracks.values()).filter(function (publication) {
            return publication.track;
        }).map(function (publication) {
            return publication.track;
        });
    }

    // onParticipantDisconnected = (participant, error) => {
    // // When a (remote) participant disconnects, detach the assiciated tracks
    // this.detachParticipantTracks(participant);
    // }

    // onParticipantUnpublishedTrack = (track, trackPublication) => {
    // this.detachTracks([track]);
    // }

    roomJoined = (room) => {
        console.log("room joined...");

        this.setState({
            activeRoom: room,
            localMediaAvailable: true,
            hasJoinedRoom: true
        });

        // Attach LocalParticipant's Tracks, if not already attached
        var previewContainer = this.refs.localMedia;
        if (!previewContainer.querySelector('video')) {
            // this.attachParticipantTracks(room.localParticipant, previewContainer);
            this.attachTracks(this.getTracks(room.localParticipant), previewContainer);
        }

        // Attach the Tracks of the Room's Participants
        var remoteMediaContainer = this.refs.remoteMedia;
        room.participants.forEach(participant => {
            console.log("Already in Room: '" + participant.identity + "'");
            // var previewContainer = this.refs.remoteMedia;

            // this.attachParticipantTracks(participant, previewContainer);
            this.participantConnected(participant, remoteMediaContainer);
        });

        // When a participant joins the Room, log the event
        room.on('participantConnected', participant => {
            console.log("Joining: '" + participant.identity + "'");
            //test
            this.participantConnected(participant, remoteMediaContainer);
        });

        room.on('participantDisconnected', participant => {
            console.log("RemoteParticipant '" + participant.identity + "' left the room");

            this.detachParticipantTracks(participant);
        });

        // When a Participant adds a Track, attach it to the DOM.
        // room.on('trackAdded', (track, participant) => {
        // console.log(participant.identity + ' added track: ' + track.kind);
        // var previewContainer = this.refs.remoteMedia;
        // this.attachTracks([track], previewContainer);
        // });

        // When a Participant removes a Track, detach it from the DOM.
        // room.on('trackRemoved', (track, participant) => {
        // console.log(participant.identity + ' removed track: ' + track.kind);
        // this.detachTracks([track]);
        // });

        // When a Participant leaves the Room, detach its Tracks.
        // room.on('participantDisconnected', this.onParticipantDisconnected);
        // room.on('trackUnsubscribed', this.onParticipantUnpublishedTrack);

        // Once the local participant leaves the room, detach the tracks
        // of all participants, including that of the LocalParticipant
        room.on('disconnected', () => {
            if (this.state.previewTracks) {
                this.state.previewTracks.forEach(track => {
                    track.stop();
                });
            }

            this.detachParticipantTracks(room.localParticipant);
            room.participants.forEach(this.detachParticipantTracks);

            this.setState({
                activeRoom: null
            });

            this.setState({
                hasJoinedRoom: false,
                localMediaAvailable: false
            });
        })
    }

    leaveRoom = () => {
        this.state.activeRoom.disconnect();

        this.setState({
            hasJoinedRoom: false,
            localMediaAvailable: false
        }, () => {
            console.log("left room.");
        });
    }

    // useEffect = () => {

    //     if (this.state.shouldUseEffect) {
    //         const interval = setInterval(() => {
    //             this.joinRoom();

    //             this.setState({
    //                 shouldUseEffect: false,
    //             }, () => {
    //                 console.log(this.state.shouldUseEffect);
    //             });
    //         }, 9000);

    //         return () => {
    //             console.log(this.state.shouldUseEffect);
    //             clearInterval(interval);
    //         }
    //     }

    // }


    componentDidMount() {
        fetch('/api/video')
            .then(results => results.json())
            .then(data => {
                const { identity, token, room } = data;
                this.setState({
                    identity, token, room
                }, () => {
                    console.log(this.state.room);
                });
            })
        // this.useEffect();
    }


    render() {
        let showLocalTrack = this.state.localMediaAvailable ?
            (
                <div className="localMedia" ref="localMedia"></div>
            ) :
            (
                <div className="localMedia"></div>
            )

        let showRemoteTrack = (this.props.timerDuration === 0) ? //test
            (
                <div className="remoteMedia" ref="remoteMedia"></div>
            ) :
            (
                <div className="remoteMedia"><img alt="mobilitymanager" src={MobilityManager} /></div>
            )

        let joinOrLeaveRoomButton = this.state.hasJoinedRoom ?
            (
                <button onClick={this.leaveRoom} type="submit">Disconnect</button>
            ) :
            (
                <button onClick={this.joinRoom} type="submit">Start Video</button>
            )

        return (
            <div className="video-container">
                    {/* <div className="remoteMedia" ref="remoteMedia" /> */}
                    {showRemoteTrack}

                    <div className="localMedia-container">
                        {showLocalTrack}
                    </div>
                <div>
                    {joinOrLeaveRoomButton}
                </div>
            </div>
        )
    }
}

export default Video;