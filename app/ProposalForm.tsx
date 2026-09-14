"use client";

import { FormEvent, useState } from "react";
import PhoneInput from "./PhoneInput";

type SubmitState = "idle" | "sending" | "success" | "error";

export default function ProposalForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    setSubmitState("sending");

    try {
      const response = await fetch("/api/inquiry.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("Имя"),
          phone: formData.get("Телефон"),
          email: formData.get("Почта"),
          city: formData.get("Город"),
          consent: formData.has("Согласие на обработку персональных данных"),
          website: formData.get("website"),
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        throw new Error("Telegram delivery failed");
      }

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <form
      className="proposal-form"
      action="/api/inquiry.php"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="form-field">
        <span>Имя</span>
        <input type="text" name="Имя" autoComplete="name" placeholder="Как к вам обращаться" maxLength={100} required />
      </label>
      <label className="form-field">
        <span>Телефон</span>
        <PhoneInput />
      </label>
      <label className="form-field">
        <span>Почта</span>
        <input type="email" name="Почта" autoComplete="email" placeholder="name@company.ru" maxLength={160} required />
      </label>
      <label className="form-field">
        <span>Город</span>
        <input type="text" name="Город" autoComplete="address-level2" placeholder="Город размещения объекта" maxLength={120} required />
      </label>
      <label className="form-honeypot" aria-hidden="true">
        Не заполняйте это поле
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="privacy-consent">
        <input type="checkbox" name="Согласие на обработку персональных данных" required />
        <span>
          Я ознакомлен(а) с{" "}
          <a href="/policy">Политикой обработки персональных данных</a>{" "}
          и даю согласие на обработку моих персональных данных в целях обработки обращения и предоставления ответа на запрос.
        </span>
      </label>
      <button type="submit" disabled={submitState === "sending"}>
        {submitState === "sending" ? "Отправляем…" : "Получить КП"}
        <span aria-hidden="true">→</span>
      </button>
      {submitState === "success" && (
        <p className="form-message success" role="status">
          Заявка отправлена. Мы свяжемся с вами.
        </p>
      )}
      {submitState === "error" && (
        <p className="form-message error" role="alert">
          Не удалось отправить заявку. Позвоните нам или попробуйте ещё раз.
        </p>
      )}
    </form>
  );
}
