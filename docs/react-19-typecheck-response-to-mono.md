# React 19 typecheck – Gamut response to Mono (portal-app)

**Purpose:** Status of Gamut changes from Mono’s React 19 typecheck feedback and what Mono should do on their side.

**Your last test:** 2025-02-09, `@codecademy/gamut-kit` **0.6.581-alpha.9fa994.0** (and synced gamut packages at `*-alpha.9fa994.0`). That alpha introduced **35 additional errors** (~86 → ~121); we’ve fixed the regression (see below).

---

## Regression fix (alpha.9fa994.0 → next alpha)

Alpha **9fa994.0** added ~35 errors because the ref type was **intersected** with the styled component’s existing ref (`ComponentProps<typeof StyledBox>` etc.), which can be non-null and narrowed the type so `RefObject<El | null>` was no longer assignable.

**Fix in Gamut:** We now **omit `ref`** before adding `RefAttributes<El | null>` everywhere:

- **Box / FlexBox / GridBox** – default overload uses `Omit<ComponentProps<typeof StyledBox>, 'ref'> & RefAttributes<HTMLDivElement | null>` (and same for FlexBox/GridBox).
- **Form / Input / TextArea** – export cast uses `Omit<FormProps, 'ref'> & RefAttributes<...>` (and same for InputWrapperProps / TextAreaProps).

The next alpha after 9fa994.0 will include this; you should see the regression disappear and ref nullability work as intended.

---

## What’s in Gamut (main) – next alpha after 9fa994.0

These are implemented in Gamut and will ship in the next alpha you pick up.

### 1. Box / FlexBox / GridBox – intrinsic props when `as="img"` / `as="form"` / `as="input"` (~55 errors)

- **Done in Gamut.** Polymorphic call signatures so intrinsic `as` gets the right HTML props:
  - `as="img"` → `src`, `alt`, `loading`, etc.
  - `as="form"` → `action`, `method`, etc.
  - `as="input"` → `name`, `type`, etc.
- **Files:** `Box/Box.tsx`, `Box/FlexBox.tsx`, `Box/GridBox.tsx`.

### 2. Ref nullability – accept `RefObject<T | null>` (~25 errors)

- **Done in Gamut** for the components you listed:
  - **Box / FlexBox / GridBox** – ref in polymorphic typings is `RefAttributes<... | null>`.
  - **Form** – `RefAttributes<HTMLFormElement | null>` (and ConnectedForm overload).
  - **ButtonBase** – `RefAttributes<ButtonBaseElements | null>`.
  - **Anchor** – `RefAttributes<HTMLAnchorElement | HTMLButtonElement | null>`.
  - **Card** – `forwardRef<HTMLDivElement | null, CardProps>`.
  - **TextArea** – export cast to `RefAttributes<HTMLTextAreaElement | null>`.
  - **Input** – export cast to `RefAttributes<HTMLInputElement | null>`.

### 3. Anchor / Button polymorphic ref – union, not intersection (3 errors)

- **Done in Gamut.** You confirmed this is fixed at alpha.26b7a6.0 (VideoDescription, AppHeaderLink, AppHeaderNavButton). Ref is a union so you can pass either anchor or button ref.

---

## What we’re not changing in Gamut

### 4. Styled Input – CardDetails assignability (2 errors)

- **No Gamut change.** We are not adding a `style` prop to `StyledInputProps`. Fix on your side: type your styled Input wrapper with the component’s actual inferred type (or a cast), not `StyledComponent<StyledInputProps, any, {}>`.

### 5. useRef / overload – nullable refs (3 errors)

- **5a. DropdownList ref array** – Not in Gamut. Widen the ref-array type in the hook/component that consumes it (Mono or the package that defines it) to accept `RefObject<HTMLAnchorElement | null>[]`.
- **5b. NotificationsDropdown / useHeaderNotifications** – ButtonBase already accepts `RefObject<ButtonBaseElements | null>`. If the dropdown/hook prop type is still non-null, that type likely lives in **gamut-kit**; we can widen it there. Otherwise widen it in Mono.

### 6. CourseCardProps – `isProUser` (1 error)

- **No Gamut change.** `CourseCard` / `CourseCardProps` are not in the Gamut repo. Add `isProUser` to the component’s props in the package that defines it, or stop passing it.

---

## What you should do in Mono

1. **Bump** to the next Gamut alpha that includes the commits for items 1 and 2 (and TextArea/Input ref casts) once it’s published.
2. **Re-run** portal-app typecheck:  
   `yarn exec tsc --noEmit -p apps/portal-app`
3. **CardDetails (item 4):** Type your styled Input wrapper using the actual styled component type or a cast; don’t rely on `StyledInputProps` + `style`.
4. **DropdownList (5a) / NotificationsDropdown (5b):** Widen ref types to `RefObject<... | null>` (and nullable ref arrays) in the defining package (Mono or gamut-kit).
5. **CourseCard (item 6):** Add `isProUser` to the defining component’s props type, or stop passing it.

If anything still fails after bumping to the next alpha, share the exact error and file/line and we can adjust.
