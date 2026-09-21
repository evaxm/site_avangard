"use client";

import { FormEvent, useState } from "react";
import PhoneInput from "./PhoneInput";

type SubmitState = "idle" | "sending" | "success" | "error";

const fallbackError = "Не удалось отправить заявку. Позвоните нам или попробуйте ещё раз.";

export default function ProposalForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    setSubmitState("sending");
    setSubmitMessage("");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);

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
        signal: controller.signal,
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        const message =
          response.status === 422
            ? "Проверьте заполнение формы."
            : typeof result?.message === "string" && result.message.length <= 160
              ? result.message
              : fallbackError;
        throw new Error(message);
      }

      form.reset();
      setSubmitMessage("Заявка отправлена. Мы свяжемся с вами.");
      setSubmitState("success");
    } catch (error) {
      const message =
        error instanceof DOMException && error.name === "AbortError"
          ? "Сервер отвечает слишком долго. Попробуйте отправить заявку ещё раз."
          : error instanceof Error && error.message
            ? error.message
            : fallbackError;
      setSubmitMessage(message);
      setSubmitState("error");
    } finally {
      window.clearTimeout(timeout);
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
        <p className="form-message success" role="status" aria-live="polite">
          {submitMessage}
        </p>
      )}
      {submitState === "error" && (
        <p className="form-message error" role="alert" aria-live="assertive">
          {submitMessage}
        </p>
      )}
    </form>
  );
}
