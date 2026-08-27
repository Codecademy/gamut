---
title: Confirmation dialogs
description: Use the same verb from the triggering button through to the confirmation button, communicate consequences clearly, and keep the copy decision-focused.
---

Confirmation dialogs use [Dialog](/components/overlays/dialog/) to create intentional friction, verifying that a reader wants to take a high-impact action, such as:

- An irreversible action, like submitting payment.
- Loss of data, time, or work, like deleting a course.
- An unexpected consequence, like losing learning history on an existing prototype when generating a new one.

That friction improves trust and avoids unintentional actions, by making sure a reader understands the consequences before continuing — and gives us a place to offer alternatives or an undo option when one exists.

## Best practices

**Heading**

- Ask or inform about one main action, mirroring the button that triggered the dialog.
- Frame the heading as a binary question when possible, with two unambiguous answers.
- Avoid a generic "Are you sure?" heading or body — it adds cognitive load without adding information, and can read as patronizing.

**Body (optional)**

- Add only the essential contextual consequences: what will happen, what will be lost or changed, and any critical conditions.
- Skip the body entirely if the heading is already self-explanatory.
- Keep it to 1–2 lines, unless more is genuinely needed.

**Buttons (CTA1 and CTA2)**

- Avoid "Yes"/"No" — they can be misread in global English and internationalization contexts.
- CTA1 matches the verb from the heading, to confirm the action.
- CTA2 clarifies the alternative or undo path. Be specific about the alternative where space allows; "Cancel" is a fallback when it doesn't.

## Checklist

- Is the action irreversible, destructive, or does it have unexpected consequences? If not, consider a different pattern.
- Does the same verb carry through the triggering action, the heading, and CTA1?
- Have you avoided filler language like "Are you sure you want to...?"
- Does the body front-load the critical consequence, in 1–3 lines?
- Are the buttons mutually exclusive, and do they avoid "Yes"/"No"?
- Is there a safer alternative or undo worth offering as CTA2?
