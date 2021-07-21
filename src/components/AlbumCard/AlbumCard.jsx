import { Link } from 'react-router-dom';
import './AlbumCard.css'

function AlbumCard(props){
    const album = props.album;
    const name = props.artist;

    return(
        <Link to={`/album/${album.id}`} className="album-list">
            <img className="album-image" src={album.image} alt=""/>
            <div className="album-details">
                <h6 className="album-name" style={{color: "#C8C8C8", textDecoration: "none"}}>{album.name}</h6>
                <h6 className="album-artist" style={{color: "#C8C8C8", textDecoration: "none"}}>{name}</h6>
            </div>
        </Link>
    )
}

export default AlbumCard