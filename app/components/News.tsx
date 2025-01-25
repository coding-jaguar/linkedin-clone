import { fetchTechNews } from "@/actions/getNews";
import { Info } from "lucide-react";

interface NewsItem {
  heading: string;
  subHeading: string;
  link: string;
}

const News = async () => {
  const news = await fetchTechNews();

  return (
    <div className="w-[25%] md:block hidden bg-white h-fit rouded-lg p-4">
      <div className="flex justify-between items-center p-3">
        <h1 className="font-medium">Linked In News</h1>
        <Info size={18} />
      </div>
      {news.map((item: NewsItem, idx: number) => (
        <a
          href={item.link}
          target="_blank"
          rel="noreferrer"
          key={idx}
          className="block px-3 py-2 border-b hover:bg-gray-50 border-gray-100"
        >
          <h1 className="text-sm font-medium ">{item.heading}</h1>
          <p className="text-xs text-gray-600">{item.subHeading}</p>
        </a>
      ))}
    </div>
  );
};
export default News;
