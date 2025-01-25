import { Link } from 'react-router-dom';
import errorImg from '../../assets/errorImg.jpg';

const Error = () => {
    return (
        <div className="flex justify-center items-center min-h-screen" >
            <div className='flex justify-center items-center flex-col gap-2' >
                <img className='max-w-lg max-h-60' src={errorImg} alt="error page" />
                <Link to={`/`} className='px-4 py-1 rounded-lg border border-black' >Back to Home</Link>
            </div>
        </div>
    );
};

export default Error;