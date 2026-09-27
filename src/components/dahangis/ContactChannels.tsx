/** Public business contact information, configured by the site owner; never guessed. */
export default function ContactChannels() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim();
  const safeEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
  const safePhone = phone && /^[+\d\s().-]{7,40}$/.test(phone) ? phone : '';
  if (!safeEmail && !safePhone) return null;
  return <div className="dg-contact-channels" aria-label="다른 연락 방법">
    {safeEmail ? <a href={`mailto:${safeEmail}`}>{safeEmail}</a> : null}
    {safePhone ? <a href={`tel:${safePhone.replace(/[^+\d]/g, '')}`}>{safePhone}</a> : null}
  </div>;
}
