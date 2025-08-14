// components/CheatSearch.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Input from "../Input";
import { useLocale, useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import CheatsService from "@/services/Cheats";
import { getLocale } from "@/utils/getlocale";
import Image from "next/image";
import Text from "../Text";
import { useRouter } from "next/navigation";

const allCheats = [
  "Apex Wallhack",
  "Valorant Aimbot",
  "CS2 ESP",
  "Rust Silent Aim",
  "Fortnite Radar",
  "PUBG No Recoil",
  "Warzone Unlock All",
  "DayZ Script Menu",
];

export function CheatSearch() {
  const [query, setQuery] = useState();
  const [filtered, setFiltered] = useState([]);
  const t = useTranslations("Index");
  const router = useRouter();
  const locale = useLocale();
  const [isFocused, setIsFocused] = useState(false);
  const search = useMutation({
    mutationFn: CheatsService.search,
    mutationKey: ["Search"],
    onSuccess: (data) => {
      setFiltered(data.data);
    },
  });
  useEffect(() => {
    if (query) {
      search.mutate(query);
    }
    if (query === "") {
      setFiltered([]);
    }
  }, [query]);

  const handleOpenCheat = (cheat) => {
    router.push(`/${locale}/catalog/${cheat.catalog.link}/${cheat.link}`);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Input
        iconLeft="searchNew"
        placeholder={t("findCheat")}
        value={query}
        styleDiv={{
          borderRadius:
            query && isFocused && filtered.length
              ? "16px 16px 0px 0px"
              : "16px",
        }}
        setValue={(e) => setQuery(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)} // задержка, чтобы можно было кликнуть по элементу
      />

      <AnimatePresence>
        {query && isFocused && filtered.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full  bg-input search-scroll rounded-b-xl shadow-lg max-h-60 overflow-y-auto"
          >
            {filtered.map((cheat) => (
              <li
                key={cheat.id}
                className="px-4 py-2 cursor-pointer hover:bg-primary10 hover:bg-opacity-10 transition-colors"
                onMouseDown={() => handleOpenCheat(cheat)} // чтобы не терял фокус
              >
                {/* {cheat[`title${getLocale() === "ru" ? "Ru" : "En"}`]} */}
                <div className="flex items-center gap-2">
                  <Image
                    src={cheat.image1}
                    objectFit="contain"
                    width={30}
                    height={30}
                  />
                  <div className="flex flex-col gap-2">
                    <Text
                      T="none"
                      weight="medium"
                      size="md"
                      className="text-primary10"
                    >
                      {cheat[`title${getLocale() === "ru" ? "Ru" : "En"}`]}
                    </Text>
                    <Text
                      T="none"
                      weight="normal"
                      size="sm"
                      className="text-linkColor"
                    >
                      {cheat[
                        `about${getLocale() === "ru" ? "Ru" : "En"}`
                      ].slice(0, 20)}
                      {cheat[`about${getLocale() === "ru" ? "Ru" : "En"}`]
                        .length > 20
                        ? "..."
                        : ""}
                    </Text>
                  </div>
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
