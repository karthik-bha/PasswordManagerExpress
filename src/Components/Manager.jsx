import React, { useEffect, useState } from "react"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Manager() {
    const [pass, setPass] = useState(false)
    const [form, setForm] = useState({ URL: "", username: "", pass: "" })
    const [pwds, setPwds] = useState([])

    const fetchPwds=async()=>{
        let req=await fetch("http://localhost:3000/")
        let passw=await req.json();
        console.log(passw);
        setPwds(passw);
    }

    useEffect(()=>{
            fetchPwds();

    },[])

    const showPass = () => {
        setPass(!pass);
    }
    const addPass = async () => {
        if (form.URL.length > 3 && form.username.length > 3 && form.pass.length > 3) {
            try {
                const res = await fetch("http://localhost:3000/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                });
                const data = await res.json();
                if (data.success) {
                    setPwds([...pwds, { ...form }]);
                    setForm({ URL: "", username: "", pass: "" });
                    let msg="Successfully added!"
                    toast.success(msg, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        });
                }
            } catch (error) {
                
                let msg="Failed to save password!"
                toast.error(msg, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            }
        } else {
            toast.warn("Ensure URL, username, and pass are more than 3 letters", { position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce, });
        }
    };
    

    const removeEntry = async (index) => {
        const { URL, username, pass } = pwds[index];
        try {
            const res = await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ URL, username, pass }),
            });
            const data = await res.json();
            if (data.success) {
                setPwds(pwds.filter((_, i) => i !== index));
                toast.success("Password deleted!", { position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce, });
            }
        } catch (error) {
            toast.error("Failed to delete password!", {  position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce, });
        }
    };
    

    const copyEntry=(items)=>{
        const{URL, username, pass}= items
        const text=`${URL}, ${username}, ${pass}`;
        navigator.clipboard.writeText(text)
        let msg="Password copied!"
        toast.info(msg, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }

    const editEntry=(items,index)=>{
        setForm({URL:items.URL, username:items.username, pass:items.pass});
        removeEntry(index);
        setPwds(pwds.filter((_, i)=>i!==index));
        let msg="Entry update initiated!"
        toast.info(msg, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <ToastContainer/>
            <div className="text-center p-5 text-4xl font-bold my-5">
                <span>Pass</span>
                <span className="text-green-600">Protect</span>
            </div>
            <div className="max-w-[900px]  mx-auto">
                <div className="py-4">
                    <input type="text"
                        placeholder="Enter URL"
                        id="URL"
                        className="w-full text-center rounded-lg
                    border-solid border-2 border-black "
                        value={form.URL}
                        onChange={handleChange}
                        name="URL"
                    ></input>
                </div>

                <div className="py-4 flex gap-10">
                    <input type="text"
                        placeholder="Username"
                        id="username"
                        className="w-2/3 text-center rounded-lg
                     border-solid border-2 border-black "
                        value={form.username}
                        onChange={handleChange}
                        name="username"
                    ></input>


                    <div className="relative flex items-center">
                        <input
                            type={pass ? "text" : "password"}
                            placeholder="Password"
                            id="pass"
                            className="w-full text-center rounded-lg border-solid border-2 border-black pr-20"
                            value={form.pass}
                            onChange={handleChange}
                            name="pass"

                        />

                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={showPass}>
                            <ion-icon name={pass ? "eye-off-outline" : "eye-outline"}></ion-icon>

                        </span>
                    </div>
                </div>

            </div>

            <div className="mx-auto flex justify-center py-4">
                <button className="p-3  border-solid border-2 border-black rounded-lg" onClick={addPass}>Add Password</button>
            </div>
            <div className=" mx-auto flex justify-center">

                <table className="table-fixed w-3/4 rounded-lg text-center  overflow-hidden border border-black">
                    <tr className="border border-black">
                        <th className>URL</th>
                        <th>Name</th>
                        <th>Password </th>
                    </tr>
                    {pwds.map((items, index) => (
                        <tr key={index}>
                            <td>
                                {items.URL}
                            </td>
                            <td>
                                {items.username}
                            </td>
                            <td>
                                {items.pass}
                            </td>
                            <div className="py-3">
                            <button className="px-2 mx-2 border  rounded-md bg-red-500 text-white"onClick={()=>removeEntry(index)}>Delete </button>
                            <button className=" px-2 mx-2 border rounded-md bg-green-500 text-white" onClick={()=>copyEntry(items)}> Copy</button>
                            <button className=" px-2 mx-2 border rounded-md bg-blue-500 text-white" onClick={()=>editEntry(items, index)}> Edit</button>
                            </div>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Manager;