// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// toast.configure();
import { ToastContainer, toast } from 'react-toastify';



export const notify = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: "light",
    })

};


export const errorNotify = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: "red",
    })

};


