'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check as CheckIcon } from 'lucide-react';

import Seam from '@/components/Seam';
import { Button, TextLink } from '@/components/ui';
import { Field, Check, Notice } from '@/components/Field';
import { PROFILE } from '@/data/site';

const EMPTY = {
  name: '',
  email: '',
  organisation: '',
  role: '',
  message: '',
  privacyAcknowledged: false,
};

export default function ContactForm() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const set = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));

  const errors = {
    name: form.name.trim() ? '' : 'Enter your name.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
      ? ''
      : 'Enter a valid email address.',
    message: form.message.trim() ? '' : 'Tell Doris what you would like to discuss.',
    privacyAcknowledged: form.privacyAcknowledged ? '' : 'Please acknowledge the privacy notice.',
  };
  const valid = Object.values(errors).every((v) => !v);

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!valid || status === 'sending') return;

    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setStatus('sent');
    } catch {
      setStatus('idle');
      setError(
        `That message did not send. Email ${PROFILE.email} directly and it will reach Doris.`,
      );
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'sent' ? (
        <motion.div
          key="sent"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex h-12 w-12 items-center justify-center border border-gold">
            <CheckIcon size={22} strokeWidth={1.25} className="text-gold" />
          </div>
          <h2 className="mt-7 font-display text-head font-normal text-deep">
            Your message has been sent.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-slate">
            Doris will reply directly to {form.email}. If the matter is time-bound, say so in
            a follow-up and it will be prioritised.
          </p>
          <Seam integrated tone="brass" height={2} className="mt-10 max-w-xs" />
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          exit={reduce ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="space-y-9"
        >
          <Field
            label="Name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={set('name')}
            error={touched ? errors.name : ''}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={set('email')}
            error={touched ? errors.email : ''}
          />
          <div className="grid gap-9 sm:grid-cols-2">
            <Field
              label="Organisation"
              name="organisation"
              autoComplete="organization"
              optional
              value={form.organisation}
              onChange={set('organisation')}
            />
            <Field
              label="Role"
              name="role"
              autoComplete="organization-title"
              optional
              value={form.role}
              onChange={set('role')}
            />
          </div>
          <Field
            as="textarea"
            rows={5}
            label="What would you like to discuss?"
            name="message"
            value={form.message}
            onChange={set('message')}
            error={touched ? errors.message : ''}
            hint="Country or region, the function in question, and where you think it is stuck are the most useful things to include."
          />

          <Check
            checked={form.privacyAcknowledged}
            onChange={set('privacyAcknowledged')}
            label={
              <>
                I have read the <TextLink href="/privacy">privacy notice</TextLink> and agree
                to my details being used to respond to this enquiry.
              </>
            }
          />
          {touched && errors.privacyAcknowledged && (
            <p className="text-xs font-medium text-[#9e2f2f]">{errors.privacyAcknowledged}</p>
          )}

          {error && <Notice>{error}</Notice>}

          <Button
            type="submit"
            variant="deep"
            disabled={status === 'sending'}
            arrow={status !== 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
