export default function Navbar({ title, searchPlaceholder }) {
  return (
        <nav className="w-full gap-5 py-2 drop-shadow-lg bg-white rounded-bl-2xl border-b-4 border-b-primary flex justify-between items-center px-[5%] ">
            <h1 className="font-semibold text-base md:text-2xl h-14 flex items-center">{title}</h1>

            {/* Search Bar */}

            {/* Empty div to position search bar center */}
            <div></div>
        </nav>
  )
}
