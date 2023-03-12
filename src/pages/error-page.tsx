import { Link, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
    const error: any = useRouteError();

    return (
        <div className="h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('/public/imgs/elo.jpg')]">
            <div className="flex flex-col items-center gap-y-20">
                <div className="flex flex-col items-center gap-y-2">
                    <h1 className="text-6xl text-white">PAGE NOT FOUND</h1>
                    <h2 className=" text-lg text-slate-200">Oops! Page you are looking for does not exist</h2>
                </div>
                <Link to="/"
                    className=" bg-gradient-to-b from-green-200 to-green-500 text-white px-10 py-1 rounded-xl shadow-lg text-lg font-medium
                    transition hover:scale-105 ease-linear
                    "
                >
                    TAKE ME TO THE HOME PAGE
                </Link>
            </div>
        </div>
    )

}