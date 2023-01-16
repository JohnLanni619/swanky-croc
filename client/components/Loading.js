import loadingIcon from '../assets/Loading.png';

export default function Loading() {
    return (
        <div className="loading-container">
            <div>
                <img src={loadingIcon} width="600px" alt="loading" />
            </div>
        </div>
    )
}