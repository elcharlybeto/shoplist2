import Link from "next/link";
import { FaList } from "react-icons/fa";
import CompactView from "../ui/compact-view";

const Page = () => {
  return (
    <div className="mt-20 flex w-8/12 max-h-screen justify-center">
      <Link href={"/list"}>
        <button className="fixed right-3 bottom-4 p-2 bg-floating border border-primary rounded-xl disabled:hidden ">
          <FaList size={32} />
        </button>
      </Link>
      <CompactView />
    </div>
  );
};

export default Page;
