// import dummyData from "../../data/dummy_data";
// import { useEffect, useState } from "react";
import ChatItem from "../ChatItem";

// interface Props {
//   theme?: string;
// }
interface DataProps {
  id: string;
  chat_list_id: string;
  entry_date: string;
  entry_time:string;
  response:string;
}
const ChatList = ({ data, theme }: { data: DataProps[]; theme: string | undefined }) => {

  return (
    <div className=" w-full overflow-y-scroll hiddenScrollBar mt-4 h-dvh px-6 pb-[220px]">
      {data.map((items, index) => (
        <ChatItem theme={theme} key={index} data={items} />
      ))}
    </div>
  );
};

export default ChatList;
