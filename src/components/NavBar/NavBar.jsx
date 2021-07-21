import './NavBar.css'

var listAddress = ['Search', 'Favorites']
const webAddress = window.location.href;

function NavBar()
{

    return(
        <div id="navbar" className="navcontainer">
            {listAddress.map((address) => (
                <NavItem href={address}/>
            ))
            }
            {/* <div className="item selected">
                <a href="/artist">Home</a>
            </div>
            <div className="item">
                <a href="/search">Search</a>
            </div>
            <div className="item">
                <a href="/favorites">Favorites</a>
            </div> */}

        </div>
    )
}

function NavItem(props){
    let href = props.href
    let link = '/'+href.toLowerCase()
    if(webAddress.includes(href.toLowerCase()))
    {
        return(
            <div className="item selected">
                <a href={link} style={{color: "#C8C8C8", textDecoration: "none"}}>{href}</a>
            </div>
        )
    }
    else
    {
        return(
            <div className="item">
                <a href={link} style={{color: "#C8C8C8", textDecoration: "none"}}>{href}</a>
            </div>
        )
    }

}


export default NavBar;