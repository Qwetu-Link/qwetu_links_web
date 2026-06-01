"use client";

import { useRef } from "react";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function OtpInput({ value, onChange, disabled }: OtpInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const emitValue = () => {
    onChange(refs.current.map((input) => input?.value ?? "").join(""));
  };

  const updateDigit = (index: number, input: HTMLInputElement) => {
    const character = input.value.replace(/[^a-zA-Z0-9]/g, "").slice(-1);
    input.value = character;
    emitValue();

    if (character && index < 5) {
      refs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="grid grid-cols-6 gap-2 sm:gap-3">
      {Array.from({ length: 6 }, (_, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          defaultValue={value[index] ?? ""}
          inputMode="text"
          pattern="[a-zA-Z0-9]*"
          maxLength={1}
          disabled={disabled}
          aria-label={`OTP digit ${index + 1}`}
          onInput={(event) => updateDigit(index, event.currentTarget)}
          onKeyDown={(event) => {
            if (
              event.key === "Backspace" &&
              !event.currentTarget.value &&
              index > 0
            ) {
              refs.current[index - 1]?.focus();
            }
          }}
          onPaste={(event) => {
            event.preventDefault();
            const pasted = event.clipboardData
              .getData("text")
              .replace(/[^a-zA-Z0-9]/g, "")
              .slice(0, 6);
            refs.current.forEach((input, digitIndex) => {
              if (input) {
                input.value = pasted[digitIndex] ?? "";
              }
            });
            emitValue();
            refs.current[Math.min(pasted.length, 5)]?.focus();
          }}
          className="h-12 rounded-md border border-rental-border bg-white text-center text-lg font-bold text-brand-dark outline-none transition focus:border-rental-primary focus:ring-2 focus:ring-rental-primary/15 disabled:opacity-60 sm:h-14"
        />
      ))}
    </div>
  );
}
