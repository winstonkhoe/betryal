import './LoadingPage.css'
import 'bootstrap/dist/css/bootstrap.css';

function LoadingPage()
{
    return(
        <div className="loading-container">
            <div class="spinner-border white" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingPage