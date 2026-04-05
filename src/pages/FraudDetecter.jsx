import { useEffect, useMemo, useState } from "react";
import { FiAlertTriangle, FiCheckCircle, FiShield, FiSearch } from "react-icons/fi";
import { checkMessage } from "../services/Api";

const INITIAL_MESSAGE = "You won Rs10000! Click http://fake-link.biz now";

const FraudDetector = () => {
    const [message, setMessage] = useState(INITIAL_MESSAGE);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [animatedConfidence, setAnimatedConfidence] = useState(0);
    const [popup, setPopup] = useState(null);

    const classificationMeta = useMemo(() => {
        const classification = (result?.ml_prediction || result?.classification || "").toUpperCase();

        if (classification === "SAFE") {
            return {
                label: "Safe",
                icon: FiCheckCircle,
                badge: "border-emerald-400/30 bg-emerald-500/15 text-emerald-300",
                accent: "from-emerald-400 to-cyan-400",
                gaugeColor: "#34d399"
            };
        }

        if (classification === "SUSPICIOUS") {
            return {
                label: "Suspicious",
                icon: FiAlertTriangle,
                badge: "border-yellow-400/30 bg-yellow-500/15 text-yellow-300",
                accent: "from-yellow-400 to-orange-400",
                gaugeColor: "#f59e0b"
            };
        }

        return {
            label: "Fraud",
            icon: FiShield,
            badge: "border-red-400/30 bg-red-500/15 text-red-300",
            accent: "from-red-400 to-pink-400",
            gaugeColor: "#ef4444"
        };
    }, [result]);

    useEffect(() => {
        const target = Math.round((Number(result?.confidence) || 0) * 100);

        if (!result) {
            setAnimatedConfidence(0);
            return undefined;
        }

        const duration = 900;
        const start = window.performance.now();
        let rafId = 0;

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setAnimatedConfidence(Math.round(target * eased));

            if (progress < 1) {
                rafId = window.requestAnimationFrame(tick);
            }
        };

        rafId = window.requestAnimationFrame(tick);
        return () => window.cancelAnimationFrame(rafId);
    }, [result]);

    useEffect(() => {
        if (!result) {
            setPopup(null);
            return undefined;
        }

        const classification = (result?.ml_prediction || result?.classification || "").toUpperCase();
        let tone = "green";
        let title = "Safe";
        let messageText = "No suspicious activity detected.";

        if (classification === "FRAUD") {
            tone = "red";
            title = "Fraud detected";
            messageText = "This message looks unsafe. Review it before taking any action.";
        } else if (classification === "SUSPICIOUS") {
            tone = "yellow";
            title = "Suspicious message";
            messageText = "This message needs caution and manual verification.";
        }

        setPopup({ tone, title, messageText });
        const timeoutId = window.setTimeout(() => setPopup(null), 3200);
        return () => window.clearTimeout(timeoutId);
    }, [result]);

    const handleClear = () => {
        setMessage(INITIAL_MESSAGE);
        setResult(null);
        setLoading(false);
        setError("");
        setAnimatedConfidence(0);
        setPopup(null);
    };

    const handleAnalyze = async () => {
        const cleaned = message.trim();

        if (!cleaned) {
            setError("Paste or type a message to analyze.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const response = await checkMessage({ text: cleaned });
            console.log("Message analysis response:", response);
            setResult(response?.data?.data ?? null);
        } catch (err) {
            console.error("Message analysis failed:", err);
            setError("Unable to analyze the message right now.");
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-[calc(100vh-6rem)] overflow-hidden">
            <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-5 px-4 py-4 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:px-8">
                <div className="flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.16)] backdrop-blur-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-medium text-cyan-200">
                        <FiShield />
                        Fraud Detection
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-white sm:text-3xl">
                            Message Safety Analyzer
                        </h1>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
                            Paste any SMS, WhatsApp text, or chat message to detect fraud signals.
                            The AI model score is shown with confidence, risk score, and signal tags.
                        </p>
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-white/10 bg-black/20 p-4">
                        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-white/45">
                            Message to analyze
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={8}
                            placeholder="Paste or type a message here..."
                            className="min-h-0 w-full flex-1 resize-none rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/35 focus:border-cyan-400/50 focus:bg-white/8"
                        />

                        <div className="mt-4 flex items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={handleAnalyze}
                                disabled={loading}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(34,211,238,0.35)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                <FiSearch className="text-base" />
                                {loading ? "Analyzing..." : "Analyze"}
                            </button>

                            <button
                                type="button"
                                onClick={handleClear}
                                disabled={loading}
                                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                Clear
                            </button>
                        </div>

                        {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
                    </div>
                </div>

                <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.16)] backdrop-blur-2xl">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.25em] text-white/45">AI verdict</p>
                            <h2 className="mt-2 text-xl font-bold text-white">Analysis Summary</h2>
                        </div>

                        <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${classificationMeta.badge}`}>
                            <classificationMeta.icon className="text-base" />
                            {classificationMeta.label}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                        <div className="flex items-center justify-between gap-4 text-sm text-white/70">
                            <span>Confidence</span>
                            <span className="font-semibold text-white">{animatedConfidence}%</span>
                        </div>

                        <div className="mt-2 flex items-center justify-center">
                            <div className="relative w-36 h-36">
                                <svg className="rotate-[-90deg]" viewBox="0 0 120 120">
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="50"
                                        strokeWidth="10"
                                        stroke="rgba(255,255,255,0.1)"
                                        fill="none"
                                    />
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="50"
                                        strokeWidth="10"
                                        stroke={classificationMeta.gaugeColor}
                                        strokeLinecap="round"
                                        fill="none"
                                        strokeDasharray="314"
                                        strokeDashoffset={314 - (314 * animatedConfidence) / 100}
                                        className="transition-all duration-500"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">
                                        Confidence
                                    </p>
                                    <p className="mt-1 text-3xl font-bold text-white">
                                        {animatedConfidence}%
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] uppercase tracking-[0.22em] text-white/35">
                            <span className="text-left">0</span>
                            <span className="text-center">50</span>
                            <span className="text-right">100</span>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <InfoCard label="Classification" value={result?.ml_prediction || "-"} />
                        <InfoCard label="Confidence Value" value={`${Math.round((Number(result?.confidence) || 0) * 100)}%`} />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <InfoCard label="Risk Score" value={result?.risk_score ?? "-"} />
                        <InfoCard label="Risk Level" value={result?.risk_level || "-"} />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="flex items-center justify-between gap-4">
                            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
                                Signals
                            </h3>
                            <span className="text-xs text-white/45">{result?.signals?.length || 0} detected</span>
                        </div>

                        <div className="mt-3 flex max-h-14 flex-wrap gap-2 overflow-hidden">
                            {result?.signals?.length ? (
                                result.signals.map((signal) => (
                                    <span
                                        key={signal}
                                        className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-white/80"
                                    >
                                        {signal}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-white/45">No signals yet.</span>
                            )}
                        </div>
                    </div>

                    <div className="min-h-0 flex-[1.4] rounded-2xl border border-white/10 bg-black/20 p-4">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
                            Groq Explanation
                        </h3>
                        <p className="mt-3 min-h-0 whitespace-pre-wrap text-sm leading-6 text-white/75">
                            {result?.groq || "Run an analysis to see the AI-generated explanation here."}
                        </p>
                    </div>
                </div>
            </div>

            {popup && (
                <div className="pointer-events-none fixed bottom-6 right-6 z-50">
                    <div
                        className={`max-w-xs rounded-2xl border px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl animate-fadeIn ${popup.tone === "red"
                                ? "border-red-400/30 bg-red-500/20 text-red-100"
                                : popup.tone === "yellow"
                                    ? "border-yellow-400/30 bg-yellow-500/20 text-yellow-50"
                                    : "border-emerald-400/30 bg-emerald-500/20 text-emerald-50"
                            }`}
                    >
                        <p className="text-xs uppercase tracking-[0.24em] opacity-80">Result</p>
                        <p className="mt-1 text-base font-semibold">{popup.title}</p>
                        <p className="mt-1 text-sm leading-5 opacity-90">{popup.messageText}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

function InfoCard({ label, value }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">{label}</p>
            <p className="mt-1 text-base font-semibold text-white">{value}</p>
        </div>
    );
}

export default FraudDetector