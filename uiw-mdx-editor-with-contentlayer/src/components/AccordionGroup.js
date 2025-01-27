const Group = (props) => {
  const { children } = props;
  return (
    <div className="hs-accordion-group border-gray-200 rounded-lg">
      {children}
    </div>
  );
}


const Item = (props) => {
  const { title, children } = props;

  return (
    <div className="hs-accordion">
      <button className="hs-accordion-toggle hs-accordion-active:bg-gray hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400">
        <svg
          className="hs-accordion-active:hidden block w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        <svg
          className="hs-accordion-active:block hidden w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
        </svg>
        {title}
      </button>
      <div className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300">
        {children}
      </div>
    </div>
  );
}

export default { Group, Item };