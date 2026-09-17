import { useId } from 'react';

/**
 * Form controls are drawn as ruled lines rather than boxes — the same
 * hairline language the rest of the site uses. The rule turns gold on focus,
 * which is also the focus colour everywhere else.
 */

const CONTROL =
  'w-full bg-transparent border-0 border-b py-3 text-base text-ink placeholder:text-slate/40 ' +
  'focus:outline-none focus:ring-0 transition-colors duration-200';

function ruleClass(invalid) {
  return invalid
    ? 'border-b-[#9e2f2f] focus:border-b-[#9e2f2f]'
    : 'border-b-ink/25 focus:border-b-gold';
}

export function Label({ htmlFor, children, optional = false }) {
  return (
    <label htmlFor={htmlFor} className="eyebrow block text-deep">
      {children}
      {optional && <span className="ml-2 normal-case tracking-normal text-slate">optional</span>}
    </label>
  );
}

export function Field({ label, hint, error, optional = false, as = 'input', ...props }) {
  const autoId = useId();
  const id = props.id ?? autoId;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ');
  const Control = as === 'textarea' ? 'textarea' : 'input';

  return (
    <div>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <Control
        {...props}
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy || undefined}
        className={`${CONTROL} ${ruleClass(Boolean(error))} ${
          as === 'textarea' ? 'mt-1 resize-y' : 'mt-1'
        }`}
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-slate">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs font-medium text-[#9e2f2f]">
          {error}
        </p>
      )}
    </div>
  );
}

export function Check({ label, id, ...props }) {
  const autoId = useId();
  const checkId = id ?? autoId;
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        id={checkId}
        {...props}
        className="mt-1 h-[18px] w-[18px] shrink-0 accent-[#0b3d5a]"
      />
      <label htmlFor={checkId} className="text-sm leading-relaxed text-slate">
        {label}
      </label>
    </div>
  );
}

/** Error and success notices share one shape so the form never shifts layout. */
export function Notice({ tone = 'error', children }) {
  const styles =
    tone === 'error'
      ? 'border-[#9e2f2f]/40 bg-[#9e2f2f]/5 text-[#7d2525]'
      : 'border-teal/40 bg-teal/5 text-deep';
  return (
    <p role={tone === 'error' ? 'alert' : 'status'} className={`border-l-2 ${styles} px-5 py-4 text-sm leading-relaxed`}>
      {children}
    </p>
  );
}
