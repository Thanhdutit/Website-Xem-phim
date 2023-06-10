import { PuffLoader } from "react-spinners";
function Loader()
{
    return (
        <div className="text-center ml-20 h-9 mb-3 flex-colo">
            <PuffLoader color="#F20000"/>
        </div>
    )
}
export default Loader