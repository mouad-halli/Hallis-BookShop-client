import { useCreateOrUpdateListingHook } from "./useCreateOrUpdateListingHook"
import { Book } from "../../@types/book"

interface PropsType {
    book?: Book,
    reload: () => void
}

export const CreateOrUpdateListing = (props: PropsType) => {

    const { bookData, Genres, Languages, handleChange, handleImgUpload, handleSubmit } = useCreateOrUpdateListingHook(props)

    return (
            <div className='w-full h-full flex flex-col items-center gap-y-10 md:gap-y-20 py-10'>
                <div className=' w-full flex items-center justify-between px-8'>
                    <h1 className='text-xl md:text-3xl font-medium md:justify-self-center md:mx-auto'>{props.book ? 'Update' : 'Create'} Product</h1>
                    {/* <div className='flex items-center py-3 font-medium px-6 rounded-lg bg-blue-600 text-white transition ease-linear hover:scale-110 cursor-pointer'> */}
                        <button className="hidden sm:block py-3 font-medium px-6 rounded-lg bg-blue-600 text-white transition ease-linear hover:scale-110 cursor-pointer" onClick={props.reload}>Cancel</button>
                        <button className="block sm:hidden py-3 font-medium px-6 rounded-lg bg-blue-600 text-white transition ease-linear hover:scale-110 cursor-pointer" onClick={props.reload}>X</button>
                    {/* </div> */}
                </div>
                <div className="w-5/6 lg:w-4/6 h-full flex flex-col items-center">
                    <form className="w-full h-full flex flex-col gap-y-6" onSubmit={handleSubmit}>
                        <div className="w-full flex justify-between">
                            <div className=" w-[48%] flex flex-col gap-y-2">
                                <span className="font-medium text-slate-700">Book Name</span>
                                <input
                                    type="text" placeholder="enter book name" name='name' value={bookData.name ? bookData.name : ''} onChange={handleChange}
                                    className=" w-full bg-slate-100 rounded-sm px-3 py-0.5 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                                />
                            </div>
                            <div className=" w-[48%] flex flex-col gap-y-2">
                                <span className="font-medium text-slate-700">Author Name</span>
                                <input
                                    type="text" placeholder="enter author name" name='author' value={bookData.author ? bookData.author : ''} onChange={handleChange}
                                    className=" w-full bg-slate-100 rounded-sm px-3 py-0.5 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex w-full justify-between">
                            <div className=" w-[48%] flex flex-col gap-y-2">
                                <span className="font-medium text-slate-700">Book Year</span>
                                <input
                                    type="number" placeholder="enter book year" min={0} max={new Date().getFullYear()} name='year' value={bookData.year ? bookData.year : ''} onChange={handleChange}
                                    className=" bg-slate-100 rounded-sm px-3 py-0.5 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                                />
                            </div>
                            <div className=" w-[48%] flex flex-col gap-y-2">
                                <span className="font-medium text-slate-700">Book Price</span>
                                <input
                                    type="number" placeholder="enter author price" min={0} name='price' value={bookData.price ? bookData.price : ''} onChange={handleChange}
                                    className=" bg-slate-100 rounded-sm px-3 py-0.5 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                                />
                            </div>
                        </div>
                        <div className="w-full flex justify-between ">
                            <div className=" w-[48%] flex flex-col gap-y-2">
                                <span className="font-medium text-slate-700">Stock Amount</span>
                                <input
                                    type="number" placeholder="enter author price" min={0} name='stockCount' value={bookData.stockCount ? bookData.stockCount : ''} onChange={handleChange}
                                    className=" bg-slate-100 rounded-sm px-3 py-0.5 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                                />
                            </div>
                            <div className=" w-[48%] flex flex-col gap-y-2">
                                <span className="">Book Language</span>
                                <select className=" border py-0.5 border-slate-300 focus:border-blue-400 text-center bg-white rounded appearance-none focus:outline-none " name="bookLanguage" value={bookData.bookLanguage} onChange={handleChange} >
                                    { Languages.map((language, i) =>
                                        <option key={i} className="" value={language}>{language}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className=" w-[48%] flex flex-col gap-y-2">
                            <span className="">Book Genre</span>
                            <select className=" border py-1 px-2 border-slate-300 focus:border-blue-400 text-center bg-white rounded appearance-none focus:outline-none "  name="genre" value={bookData.genre} onChange={handleChange} >
                                { Genres.map((genre, i) =>
                                    <option key={i} className=" " value={genre}>{genre}</option>
                                )}
                            </select>
                        </div>
                        <div className="w-full h-full flex flex-col gap-y-4 md:flex-row justify-between">
                            <div className="w-full md:w-[48%] h-full" >
                                <div className="flex h-full flex-col space-y-2">
                                    <span className="font-medium text-slate-700">Book Description</span>
                                    <textarea
                                        name="description" placeholder="" cols={10} rows={7} value={bookData.description ? bookData.description : ''} onChange={handleChange}
                                        className="font-crimson px-3 outline-none resize-none ring-2 ring-slate-300 focus-within:ring-blue-400 rounded-sm"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="w-full md:w-[48%] h-full" >
                                <div className="w-full h-full flex flex-col space-y-2">
                                    <span className="font-medium text-slate-700">Book Image</span>
                                    <div className="w-full py-6 flex flex-col justify-center items-center gap-y-6 border-2 border-dashed">
                                        <h4>Select File here</h4>
                                        <p className=" text-xs sm:text-sm text-slate-400">Files Supported: PDF, TEXT, DOC , DOCX</p>
                                        <label className="cursor-pointer transition hover:scale-110 ease-linear">
                                            <input type="file" name="image" className=" hidden" onChange={handleImgUpload}/>
                                            <span className="bg-blue-600 text-white px-5 py-2">Choose File</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" flex items-center justify-center mt-8">
                            <button className=" px-10 py-3 rounded-lg font-medium  bg-blue-600 text-white transition ease-linear hover:scale-110">{props.book ? 'Update' : 'Create'}</button>
                        </div>
                    </form>
                </div>
            </div>
    )
}