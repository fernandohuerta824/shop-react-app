import loadingImage from '../../assets/loading_img.gif'

export default function LoadingGif() {
    return <div className="container mx-auto grid place-items-center w-100 h-100">
            <img src={loadingImage} alt="Cargando..." width={150} height={150} className='text-red-500' />
        </div>
}