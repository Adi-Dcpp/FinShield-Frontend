import { useState } from "react";
import PhoneUI from "../components/PhoneUI.jsx"
import TransactionForm from "../components/TransactionForm.jsx"
import ReviewPhoneUI from "../components/ReviewPhoneUI.jsx";
import ProceedPhoneUI from "../components/ProceedPhoneUI.jsx";
import DeclinePhoneUI from "../components/DeclinePhoneUI.jsx";
import RulesModal from "../components/RulesModel.jsx";
import useTransaction from "../hooks/useTransaction";

const Simulator = () => {
    const { proceed, decline } = useTransaction();
    const [stage, setStage] = useState("base");
    const [reviewResponse, setReviewResponse] = useState(null);
    const [liveTransaction, setLiveTransaction] = useState({});
    const [showRules, setShowRules] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);
    const [actionError, setActionError] = useState("");

    const handleSimulate = (response) => {
        setReviewResponse(response?.data?.data ?? null);
        setActionError("");
        setStage("review");
    };

    const buildDecisionPayload = () => {
        const reviewData = reviewResponse ?? {};
        const name = localStorage.getItem("finshield.username") || localStorage.getItem("name") || "";

        return {
            name,
            riskPoint: reviewData.riskPoint,
            riskFactors: reviewData.riskFactors ?? [],
            meta: reviewData.meta ?? {},
        };
    };

    const handleProceed = async () => {
        if (!reviewResponse) return;

        try {
            setActionLoading("proceed");
            setActionError("");
            const response = await proceed(buildDecisionPayload());
            console.log("Proceed Response:", response);
            setStage("proceed");
        } catch (error) {
            console.error("Proceed request failed:", error);
            setActionError("Unable to proceed with this transaction.");
        } finally {
            setActionLoading(null);
        }
    };

    const handleDecline = async () => {
        if (!reviewResponse) return;

        try {
            setActionLoading("decline");
            setActionError("");
            const response = await decline(buildDecisionPayload());
            console.log("Decline Response:", response);
            setStage("decline");
        } catch (error) {
            console.error("Decline request failed:", error);
            setActionError("Unable to decline this transaction.");
        } finally {
            setActionLoading(null);
        }
    };

    const renderPhone = () => {
        if (stage === "review" && reviewResponse) {
            return (
                <ReviewPhoneUI
                    reviewData={reviewResponse}
                    onProceed={handleProceed}
                    onDecline={handleDecline}
                    loadingAction={actionLoading}
                />
            );
        }

        if (stage === "proceed" && reviewResponse?.meta) {
            return <ProceedPhoneUI data={reviewResponse.meta} />;
        }

        if (stage === "decline" && reviewResponse?.meta) {
            return <DeclinePhoneUI data={reviewResponse.meta} />;
        }

        return <PhoneUI data={liveTransaction} />;
    };

    return (
        <section className="mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8">
            <div className="flex justify-center lg:justify-start">
                {renderPhone()}
            </div>

            <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-md">
                    <TransactionForm
                        onSimulate={handleSimulate}
                        onLiveChange={setLiveTransaction}
                    />
                    <button
                        onClick={() => setShowRules(true)}
                        className="w-full mt-2 text-xs text-cyan-300 hover:underline"
                    >
                        View Risk Logic
                    </button>
                    {actionError && (
                        <p className="mt-3 text-sm text-red-300">{actionError}</p>
                    )}
                </div>
            </div>

            {showRules && <RulesModal onClose={() => setShowRules(false)} />}
        </section>
    ) 
}

export default Simulator