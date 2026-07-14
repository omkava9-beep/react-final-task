// itemCount is a plain prop for now (hardcoded from the page in Phase 1).
// From Phase 3 onward this should read the count from CartContext/Redux instead of being passed in.
export default function CartIcon({ itemCount = 0 }) {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.693 2.615-7.151.083-.331-.032-.658-.257-.903a1.125 1.125 0 00-.848-.396H5.106M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm14.25 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white">
          {itemCount}
        </span>
      )}
    </div>
  );
}
