import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, Eye, Share, ArrowRightCircle, ArrowLeftCircle, MapPinned, MailWarning, CalendarClock } from "lucide-react";


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
  const [direction, setDirection] = useState(0);
  const [action, setAction] = useState<"like" | "dislike" | "skip" | "back" | null>(null);


  const nextBill = (dir: number, act: "like" | "dislike" | "skip" | "back") => {
    setAction(act);
    setDirection(dir);
    setIndex((prev) => (prev + (dir || 1) + bills.length) % bills.length);
  };

  const totalBills = 20;
  const progressPercent = ((index + 1) / totalBills) * 100;

  const getCallToAction = () => {
    const bill = bills[index];
    if (bill.status.toLowerCase().includes("floor") || bill.status.toLowerCase().includes("voting")) {
      return `Voting soon. Send a letter!`;
    } else if (bill.status.toLowerCase().includes("committee")) {
      return `In committee. Share your opinion early.`;
    }
    return "";
  };


  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir === 0 ? 0 : dir * 100,
      y: 0,
      borderColor: "black", // reset when new enters
    }),
    center: { opacity: 1, x: 0, y: 0, borderColor: "black" },
    exit: ({ direction, action }: { direction: number; action: string | null }) => {
      if (action === "like") return { opacity: 0, x: 300, rotate: 10, borderColor: "#166534" };
      if (action === "dislike") return { opacity: 0, x: -300, rotate: -10, borderColor: "#991b1b" };
      if (action === "skip") return { opacity: 0, y: 300 };
      if (action === "back") return { opacity: 0, y: -300 };
      return { opacity: 0 };
    },
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black px-6">
      <div className="justify-center ml-auto mr-6">
        <p className="text-s text-gray-700 mt-1 text-right pb-2">
            Daily Progress: {index + 1} / {totalBills} Bills 
        </p>
        <div className="w-full h-4 bg-gray-200 rounded-full">
            <div
            className="h-4 pr-6 bg-gray-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
            ></div>
        </div>
      </div>
      
      <AnimatePresence mode="wait" custom={{direction, action}}>
        <motion.div
          key={index}
          custom={{ direction, action }}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.9 }}
          className="w-full max-w-md mx-auto shadow-xl border-3 border-black rounded-2xl p-6 m-6"
          style={{
            borderColor:
              action === "like" ? "#166534" : // green-500
              action === "dislike" ? "#991b1b" : // red-500
              "black", // default
          }}
        >
         
            <div className="flex justify-between items-center mb-2">
                <p className="flex items-center text-sm mb-2">
                  <MapPinned className="w-5 h-5 text-black mr-1" /> {bills[index].state}
                </p>
                <span className="mb-2 text-xs font-medium px-2 py-1 rounded-full bg-gray-200 text-gray-800">
                  <p className="flex items-center text-sm">
                    <CalendarClock className="w-5 h-5 text-black mr-1" />{bills[index].status}
                  </p>
                </span>
            </div>

            <h2 className="text-3xl text-center font-bold mb-3">{bills[index].title}</h2>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {bills[index].keyIssues.map((issue) => (
                <span
                  key={issue}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  #{issue}
                </span>
              ))}
            </div>

            <p className="text-lg mb-6 text-center ">{bills[index].summary}</p>
            
            <hr className="border-t-2 border-gray-300 my-4" />
            
            {/* Call to Action */}
            {getCallToAction() && (
              <p className="flex items-center justify-center text-xs text-center text-black font-semibold mb-4">
                <MailWarning className="w-5 h-5 text-red-800 mr-1" />
                {getCallToAction()}
                <MailWarning className="w-5 h-5 text-red-800 ml-1" />
              </p>
            )}


            
            <div className="flex justify-center gap-3">
                {/* Share button */}
              <button className="mb-2 bg-gray-100 text-black border border-gray-300 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-200 flex items-center gap-2"
              style={{backgroundColor: "#E5E7EB", color:"black"}}>
                <Share className="w-4 h-4" />
                Share
              </button>
              {/* Voice Opinion button (animated if urgent) */}
              {bills[index].status.toLowerCase().includes("floor") ||
              bills[index].status.toLowerCase().includes("vote") ? (
                <motion.button
                  className="bg-black text-white rounded-full px-4 py-2 text-sm font-semibold mb-2"
                  style={{ backgroundColor: "black", color:"white"}}
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    scale: [1, 1.08, 1],
                    boxShadow: [
                      "0 0 0px rgba(0,0,0,0)",
                      "0 0 12px rgba(0,0,0,0.6)",
                      "0 0 0px rgba(0,0,0,0)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Voice Opinion
                </motion.button>
              ) : (
                <button className="bg-black text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-gray-800 mb-2"
                style={{ backgroundColor: "black", color:"white"}}>
                  Voice Opinion
                </button>
              )}

              {/* Learn More button */}
              <button className="mb-2 bg-gray-100 text-black border border-gray-300 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-200 >"
              style={{ backgroundColor: "#E5E7EB", color:"black"}}>
                Learn More
              </button>
            </div>

           <hr className="border-t-2 border-gray-300 my-4" />
            <div className="flex justify-around mb-4 text-center">
              <div>
                <ThumbsUp className="w-5 h-5 mx-auto" />
                <p className="text-xs">{bills[index].stats.like}</p>
              </div>
              <div>
                <ThumbsDown className="w-5 h-5 mx-auto" />
                <p className="text-xs">{bills[index].stats.dislike}</p>
              </div>
              <div>
                <Eye className="w-5 h-5 mx-auto" />
                <p className="text-xs">{bills[index].stats.watch}</p>
              </div>
              
            </div>
          
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-6 mt-2 pb-4">
        <button
          className="border-2 border-black rounded-xl px-10 text-lg font-semibold"
          style={{backgroundColor: "#E5E7EB", border: "2px solid black"}}
          onClick={() => nextBill(0, "back")}
        >
          <ArrowLeftCircle className="w-16 h-16 text-black" />
        </button>
        <button
          className="border-2 border-black rounded-xl px-10 text-lg font-semibold"
          style={{backgroundColor: "#E5E7EB", border: "2px solid black"}}
          onClick={() => nextBill(-1, "dislike")}
        >
          <ThumbsDown className="w-16 h-16 text-black" />
        </button>
        
        <button
          className="border-2 border-black rounded-xl px-10 text-lg font-semibold"
          style={{backgroundColor: "#E5E7EB", border: "2px solid black"}}
          onClick={() => nextBill(1, "like")}
        >
          <ThumbsUp className="w-16 h-16 text-black" />

        </button>
        <button
          className="border-2 border-black rounded-xl px-10 text-lg font-semibold"
          style={{backgroundColor: "#E5E7EB", border: "2px solid black"}}
          onClick={() => nextBill(0, "skip")}
        >
          <ArrowRightCircle className="w-16 h-16 text-black" />
        </button>
        
      </div>
    </div>
  );
}
