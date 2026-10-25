"use client";

import Link from "next/link";
import { useState } from "react";

export function SuburbChecker() {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (value.trim()) setChecked(true); }} className="mt-2 flex flex-col gap-3">
      <label className="label">Check your suburb
        <span className="flex gap-2.5">
          <input type="text" value={value} onChange={(e) => { setValue(e.target.value); setChecked(false); }} placeholder="Suburb or postcode" className="field normal-case tracking-normal" />
          <button type="submit" className="btn btn-primary h-13 shrink-0 px-6">Check</button>
        </span>
      </label>
      {checked && (
        <p role="status" className="border border-[#c9d3c3] bg-sage-soft px-4 py-3 text-[15px] leading-relaxed">
          We can usually deliver to <strong className="font-medium">{value.trim()}</strong>. Add your venue address to your <Link href="/quote/" className="underline">quote request</Link> and we&apos;ll confirm delivery and setup pricing.
        </p>
      )}
    </form>
  );
}
