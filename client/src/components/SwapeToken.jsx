import React, { useMemo, useState, useEffect, useRef } from "react";
import "./SwapCard.css";
import { ethers } from "ethers";
import tokenCreation from "../contractsData/tokenCreation.json";
import TOKEN_LIST from "../constants/tokenList";
import { AddToken } from "./AddToken";
import { BuyToken } from "./BuyToken";
import { Staking } from "./Staking";

function formatNumber(n) {
  if (n === "" || n == null) return "—";
  const num = Number(n);
  if (Number.isNaN(num)) return "—";
  if (Math.abs(num) >= 1000)
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  return num.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

export default function SwapeToken({ dex, account }) {
  const [active, setActive] = useState("swap");
  const [fromToken, setFromToken] = useState(TOKEN_LIST[0]);
  const [toToken, setToToken] = useState(TOKEN_LIST[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [showSelector, setShowSelector] = useState({
    open: false,
    side: "from",
  });
  const [query, setQuery] = useState("");
  const [connected, setConnected] = useState(false);
  const [slippage, setSlippage] = useState(0.5);
  const modalRef = useRef(null);

  const tabs = [
    { label: "Swap", value: "swap" },
    { label: "Add Token", value: "add" },
    { label: "Buy Token", value: "buy" },
    { label: "Staking", value: "stake" },
  ];

  const rate = useMemo(() => {
    const base =
      (fromToken.symbol.charCodeAt(0) + toToken.symbol.charCodeAt(0)) % 100;
    const r =
      (base / 100) * (fromToken.symbol === "ETH" ? 2000 : 1) +
      (toToken.symbol === "USDC" || toToken.symbol === "USDT" ? 1 : 0.01);
    if (fromToken.symbol === toToken.symbol) return 1;
    if (fromToken.symbol === "ETH" && toToken.symbol === "USDC") return 1850;
    if (fromToken.symbol === "WBTC" && toToken.symbol === "USDC") return 40000;
    if (toToken.symbol === "ETH") return 1 / 1850;
    return Math.max(0.0001, Math.round(r * 100) / 100);
  }, [fromToken, toToken]);

  useEffect(() => {
    if (fromAmount === "" || isNaN(Number(fromAmount))) {
      setToAmount("");
      return;
    }
    const f = Number(fromAmount);
    const estimated = f * rate;
    setToAmount(estimated.toFixed(6).replace(/\.?0+$/, ""));
  }, [fromAmount, rate]);

  function handleMax() {
    const balances = {
      ETH: 1.234,
      USDC: 1234,
      USDT: 900,
      DAI: 400,
      SUSHI: 100,
      WBTC: 0.05,
    };
    const b = balances[fromToken.symbol] ?? 0;
    setFromAmount(String(b));
  }

  function swapTokensUI() {
    const prevFrom = fromToken;
    const prevTo = toToken;
    setFromToken(prevTo);
    setToToken(prevFrom);
    setFromAmount(toAmount ? String(Number(toAmount) / rate) : "");
    setToAmount("");
  }

  function openSelector(side) {
    setQuery("");
    setShowSelector({ open: true, side });
  }

  function closeSelector() {
    setShowSelector({ open: false, side: "from" });
  }

  function selectToken(token) {
    if (showSelector.side === "from") {
      if (token.symbol === toToken.symbol) {
        setFromToken(toToken);
        setToToken(token);
      } else {
        setFromToken(token);
      }
    } else {
      if (token.symbol === fromToken.symbol) {
        setToToken(fromToken);
        setFromToken(token);
      } else {
        setToToken(token);
      }
    }
    closeSelector();
  }

  useEffect(() => {
    function handler(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeSelector();
      }
    }
    if (showSelector.open) {
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }
  }, [showSelector.open]);

  const filtered = TOKEN_LIST.filter((t) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      t.symbol.toLowerCase().includes(q) || t.name.toLowerCase().includes(q)
    );
  });

  function connectWallet() {
    setConnected(true);
  }

  // Actual swap logic from your original code
  const swapeTokens = async () => {
    try {
      if (!fromToken || !fromAmount) {
        alert("Please enter token and amount");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const Tokens = new ethers.Contract(
        fromToken.address || fromToken.contractAddress || "", // you must ensure address is in TOKEN_LIST
        tokenCreation.abi,
        signer
      );

      const parsedAmount = ethers.utils.parseUnits(
        fromAmount,
        fromToken.decimals
      );
      await Tokens.approve(dex.address, parsedAmount);
      await dex.swapeToken(fromToken.symbol, fromToken.address, parsedAmount);

      setFromAmount("");
      setToAmount("");
      alert("Congratulations! You swapped the tokens.");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Swap failed. Check console for details.");
    }
  };

    useEffect(() => {
    document.title = "Swap Token | Multidex";
  }, []);



  return (
    <div className="swap-container">
      <div className="swap-wrapper">
        <div className="swap-nav">
          <div className="swap-nav-left">
            {tabs.map((tab) => (
              <div
                key={tab.value}
                className={`swap-pill ${active === tab.value ? "active" : ""}`}
                onClick={() => setActive(tab.value)}
                style={{ cursor: "pointer" }}
              >
                <li className="Link">{tab.label}</li>
              </div>
            ))}
          </div>
        </div>

        <div className="container main-box">
          {active === "add" && <AddToken />}
          {active === "buy" && <BuyToken />}
          {active === "stake" && <Staking />}
          {active === "swap" && (
            <>
              <div className="m-2">
                <div className="card-section">
                  <div className="label-row">
                    <span className="label">Sell</span>
                    <div className="balance">
                      $
                      {fromAmount
                        ? formatNumber(Number(fromAmount) * rate)
                        : "0.00"}
                    </div>
                  </div>

                  <div className="input-row">
                    <input
                      className="amount-input"
                      placeholder="0.0"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      inputMode="decimal"
                    />
                    <button
                      className="token-btn"
                      onClick={() => openSelector("from")}
                    >
                      <img
                        className="token-img"
                        src={fromToken.logo}
                        alt={fromToken.symbol}
                      />
                      <span className="token-symbol">{fromToken.symbol}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        width="16"
                        height="16"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div className="meta-row">
                    <button className="balance-btn" onClick={handleMax}>
                      Max
                    </button>
                    <div className="price-preview">
                      Est: {toAmount ? formatNumber(toAmount) : "—"}
                    </div>
                  </div>
                </div>

                <div className="swap-toggle">
                  <button
                    className="swap-circle"
                    onClick={swapTokensUI}
                    title="Switch tokens"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div className="card-section">
                  <div className="label-row">
                    <span className="label">Buy</span>
                    <div className="balance">
                      $ {toAmount ? formatNumber(Number(toAmount)) : "0.00"}
                    </div>
                  </div>

                  <div className="input-row">
                    <input
                      className="amount-input"
                      placeholder="0.0"
                      value={toAmount}
                      readOnly
                    />
                    <button
                      className="token-btn"
                      onClick={() => openSelector("to")}
                    >
                      <img
                        className="token-img"
                        src={toToken.logo}
                        alt={toToken.symbol}
                      />
                      <span className="token-symbol">{toToken.symbol}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        width="16"
                        height="16"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div className="meta-row">
                    <div className="price-row">
                      <div className="price-left">Price</div>
                      <div className="price-right">
                        1 {fromToken.symbol} ≈ {formatNumber(rate)}{" "}
                        {toToken.symbol}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`info-block-wrapper ${fromAmount ? "show" : ""}`}
                >
                  <div className="info-block">
                    <div className="info-row">
                      <div>Price impact</div>
                      <div className="muted">0.05%</div>
                    </div>
                    <div className="info-row">
                      <div>Max. received</div>
                      <div className="muted">
                        {toAmount ? formatNumber(Number(toAmount)) : "—"}
                      </div>
                    </div>
                    <div className="info-row">
                      <div>Min. received</div>
                      <div className="muted">
                        {toAmount
                          ? (Number(toAmount) * (1 - slippage / 100)).toFixed(6)
                          : "—"}
                      </div>
                    </div>
                    <div className="info-row">
                      <div>Fee (0.25%)</div>
                      <div className="muted">
                        {toAmount
                          ? (Number(toAmount) * 0.0025).toFixed(6)
                          : "—"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="actions">
                  {!connected ? (
                    <button className="c-btn" onClick={connectWallet}>
                      Connect Wallet
                    </button>
                  ) : (
                    <button className="c-btn" onClick={swapeTokens}>
                      Swap
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {showSelector.open && (
          <div className="token-modal-backdrop">
            <div className="token-modal" ref={modalRef}>
              <div className="modal-header">
                <input
                  className="modal-search"
                  placeholder="Search name or paste address"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="token-list">
                {filtered.map((t) => (
                  <button
                    key={t.symbol}
                    className="token-row"
                    onClick={() => selectToken(t)}
                  >
                    <img
                      className="token-row-img"
                      src={t.logo}
                      alt={t.symbol}
                    />
                    <div className="token-row-meta">
                      <div className="token-row-name">{t.symbol}</div>
                      <div className="token-row-sub">{t.name}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="modal-footer">
                <div className="small-muted">Tokens show</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
