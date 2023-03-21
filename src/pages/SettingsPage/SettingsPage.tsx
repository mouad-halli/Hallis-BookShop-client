import { useSettingsHook } from "./useSettingsHook"

export const SettingsPage = () => {

    const {
        userData, addressData, handleUserDataChange,
        handleAddressDataChange, handleUpdateProfileSubmit,
        handleAddressFormSubmit, isAddressExist, handleDeleteAddress
    } = useSettingsHook()

    return (
        <div className="h-full min-h-screen w-full flex flex-col items-center py-20 gap-y-4">
            <form className="w-5/6 sm:w-4/6 flex flex-col gap-y-4 " onSubmit={handleUpdateProfileSubmit}>
                <h1 className="font-bold text-2xl text-slate-700">Profile Informations</h1>
                <div className="flex w-full justify-between">
                    <div className=" w-[45%] flex flex-col gap-y-2">
                        <span className="font-medium text-slate-700">First Name</span>
                        <input
                            type="text" placeholder="enter first name" name="firstname" value={userData.firstname ? userData.firstname : ''} onChange={handleUserDataChange}
                            className=" w-full bg-slate-100 rounded-md px-3 py-1 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                        />
                    </div>
                    <div className=" w-[45%] flex flex-col gap-y-2">
                        <span className="font-medium text-slate-700">Last Name</span>
                        <input
                            type="text" placeholder="enter last name" name="lastname" value={userData.lastname ? userData.lastname : ''} onChange={handleUserDataChange}
                            className=" w-full bg-slate-100 rounded-md px-3 py-1 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                        />
                    </div>
                </div>
                <div className="flex w-full justify-between">
                    <div className=" w-[45%] flex flex-col gap-y-2">
                        <span className="font-medium text-slate-700">Email</span>
                        <input
                            type="email" placeholder="enter email" name="email" value={userData.email ? userData.email : ''} onChange={handleUserDataChange}
                            className=" w-full bg-slate-100 rounded-md px-3 py-1 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                        />
                    </div>
                    <div className=" w-[45%] flex flex-col gap-y-2">
                        <span className="font-medium text-slate-700">Phone</span>
                        <input
                            type="text" pattern="^[0-9]{10,15}$" placeholder="enter phone" name="phone" value={userData.phone ? userData.phone : ''} onChange={handleUserDataChange}
                            className=" w-full bg-slate-100 rounded-md px-3 py-1 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                        />
                    </div>
                </div>
                <div className="flex w-full justify-between">
                    <div className=" w-[45%] flex flex-col gap-y-2">
                        <span className="font-medium text-slate-700">username</span>
                        <input
                            type="text" placeholder="enter username" name="username" value={userData.username ? userData.username : ''} onChange={handleUserDataChange}
                            className=" w-full bg-slate-100 rounded-md px-3 py-1 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                        />
                    </div>
                    <div className=" w-[45%] flex flex-col gap-y-2">
                        <span className="font-medium text-slate-700">password</span>
                        <input
                            type="password" placeholder="enter password" name="password" value={userData.password ? userData.password : ''} onChange={handleUserDataChange}
                            className=" w-full bg-slate-100 rounded-md px-3 py-1 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                        />
                    </div>
                </div>
                <div className=" w-full flex items-center justify-end pt-4">
                    <button className="bg-slate-800 text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-blue-500 hover:scale-105 transition ease-linear " >Update Profile</button>
                </div>
            </form>
            <form className="w-5/6 sm:w-4/6 flex flex-col gap-y-4 " onSubmit={handleAddressFormSubmit}>
                <h1 className="font-bold text-2xl text-slate-700">Address Information</h1>
                <div className="flex w-full justify-between">
                    <div className=" w-[45%] flex flex-col gap-y-2">
                        <span className="font-medium text-slate-700">Street 1</span>
                        <input
                            type="text" placeholder="enter street 1" name="street1" value={addressData.street1 ? addressData.street1 : ''} onChange={handleAddressDataChange}
                            className=" w-full bg-slate-100 rounded-md px-3 py-1 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                        />
                    </div>
                    <div className=" w-[45%] flex flex-col gap-y-2">
                        <span className="font-medium text-slate-700">street 2</span>
                        <input
                            type="text" placeholder="enter address 2" name="street2" value={addressData.street2 ? addressData.street2 : ''} onChange={handleAddressDataChange}
                            className=" w-full bg-slate-100 rounded-md px-3 py-1 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                        />
                    </div>
                </div>
                <div className="flex w-full justify-between">
                    <div className=" w-[45%] flex flex-col gap-y-2">
                        <span className="font-medium text-slate-700">Country</span>
                        <input
                            type="text" placeholder="enter country" name="country" value={addressData.country ? addressData.country : ''} onChange={handleAddressDataChange}
                            className=" w-full bg-slate-100 rounded-md px-3 py-1 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                        />
                    </div>
                    <div className=" w-[45%] flex flex-col gap-y-2">
                        <span className="font-medium text-slate-700">City</span>
                        <input
                            type="text" placeholder="enter city" name="city" value={addressData.city ? addressData.city : ''} onChange={handleAddressDataChange}
                            className=" w-full bg-slate-100 rounded-md px-3 py-1 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                        />
                    </div>
                </div>
                <div className=" w-[45%] flex flex-col gap-y-2 ">
                        <span className="font-medium text-slate-700">Zip Code</span>
                        <input
                            type="text" placeholder="enter zip code"  name="zipCode" value={addressData.zipCode ? addressData.zipCode : ''} onChange={handleAddressDataChange}
                            className=" w-full bg-slate-100 rounded-md px-3 py-1 focus-within:outline-none ring-2 ring-slate-300 focus-within:ring-blue-300 placeholder:text-sm"
                        />
                </div>
                <div className=" w-full flex items-center justify-end gap-x-6">
                    <button type="submit" className="bg-slate-800 text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-blue-500 hover:scale-105 transition ease-linear " >
                        { isAddressExist ? 'Update' : 'Create' } Address
                    </button>
                    {isAddressExist && <button type="button" className="bg-slate-800 text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-red-500 hover:scale-105 transition ease-linear " onClick={handleDeleteAddress} >Delete Address</button>}
                </div>
            </form>
        </div>
    )
}