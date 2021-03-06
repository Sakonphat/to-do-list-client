import { toast } from 'react-toastify';

export default function notify(msg, type) {
    toast[`${type}`](msg, {
        position: "top-right",
        autoClose: type === "warn" ? false : 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
