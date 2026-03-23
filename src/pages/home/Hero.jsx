import { useState } from "react";
import { HeartIcon } from "./Icons";

export default function Hero() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calcBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w) return;
    const val = (w / (h * h)).toFixed(1);
    setBmi(val);
    if (val < 18.5) setCategory("Underweight");
    else if (val < 25) setCategory("Normal");
    else if (val < 30) setCategory("Overweight");
    else setCategory("Obese");
  };

  const categoryColor = {
    Underweight: "text-blue-500",
    Normal: "text-emerald-500",
    Overweight: "text-amber-500",
    Obese: "text-red-500",
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/40 to-teal-50"/>
      <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-emerald-100/60 to-transparent blur-3xl"/>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-teal-100/50 to-transparent blur-3xl"/>

      {/* Floating food emojis */}
      {["🥑","🫐","🥦","🍎","🥕","🫚"].map((em, i) => (
        <div key={i} className="absolute text-2xl opacity-20 animate-bounce select-none pointer-events-none"
          style={{
            top: `${15 + i * 13}%`,
            right: `${8 + (i % 3) * 6}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${2.5 + i * 0.3}s`
          }}>
          {em}
        </div>
      ))}

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-20">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
            <HeartIcon/> Smart Health Platform
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-800 leading-tight mb-6" style={{fontFamily:"'Playfair Display',serif"}}>
            Eat Smart,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
              Live Healthy
            </span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-md">
            Get personalized food suggestions, medicine guidance, and doctor appointments — all based on your BMI. Your journey to a healthier life starts here.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all">
              Browse Food Plans
            </button>
            <button className="px-7 py-3.5 rounded-full border-2 border-emerald-200 text-emerald-700 font-bold hover:bg-emerald-50 transition-all">
              Calculate BMI
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10">
            {[["10K+","Users"],["500+","Food Plans"],["4.9★","Rating"]].map(([n,l])=>(
              <div key={l}>
                <div className="text-2xl font-black text-slate-800">{n}</div>
                <div className="text-sm text-slate-500">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Quick BMI Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/80 p-8 border border-slate-100">
          <h3 className="text-xl font-black text-slate-800 mb-1" style={{fontFamily:"'Playfair Display',serif"}}>
            Quick BMI Check
          </h3>
          <p className="text-slate-500 text-sm mb-6">Enter your details to get instant results</p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Height (cm)</label>
              <input
                type="number"
                placeholder="e.g. 170"
                value={height}
                onChange={e => setHeight(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-400 focus:outline-none text-slate-800 font-medium transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Weight (kg)</label>
              <input
                type="number"
                placeholder="e.g. 65"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-400 focus:outline-none text-slate-800 font-medium transition-colors"
              />
            </div>
            <button
              onClick={calcBMI}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-200 transition-all"
            >
              Calculate My BMI
            </button>
          </div>

          {bmi && (
            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 text-center">
              <div className="text-4xl font-black text-slate-800 mb-1">{bmi}</div>
              <div className={`font-bold text-lg ${categoryColor[category]}`}>{category}</div>
              <p className="text-xs text-slate-500 mt-2">
                {category === "Normal" ? "Great! You're in the healthy range." :
                 category === "Underweight" ? "You may need more nutritious calories." :
                 "Consider a balanced diet and exercise plan."}
              </p>
              <button className="mt-3 px-5 py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors">
                Get Food Suggestions →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}