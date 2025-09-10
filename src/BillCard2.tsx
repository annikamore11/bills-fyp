import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ThumbsUp,
  ThumbsDown,
  Eye,
  Share,
  ArrowRightCircle,
  MapPinned,
  MailWarning,
  CalendarClock,
} from "lucide-react";

interface Bill {
  state: string;
  title: string;
  summary: string;
  keyIssues: string[];
  stats: { like: number; dislike: number; watch: number };
  status: string;
  voteDate?: string;
}

interface BillCardProps {
  bills: Bill[];
}

export default function BillCard({ bills }: BillCardProps) {
  const [index, setIndex] = useState(0);
  const totalBills = bills.length;

  const containerRef = useRef<HTMLDivElement>(null);

  const progressPercent = ((index + 1) / totalBills) * 100;

  // Scroll to the current card automatically
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [index]);

const nextBill = (dir: number) => {
setIndex((prev) => {
    let next = prev + dir;
    if (next < 0) next = 0;
    if (next >= bills.length) next = bills.length - 1;
    return next;
});
};

  const getCallToAction = (bill: Bill) => {
    if (bill.status.toLowerCase().includes("floor") || bill.status.toLowerCase().includes("voting")) {
      return `Voting soon. Send a letter!`;
    } else if (bill.status.toLowerCase().includes("committee")) {
      return `In committee. Share your opinion early.`;
    }
    return "";
  };

  return (
    <div className="flex flex-col items-center bg-white text-black px-6 min-h-screen">
      
      {/* Progress Bar */}
      <div className="w-64 ml-auto mr-6 mt-6 mb-6">
        <p className="text-sm text-gray-700 mt-1 text-right pb-2">
          Daily Progress: {index + 1} / {totalBills} Bills
        </p>
        <div className="w-full h-4 bg-gray-200 rounded-full">
          <div
            className="h-4 bg-gray-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="w-full max-w-3xl h-[70vh] overflow-y-auto snap-y snap-mandatory"
      >
        {bills.map((bill, idx) => (
          <div key={idx} className="snap-start mb-10">
            <div className="shadow-xl border-2 border-black rounded-2xl p-6">
              <div className="flex justify-between items-center mb-2">
                <p className="flex items-center text-sm mb-2">
                  <MapPinned className="w-5 h-5 text-black mr-1" /> {bill.state}
                </p>
                <span className="mb-2 text-xs font-medium px-2 py-1 rounded-full bg-gray-200 text-gray-800">
                  <p className="flex items-center text-sm">
                    <CalendarClock className="w-5 h-5 text-black mr-1" /> {bill.status}
                  </p>
                </span>
              </div>

              <h2 className="text-3xl text-center font-bold mb-3">{bill.title}</h2>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {bill.keyIssues.map((issue) => (
                  <span key={issue} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    #{issue}
                  </span>
                ))}
              </div>

              <p className="text-lg mb-6 text-center">{bill.summary}</p>

              <hr className="border-t-2 border-gray-300 my-4" />

              {getCallToAction(bill) && (
                <p className="flex items-center justify-center text-xs text-center text-black font-semibold mb-4">
                  <MailWarning className="w-5 h-5 text-red-800 mr-1" />
                  {getCallToAction(bill)}
                  <MailWarning className="w-5 h-5 text-red-800 ml-1" />
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center gap-3 mb-4">
                <button className="mb-2 bg-gray-100 text-black border border-gray-300 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-200 flex items-center gap-2">
                  <Share className="w-4 h-4" /> Share
                </button>

                <button className="bg-black text-white rounded-full px-4 py-2 text-sm font-semibold hover:scale-105 mb-2">
                  Voice Opinion
                </button>

                <button className="mb-2 bg-gray-100 text-black border border-gray-300 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-200">
                  Learn More
                </button>
              </div>

              <hr className="border-t-2 border-gray-300 my-4" />

              <div className="flex justify-around mb-4 text-center">
                <div>
                  <ThumbsUp className="w-5 h-5 mx-auto" />
                  <p className="text-xs">{bill.stats.like}</p>
                </div>
                <div>
                  <ThumbsDown className="w-5 h-5 mx-auto" />
                  <p className="text-xs">{bill.stats.dislike}</p>
                </div>
                <div>
                  <Eye className="w-5 h-5 mx-auto" />
                  <p className="text-xs">{bill.stats.watch}</p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-6 mt-4 pb-4">
        <button
          className="border-2 border-black rounded-xl px-10 text-lg font-semibold"
          onClick={() => nextBill(-1)}
        >
          <ThumbsDown className="w-16 h-16 text-black" />
        </button>
        <button
          className="border-2 border-black rounded-xl px-10 text-lg font-semibold"
          onClick={() => nextBill(0)}
        >
          <ArrowRightCircle className="w-16 h-16 text-black" />
        </button>
        <button
          className="border-2 border-black rounded-xl px-10 text-lg font-semibold"
          onClick={() => nextBill(1)}
        >
          <ThumbsUp className="w-16 h-16 text-black" />
        </button>
      </div>
    </div>
  );
}
