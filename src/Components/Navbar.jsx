import React from "react";

const Navbar=()=>{
return (
    <div className="w-full bg-black ">
        <div className="max-w-[1200px] text-white flex justify-between items-cente  mx-auto px-4">
            <div className="text-2xl flex p-2 ">
                <span>Pass</span>
                <span className="text-green-600">Protect</span>
                <div className="my-1">
                <ion-icon name="lock-closed-outline" ></ion-icon>
                </div>
            </div>
            <ul>
                <li className="flex gap-10 p-4">
                <a href="/" className="hover:font-bold" >Home</a>
                <a href="#" className="hover:font-bold">About</a>
                <a href="#" className="hover:font-bold">Contact</a>
                </li>
            </ul>
        </div>
            
    </div>
)
}
export default Navbar;