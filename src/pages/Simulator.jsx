import { useState } from "react";
import PhoneUI from "../components/PhoneUI.jsx"
import TransactionForm from "../components/TransactionForm.jsx"
import ReviewPhoneUI from "../components/ReviewPhoneUI.jsx";
import ProceedPhoneUI from "../components/ProceedPhoneUI.jsx";
import DeclinePhoneUI from "../components/DeclinePhoneUI.jsx";
import RulesModal from "../components/RulesModel.jsx";

const Simulator = () => {
    const [stage, setStage] = useState("base");
    const [reviewResponse, setReviewResponse] = useState(null);
    const [showRules, setShowRules] = useState(false);

    const handleSimulate = (response) => {
        setReviewResponse(response);
        setStage("review");
    };

    const renderPhone = () => {
        if (stage === "review" && reviewResponse?.data) {
            return (
                <ReviewPhoneUI
                    reviewData={reviewResponse.data}
                    onProceed={() => setStage("proceed")}
                    onDecline={() => setStage("decline")}
                />
            );
        }

        if (stage === "proceed" && reviewResponse?.data?.meta) {
            return <ProceedPhoneUI data={reviewResponse.data.meta} />;
        }

        if (stage === "decline" && reviewResponse?.data?.meta) {
            return <DeclinePhoneUI data={reviewResponse.data.meta} />;
        }

        return <PhoneUI />;
    };

    return (
        <section className="mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8">
            <div className="flex justify-center lg:justify-start">
                {renderPhone()}
            </div>

            <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-md">
                    <TransactionForm onSimulate={handleSimulate} />
                    <button
                        onClick={() => setShowRules(true)}
                        className="w-full mt-2 text-xs text-cyan-300 hover:underline"
                    >
                        View Risk Logic
                    </button>
                </div>
            </div>

            {showRules && <RulesModal onClose={() => setShowRules(false)} />}
        </section>
    ) 
}

export default Simulator