export function BrickverIcon({
  className = "h-5 w-5",
  ...props
}: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="51.965"
      viewBox="0 0 64 51.965"
      width="64"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Brickver Logo</title>
      <path
        d="M32 15.994c8.115 0 14.694-2.981 14.694-6.659S40.115 2.676 32 2.676 17.306 5.658 17.306 9.335c0 3.678 6.579 6.659 14.694 6.659"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="5.224"
      />
      <path
        d="M17.306 9.335v8.324c0 3.662 6.507 6.659 14.694 6.659s14.694-2.996 14.694-6.659V9.335"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="5.224"
      />
      <path
        d="M2.612 19.324v14.983L32 49.289l29.388-14.983V19.323"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="5.224"
      />
      <path
        d="M17.306 11.832 2.612 19.323 32 34.306l29.388-14.983-14.694-7.491M32 34.306v14.983"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="5.224"
      />
    </svg>
  );
}
