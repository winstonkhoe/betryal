import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import './AlbumPage.css'
import { gql, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AlbumPage(){
    let {id} = useParams();

    const ALBUM_QUERY = gql`
        query GetAlbum($id: String!){
            album(id: $id){
                name
                image
                tracks{
                    id
                    name
                    preview_url
                }
            }
        }
    `

    const {loading, data} = useQuery(ALBUM_QUERY, {
        variables: {
            id: id
        }
    })

    if(loading) return <div>Loading..</div>
    const album = data.album
    const trackList = data.album.tracks

    var currentSong = null;
    var playingSong = false;

    const playSong = (trackId)=>{
        console.log(trackId)
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
        return false
    }

    const baseString = 'favorite'
    var counter = 0
    const addToFavorite = (imagesrc, trackId)=>{
        do {
            let stringKey = baseString+counter
            let imageKey = baseString+'image'+counter
            if(localStorage.getItem(stringKey) == null)
            {
                counter = 0
                localStorage.setItem(stringKey, trackId)
                localStorage.setItem(imageKey, imagesrc)
                break
            }
            else if(localStorage.getItem(stringKey) === trackId)
            {
                counter = 0
                break
            }
            else
            {
                counter++
            }
        } while (true);
    }

    return(
        <div className="album-page-container">
            <div className="album-top">
                <div className="album-top-image-container">
                    <img className="album-top-image" src={album.image} alt="" />
                </div>
                <div className="album-detail">
                    <h4>{album.name}</h4>
                </div>
            </div>
            <div className="track-container">
                {trackList?.map(track=>{
                    return(
                        <div className="album-list">
                            <img className="album-image" src={album.image} onClick={()=>playSong(track.id)} alt=""/>
                            <div className="album-details flex-row">
                                <div className="left-detail">
                                    <h6 className="album-name">{track.name}</h6>
                                </div>
                                <div className="icon" onClick={()=>addToFavorite(album.image, track.id)}>
                                    <GenerateIcon trackid={track.id}/>
                                </div>
                                <audio id={track.id} src={track.preview_url}/>
                            </div>
                        </div>
                    )
                })}
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

export default AlbumPage
