import BillCard from "./BillCard";

const bills = [
  {
    state: "California",
    title: "Clean Energy Act 2025",
    summary: "Require utilities to generate 70% clean energy by 2030 and invest in renewable infrastructure.",
    keyIssues: ["Renewable Energy", "Environment"],
    stats: { like: 120, dislike: 10, watch: 50 },
    status: "Senate Floor",
    voteDate: "10/01/25",
  },
  {
    state: "U.S. Federal",
    title: "One Big Beautiful Bill Act (H.R.1)",
    summary: "Cuts Medicaid/SNAP, changes tax rules, lifts energy restrictions.",
    keyIssues: ["Healthcare", "Taxes", "Energy policy", "Social programs"],
    stats: { like: 80, dislike: 200, watch: 150 },
    status: "In Committee",
    voteDate: "09/22/25",
  },
];

export default function App() {
  return <BillCard bills={bills} />;
}

