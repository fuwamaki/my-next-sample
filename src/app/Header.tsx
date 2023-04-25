import Link from "next/link";
import { Suspense } from "react";
import "server-only";
import { prisma } from "../globals/db";
import { zVersion } from "./type";

const Header: React.FC = () => {
  const title = "ノートApp";

  return (
    <div className="bg-white lg:pb-6">
      <div className="max-w-screen-2xl px-2 md:px-4 mx-auto">
        <header className="flex justify-between items-center py-4">
          <Link
            href="/"
            className="inline-flex items-center text-black-800 text-xl font-bold gap-2.5"
            aria-label="logo"
          >
            {title}
          </Link>
          {/* 画面幅が768px未満の場合は非表示 */}
          <nav className="hidden md:flex gap-12">
            <Link
              href="/notes"
              className="text-gray-600 hover:text-pink-500 active:text-pink-700 text-lg font-semibold transition duration-100"
            >
              Memo
            </Link>
            <Link
              href="/help/faq"
              className="text-gray-600 hover:text-pink-500 active:text-pink-700 text-lg font-semibold transition duration-100"
            >
              FAQ
            </Link>
            <Link
              href="/settings"
              className="text-gray-600 hover:text-pink-500 active:text-pink-700 text-lg font-semibold transition duration-100"
            >
              Setting
            </Link>
          </nav>

          <div>
            <span className="inline-block focus-visible:ring ring-pink-300 text-gray-500 hover:text-pink-500 active:text-pink-600 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-2 py-3">
              <Suspense fallback={"loading..."}>
                {/* @ts-expect-error Server Component */}
                <Version />
              </Suspense>
            </span>
          </div>
        </header>
      </div>
    </div>
  );
};

// DBからデータを取得してversionを表示
const Version = async () => {
  const metadata = await prisma.metadata.findUniqueOrThrow({
    where: {
      key: "version",
    },
  });
  const version = zVersion.parse(metadata.value);
  return `v${version}`;
};

export default Header;
