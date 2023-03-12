import { useCreateOrUpdateListingHook } from "./useCreateOrUpdateListingHook"
import defaultUploadImg from '../../assets/upload-image-icon.png'
import { TbFileUpload } from "react-icons/tb"
import { Book } from "../../pages/ProductPage/useProductPageHook"

interface PropsType {
    book?: Book,
    reload?: () => void
}

export const CreateOrUpdateListing = (props: PropsType) => {

    const { bookData, bookImgPreview, Genres, Languages, handleChange, handleImgUpload, handleSubmit } = useCreateOrUpdateListingHook(props)

    return (
        <div className="h-full w-full flex justify-center items-center py-4 px-2">
            <form className=" h-[96%] w-full max-w-[90%] lg:max-w-[70%] xl:max-w-[60%] 2xl:max-w-[50%] flex flex-col items-center justify-center shadow-md rounded-lg bg-white py-8 gap-y-10" onSubmit={handleSubmit}>
                <div className=" w-full flex flex-col items-center justify-center gap-y-8" >
                    <div className=" group relative h-52 md:h-72 w-2/6 xl:w-[25%] rounded-lg overflow-hidden shadow-md shadow-slate-400 hover:shadow-blue-400 transition ease-linear hover:scale-105" >
                        <label>
                            <span className="  cursor-pointer group-hover:flex justify-center items-center hidden absolute h-full w-full rounded-lg bg-opacity-50 bg-slate-800 ">
                                <TbFileUpload size={52} color="white" />
                            </span>
                            <input type="file" name="image" className=" hidden" onChange={(e) => handleImgUpload(e)}/>
                            {bookImgPreview && <img className='h-full w-full object-cover object-center cursor-pointer' src={bookImgPreview} />}
                        </label>
                    </div>
                    <div className="h-full w-5/6 flex flex-col gap-y-4">
                        <h1 className="font-bold text-xl text-slate-700">Book Informations</h1>
                        <div className="flex w-full justify-between">
                            <div className=" w-[45%] flex flex-col gap-y-2">
                                <span className="font-medium text-slate-700">Book Name</span>
                                <input
                                    type="text" placeholder="enter book name" name='name' value={bookData.name ? bookData.name : ''} onChange={handleChange}
                                    className=" bg-slate-100 rounded-md px-3 py-0.5 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                                />
                            </div>
                            <div className=" w-[45%] flex flex-col gap-y-2">
                                <span className="font-medium text-slate-700">Author Name</span>
                                <input
                                    type="text" placeholder="enter author name" name='author' value={bookData.author ? bookData.author : ''} onChange={handleChange}
                                    className=" bg-slate-100 rounded-md px-3 py-0.5 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex w-full justify-between">
                            <div className=" w-[45%] flex flex-col gap-y-2">
                                <span className="font-medium text-slate-700">Book Year</span>
                                <input
                                    type="number" placeholder="enter book year" min={0} max={new Date().getFullYear()} name='year' value={bookData.year ? bookData.year : ''} onChange={handleChange}
                                    className=" bg-slate-100 rounded-md px-3 py-0.5 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                                />
                            </div>
                            <div className=" w-[45%] flex flex-col gap-y-2">
                                <span className="font-medium text-slate-700">Book Price</span>
                                <input
                                    type="number" placeholder="enter author price" min={0} name='price' value={bookData.price ? bookData.price : ''} onChange={handleChange}
                                    className=" bg-slate-100 rounded-md px-3 py-0.5 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                                />
                            </div>
                        </div>
                        <div className="w-full flex justify-between ">
                            <div className=" w-[45%] flex flex-col gap-y-2">
                                <span className="font-medium text-slate-700">Stock Amount</span>
                                <input
                                    type="number" placeholder="enter author price" min={0} name='stockCount' value={bookData.stockCount ? bookData.stockCount : ''} onChange={handleChange}
                                    className=" bg-slate-100 rounded-md px-3 py-0.5 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                                />
                            </div>
                            <div className=" w-[45%] flex flex-col gap-y-2">
                                <span className="">Book Language</span>
                                <select className=" border py-0.5 border-slate-300 focus:border-blue-400 text-center bg-white rounded appearance-none focus:outline-none " name="bookLanguage" value={bookData.bookLanguage} onChange={handleChange} >
                                    { Languages.map((language, i) =>
                                        <option key={i} className="" value={language}>{language}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className=" w-[45%] flex flex-col gap-y-2">
                        <span className="">Book Genre</span>
                        <select className=" border py-1 px-2 border-slate-300 focus:border-blue-400 text-center bg-white rounded appearance-none focus:outline-none "  name="genre" value={bookData.genre} onChange={handleChange} >
                            { Genres.map((genre, i) =>
                                <option key={i} className=" " value={genre}>{genre}</option>
                            )}
                        </select>
                    </div>
                    </div>
                </div>
                <div className="w-5/6 flex flex-col justify-between gap-y-4">
                    <div className="w-full h-full" >
                        <div className="flex flex-col space-y-2">
                            <span className="font-medium text-slate-700">Book Description</span>
                            <textarea
                                name="description" placeholder="" cols={10} rows={6} value={bookData.description ? bookData.description : ''} onChange={handleChange}
                                className="font-crimson px-3 outline-none resize-none ring-2 ring-slate-300 focus-within:ring-blue-400 rounded-sm"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className=" w-full flex items-center justify-center gap-x-52">
                    { props.book && <button type="button" className=" text-white font-medium px-10 py-2 rounded-lg bg-slate-800 hover:scale-105 transition ease-linear " onClick={props.reload} >Cancel</button>}
                    <button type="submit" className=" text-white font-medium px-10 py-2 rounded-lg bg-blue-500 hover:scale-105 transition ease-linear " >{props.book ? 'Update' : 'Create'}</button>
                </div>
            </form>
        </div>
    )
}