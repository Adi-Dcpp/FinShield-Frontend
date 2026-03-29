const PhoneUI = () => {

  const data = {
    amount: 180000,
    merchant: "Crypto Wallet Transfer",
    city: "London",
    deviceId: "dev-new-1774817444741"
  };

  return (
    <div className="relative isolate h-205 w-100 max-w-[94vw] lg:max-w-none">
      <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[60px] bg-linear-to-b from-cyan-400/25 via-indigo-400/20 to-purple-500/24 blur-3xl" />

      <div className="relative h-full rounded-[56px] border border-white/35 bg-linear-to-b from-white/22 via-white/9 to-transparent p-3 shadow-[0_28px_80px_rgba(5,2,30,0.70)] backdrop-blur-xl">
        <span className="absolute -left-0.75 top-40 h-16 w-0.75 rounded-l-full bg-white/45" />
        <span className="absolute -left-0.75 top-58 h-24 w-0.75 rounded-l-full bg-white/30" />
        <span className="absolute -right-0.75 top-48 h-28 w-0.75 rounded-r-full bg-white/40" />

        <div className="relative h-full overflow-hidden rounded-[48px] border border-white/18 bg-linear-to-b from-indigo-950/42 via-slate-950/24 to-purple-950/30 backdrop-blur-2xl">
          <div className="absolute left-1/2 top-2.5 z-20 h-8 w-40 -translate-x-1/2 rounded-full border border-white/20 bg-black/45 backdrop-blur-md">
            <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-800 ring-1 ring-white/30" />
          </div>

          <div className="absolute bottom-2 left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full bg-white/45" />

          <div className="absolute inset-0 z-0 bg-[radial-gradient(560px_340px_at_16%_14%,rgba(56,189,248,0.22),transparent_68%),radial-gradient(560px_400px_at_88%_20%,rgba(168,85,247,0.25),transparent_70%),radial-gradient(450px_300px_at_50%_78%,rgba(99,102,241,0.22),transparent_75%)]" />
          <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-white/8 via-transparent to-white/4" />

          <div className="relative z-10 flex h-full flex-col justify-between px-7 pb-8 pt-16 text-white">
            <div>
              <div className="mb-5 flex items-center justify-between text-[0.78rem] text-white/70">
                <span>09:41</span>
                <span>Secure LTE</span>
              </div>

              <div className="rounded-3xl border border-white/16 bg-white/8 p-6 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/90">Payment Alert</p>
                <h2 className="mt-2 text-[1.7rem] font-semibold tracking-tight text-white">{data.merchant}</h2>
                <p className="mt-1 text-sm text-white/70">{data.merchant}</p>

                <div className="mt-5 rounded-2xl border border-white/14 bg-black/28 px-5 py-5 text-center">
                  <p className="text-xs text-white/55">Amount</p>
                  <p className="mt-1 text-[2.5rem] font-semibold leading-none text-white">INR {data.amount.toLocaleString()}</p>
                  <p className="mt-2 text-xs text-cyan-100/80">Live fraud scan in progress</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/14 bg-white/7 p-5 text-sm backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Merchant</span>
                  <span className="max-w-48 truncate text-right text-white">{data.merchant}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-white/60">Location</span>
                  <span className="text-white">{data.city}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-white/60">Device</span>
                  <span className="max-w-48 truncate text-right text-white">{data.deviceId}</span>
                </div>
              </div>

              <button className="w-full rounded-2xl border border-cyan-200/45 bg-linear-to-r from-cyan-500/80 via-blue-500/75 to-purple-500/75 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_0_34px_rgba(125,211,252,0.38)] transition hover:brightness-110">
                Processing Transaction...
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneUI;