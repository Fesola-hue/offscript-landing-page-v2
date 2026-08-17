import { createFileRoute, redirect } from '@tanstack/react-router'
import { CURRENT_ISSUE } from "../data/issues";

// theoffscript.page/latest always points at whatever issue is on top of
// ISSUES in ../data/issues.ts — nothing to update here, ever.
//
// This now forwards to the in-app /issue/$number reader instead of
// bouncing straight to the MailerLite preview link, so the issue opens
// inline (same tab, same header) instead of in a brand-new tab.
export const Route = createFileRoute('/latest')({
  beforeLoad: () => {
    throw redirect({ to: "/issue/$number", params: { number: CURRENT_ISSUE.number } });
  },
  component: () => null,
});
