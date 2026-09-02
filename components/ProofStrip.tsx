import { projects, stats } from "@/lib/portfolio-data";

const proofItems = [
  { value: stats[0].value, label: "years building systems" },
  { value: String(projects.length), label: "projects documented" },
  { value: stats[1].value, label: "primary engineering track" },
  { value: stats[3].value, label: "product focus" }
];

export function ProofStrip() {
  return (
    <section className="proof-strip section" aria-label="Portfolio proof points">
      {proofItems.map((item, index) => (
        <div className="proof-item" key={item.label}>
          <span className="proof-index">0{index + 1}</span>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </section>
  );
}
