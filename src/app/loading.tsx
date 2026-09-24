/**
 * Route-level loading UI — streams in while a page's server components
 * resolve. Matches the site column (640px) so content doesn't reflow when
 * it swaps in, and uses the standard `animate-pulse` shimmer already used
 * by the contribution graph placeholder.
 *
 * Reduced-motion users still get a static block (opacity only), which is
 * acceptable for a transient state.
 */
export default function Loading() {
  return (
    <div
      className="mx-auto w-full max-w-[640px] px-5 pb-24 pt-16 sm:pt-20"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="flex animate-pulse flex-col gap-4">
        <div className="h-3 w-48 rounded-md bg-raised" />
        <div className="h-10 w-40 rounded-md bg-raised" />
        <div className="h-4 w-full max-w-[52ch] rounded-md bg-raised" />
        <div className="h-4 w-full max-w-[60ch] rounded-md bg-raised" />
        <div className="mt-4 flex gap-2">
          <div className="size-8 rounded-md bg-raised" />
          <div className="size-8 rounded-md bg-raised" />
          <div className="size-8 rounded-md bg-raised" />
        </div>
      </div>
    </div>
  );
}
