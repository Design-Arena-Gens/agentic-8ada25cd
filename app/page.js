"use client";

import { useMemo, useState } from 'react';
import { MAJOR_ARCANA } from "../data/tarot";

const SPREADS = [
  { id: "single", name: "Single Card", cards: 1, positions: ["Insight"] },
  { id: "three", name: "Three Card", cards: 3, positions: ["Past", "Present", "Future"] },
];

function shuffle(array) {
  const deck = [...array];
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function drawCards(deck, count) {
  const randomized = shuffle(deck);
  return randomized.slice(0, count).map(card => ({
    ...card,
    reversed: Math.random() < 0.5,
  }));
}

export default function HomePage() {
  const [spreadId, setSpreadId] = useState(SPREADS[0].id);
  const [reading, setReading] = useState([]);
  const spread = useMemo(() => SPREADS.find(s => s.id === spreadId) ?? SPREADS[0], [spreadId]);

  function onDraw() {
    const cards = drawCards(MAJOR_ARCANA, spread.cards);
    setReading(cards);
  }

  function meaningText(card) {
    return card.reversed ? card.reversedMeaning : card.uprightMeaning;
  }

  return (
    <div className="page">
      <h1 className="title">Arcana ? Tarot Reader</h1>
      <p className="subtitle">Choose a spread, draw cards, and reflect.</p>

      <div className="controls">
        <label className="label" htmlFor="spread">Spread</label>
        <select
          id="spread"
          value={spreadId}
          onChange={(e) => setSpreadId(e.target.value)}
          className="select"
          aria-label="Select tarot spread"
        >
          {SPREADS.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <button className="button" onClick={onDraw}>Draw</button>
      </div>

      {reading.length > 0 && (
        <section className="reading" aria-live="polite">
          <h2 className="sectionTitle">Your Reading ? {spread.name}</h2>
          <div className={`grid grid-${reading.length}`}>
            {reading.map((card, idx) => (
              <article key={`${card.name}-${idx}`} className="card">
                <header className="cardHeader">
                  <div className="badge">{spread.positions[idx] ?? `Card ${idx + 1}`}</div>
                  <h3 className="cardTitle">
                    {card.name} {card.reversed ? <span className="reversed">(Reversed)</span> : null}
                  </h3>
                </header>
                <p className="meaning">{meaningText(card)}</p>
                <details className="details">
                  <summary>About this card</summary>
                  <p className="about">{card.summary}</p>
                </details>
              </article>
            ))}
          </div>
          <button className="secondary" onClick={onDraw}>Draw Again</button>
        </section>
      )}

      <section className="disclaimer">
        <p>
          This app offers reflective guidance. Tarot is not a substitute for professional
          advice in legal, medical, or financial matters.
        </p>
      </section>
    </div>
  );
}
