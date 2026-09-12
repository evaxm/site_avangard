"use client";

function formatRussianPhone(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (!digits.startsWith("7")) digits = "7" + digits;
  digits = digits.slice(0, 11);

  const local = digits.slice(1);
  if (!local) return "";

  let formatted = "+7 (" + local.slice(0, 3);
  if (local.length >= 3) formatted += ")";
  if (local.length > 3) formatted += " " + local.slice(3, 6);
  if (local.length > 6) formatted += "-" + local.slice(6, 8);
  if (local.length > 8) formatted += "-" + local.slice(8, 10);
  return formatted;
}

export default function PhoneInput() {
  return (
    <input
      className="phone-input"
      type="tel"
      name="Телефон"
      autoComplete="tel"
      inputMode="numeric"
      placeholder="+7 (___) ___-__-__"
      pattern="\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}"
      title="Введите номер из 11 цифр"
      maxLength={18}
      onInput={(event) => {
        event.currentTarget.value = formatRussianPhone(event.currentTarget.value);
      }}
      required
    />
  );
}
