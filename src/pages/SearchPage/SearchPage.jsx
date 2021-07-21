import { gql, useQuery } from '@apollo/client'
// import React, { useState, useEffect } from 'react'
import AlbumCard from '../../components/AlbumCard/AlbumCard'
import React, { useState, useEffect, useRef } from "react";
import './SearchPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingPage from '../LoadingPage/LoadingPage';

function SearchPage(){
    const [name, setName] = useState('')
    var element = ''

    const ARTIST_QUERY = gql`
            query GetArtist($n: String!){
                artist(name:$n){
                    albums{
                        id
                        name
                        image
                    }
                }
            }
        `

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log(name)
            // Send Axios request here
          }, 3000)
      
          return () => clearTimeout(delayDebounceFn)
    }, [name])

    const {loading, data} = useQuery(ARTIST_QUERY, {
        variables: {
            n: name
        }
    })

    if(loading) return <LoadingPage/>

    if(data != null)
    {
        const albumList = data.artist.albums
        element = <div className="searchedSongs">
                {albumList?.map(album=>{
                    return(
                        <AlbumCard album={album} artist={name} key={album.id}/>
                    )
                })}
            </div>
    }
    else
    {
        element = ''
    }

    return(
        <div>
            <div className="search-bar">
                <FontAwesomeIcon className="white" icon="search"/>
                <input onChange={event=>setName(event.target.value)} type="text" name="" id="" />
            </div>
            <div className="search-result">
            {element}
            </div>
        </div>
    )
}

export default SearchPage