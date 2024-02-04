import Link from "next/link";

export default function Home() {
  return (
      <div className=" grid text-center p-10">
        <Link href="/quiz">
        <div
          className="cursor-pointer group border border-transparent px-5 py-4 transition-colors "
          rel="noopener noreferrer"
        >
          <h2 className={`cursor-pointer rounded-lg mb-3 text-2xl font-semibold hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 px-3 py-3`}>
            Start Quiz{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Explore the World of Questions!. Hit "Start Quiz"
          </p>
        </div>
        </Link>

              </div>

  );
}
