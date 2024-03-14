import { useDispatch } from "react-redux";
import { selectedLink } from "../store/actions/linkAction";
import log from "../utils/log";
export default function Link(props) {
  const dispatch = useDispatch();
  const show = () => {
    dispatch(selectedLink(props.linkdataid, props.cname));
  };
  return (
    <div
      className="flex justify-between items-center p-2 hover:bg-green-500 cursor-pointer"
      onClick={show}
    >
      <div className="flex">
        <div className="w-10 h-10 flex justify-center items-center">
          {/* <Image className="" alt="" src="" /> */}
        </div>
        <div className="flex flex-col w-10 h-10">
          <b className="text-sm">{props.cname}</b>
          <i className="text-xs text-gray-400">{props.cname}</i>
        </div>
      </div>
      <div className="text-gray-400 text-sm">{props.cname}</div>
    </div>
  );
}
