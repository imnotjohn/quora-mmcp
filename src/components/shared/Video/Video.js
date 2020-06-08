import React, { Component } from 'react';
import './Video.css';
import {connect, createLocalTracks} from 'twilio-video';

import MobilityManager from './../img/Mobility-Manager.png';
import panelcall from './../img/Button-Phone-Call.png';
import panelend from './../img/Button-Phone-End.png';

import {setTransitionTimeout} from '../../../utils/helper.js';

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
            localSize: 125,
        }
    }



    joinRoom = () => {
        let localSize = this.state.localSize;

        if (!this.state.room.trim() ) {
            console.log("error joining room");
            return;
        }

        console.log("joining room...");
        createLocalTracks({
            audio: true,
            video: { width: localSize, height: localSize},
        })
        .then( localTracks => {
            return connect(this.state.token, {
                name: this.state.room,
                tracks: localTracks,
            })
            .then( room => {
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
        tracks.forEach( track => {
            container.appendChild(track.attach());
        });
    }

    attachParticipantTracks = (participant, container, isLocal) => {
        let tracks = this.getTracks(participant);
        this.attachTracks(tracks, container, isLocal);
    }

    // Detach given track from the DOM
	detachTrack = (track) => {
		track.detach().forEach( element => {
			element.remove();
		});
	}

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
    	participant.tracks.forEach( (publication) => {
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
        return Array.from(participant.tracks.values()).filter(function(publication) {
            return publication.track;
        }).map(function(publication) {
            return publication.track;
        });
    }

    roomJoined = (room) => {
        console.log("room joined...");

        this.setState({
            activeRoom: room,
            localMediaAvailable: true,
            hasJoinedRoom: true
        }, () => {
            if (this.props.clientIdentity === 'OVU') {
                this.props.togglePrimaryInfo();
            }
        });

        // Attach LocalParticipant's Tracks, if not already attached
		var previewContainer = this.refs.localMedia;
		if (!previewContainer.querySelector('video')) {
			this.attachTracks(this.getTracks(room.localParticipant), previewContainer);
		}

        // Attach the Tracks of the Room's Participants
        var remoteMediaContainer = this.refs.remoteMedia;
        room.participants.forEach( participant => {
            this.participantConnected(participant, remoteMediaContainer);
            console.log("Already in Room: '" + participant.identity + "'");
        });

        // When a participant joins the Room, log the event
        room.on('participantConnected', participant => {
            console.log("Joining: '" + participant.identity + "'");
            this.participantConnected(participant, remoteMediaContainer);
        });

        room.on('participantDisconnected', participant => {
            this.detachParticipantTracks(participant);
        	console.log("RemoteParticipant '" + participant.identity + "' left the room");
        });

        // Once the local participant leaves the room, detach the tracks
        // of all participants, including that of the LocalParticipant
        room.on('disconnected', () => {
            if (this.state.previewTracks) {
                this.state.previewTracks.forEach( track => {
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

	componentDidMount() {
        fetch('/api/video', {
            method: 'POST',
            body: JSON.stringify({
                identity: this.props.clientIdentity}),
            headers: {"Content-Type": "application/json"},
        })
            .then(results => results.json())
            .then(data => {
                const { identity, token, room } = data;
                this.setState({
                    identity, token, room
                }, () => {
                    console.log(this.state.room);
                });
            })

        // Automatically initiate video call based on client rules
        this.initiateCall(this.props.clientIdentity);
        // Update localSize prop to change local video dimensions according to client name.
        this.updateLocalSize(this.props.clientIdentity);
    }

    initiateCall = (client) => {
        switch (client) {
            case 'PASS':
                //passenger client rules -- auto-join ~instantly
                setTransitionTimeout(100, this.joinRoom);
                break;
            case 'OVU':
                //ovu client rules -- auto-join after t=4s
                setTransitionTimeout(4000, this.joinRoom);
                break;
            default:
                //mobility manager rules -- auto-join immediately
                this.joinRoom();
        }
    }

    updateLocalSize = (client) => {
        if (client === 'MMSAM') {
            this.setState({
                localSize: 650,
            });
        } 
    }

    render() {
            let showLocalTrack = (this.props.clientIdentity === 'PASS' || (this.props.timerDuration === 0 && this.state.localMediaAvailable)) ?
            (
                <div className="localMedia" ref="localMedia"></div>
            ) :
            (
                <div className="localMedia"></div>
            )

            let showRemoteTrack = (this.props.clientIdentity === 'PASS' || this.props.timerDuration === 0) ?
        	(
				<div className="remoteMedia" ref="remoteMedia"></div>	
        	) : 
        	(
        		<div className="remoteMedia"><img alt="mobilitymanager" src={MobilityManager}/></div>
        	)

            // let joinOrLeaveRoomButton = this.state.hasJoinedRoom ?
            // (
            //     <button onClick={this.leaveRoom} type="submit">Disconnect</button>
            // ) :
            // (
            //     <button onClick={this.joinRoom} type="submit">Start Video</button>
            // )

            return (
                <div className="video-container">
                    { showRemoteTrack }
                    <div className="localMedia-container">
                        { showLocalTrack }
                    </div>
                    <div id="video-call-operations">
                        <img onClick={this.joinRoom} src={panelcall} className="video-call-buttons call" alt="call" disabled={this.state.hasJoinedRoom} />
                        <img onClick={this.leaveRoom} src={panelend} className="video-call-buttons end" alt="end" disabled={!this.state.hasJoinedRoom} />
                    </div>
                </div>
            )
    }
}

export default Video;
