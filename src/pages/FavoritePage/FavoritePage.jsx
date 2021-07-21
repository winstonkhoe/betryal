import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import './FavoritePage.css'
import '../../components/NavBar/NavBar.css'
import { gql, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

var currentSong = null;
var playingSong = false;

function FavoritePage(){
    var listOfTrack = []
    const baseString = 'favorite'
    var counter = 0
    do {
        let stringKey = baseString+counter
        let imageKey = baseString+'image'+counter
        if(localStorage.getItem(stringKey)!=null)
        {
            let track = localStorage.getItem(stringKey)
            let image = localStorage.getItem(imageKey)
            let trackObj = {
                src: image,
                trackid: track
            }
            listOfTrack.push(trackObj)
            counter++
        }
        else
        {
            break
        }
    } while (true);

    return(
        <div className="album-page-container">
            <div className="track-container">
                {listOfTrack?.map((track) => (
                    <Track trackid={track['trackid']} imagesrc={track['src']}/>
                ))
                }
            </div>
        </div>
    )

}

function playSong(trackId){
    if(currentSong != null)
    {
        if(playingSong === true && currentSong.id !== trackId)
        {
            currentSong.pause()
            currentSong = document.getElementById(trackId)
            currentSong.play()
            playingSong = true
        }
        else if(playingSong === true && currentSong.id === trackId)
        {
            currentSong.pause()
            currentSong = null
            playingSong = false
        }
    }
    else
    {
        currentSong = document.getElementById(trackId)
        currentSong.play()
        playingSong = true
    }
    return false;
}

function removeFromFavorite (trackId){
    var counter = 0
    const baseString = 'favorite'
    do {
        let stringKey = baseString+counter
        if(localStorage.getItem(stringKey) === trackId)
        {
            localStorage.removeItem(stringKey)
            counter = 0
            break
        }
        else
        {
            counter++
        }
    } while (true);
}

function Track (props){
    const ALBUM_QUERY = gql`
        query GetTrack($id: String!){
            track(id: $id){
                name
                preview_url
            }
        }
    `
    let id = props.trackid
    let image = props.imagesrc
    console.log(image)
    const {loading, data} = useQuery(ALBUM_QUERY, {
        variables: {
            id: id
        }
    })

    if(loading) return null
    let track = data.track
    return(
        <div className="album-list">
            <img className="album-image" src={image} onClick={()=>playSong(id)} alt=""/>
            <div className="album-details flex-row">
                <div className="left-detail">
                    <h6 className="album-name">{track.name}</h6>
                </div>
                <div className="icon" onClick={()=>removeFromFavorite(id)}>
                    <GenerateIcon trackid={id}/>
                </div>
                <audio id={id} src={track.preview_url}/>
            </div>
        </div>
    )
}

function GenerateIcon(props){
    let id = props.trackid;
    const baseString = 'favorite'
    let counter = 0
    do {
        let stringKey = baseString+counter
        if(localStorage.getItem(stringKey) == null)
        {
            return <FontAwesomeIcon className="white" icon="heart-broken"/>
        }
        else
        {
            if(localStorage.getItem(stringKey) === id)
                return <FontAwesomeIcon className="white" icon="heart"/>
            counter++
        }
    } while (true);

}


export default FavoritePage
