import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import Tasks from "./components/Tasks";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { getGuilds } from "./modules/Notion.mjs";
import { isOwner } from "./modules/Chain.mjs";

const defaultSortOptions = [
  { name: "Newest", href: "#", current: true },
  { name: "Oldest", href: "#", current: false },
  { name: "Most Popular", href: "#", current: false },
];

const defaultFilters = [
  {
    id: "Guild",
    name: "Guild",
    options: [
      {
        value: "0x1",
        label: "AI+Crypt Hackathon",
        icon: "",
        checked: true,
      },
      { value: "0x2", label: "UnyteDAO", checked: true },
    ],
  },
  {
    id: "Channel",
    name: "Channel",
    options: [],
  },
  {
    id: "Type",
    name: "Type",
    options: [
      { value: "開発", label: "開発", checked: true },
      { value: "デザイン", label: "デザイン", checked: true },
      { value: "BizDev", label: "BizDev", checked: true },
      { value: "コミュニティ", label: "コミュニティ", checked: true },
      { value: "マーケティング", label: "マーケティング", checked: true },
      { value: "営業", label: "営業", checked: true },
      { value: "その他", label: "その他", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const App = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [sortOptions, setSortOptions] = useState(defaultSortOptions);
  const [searchText, setSearchText] = useState("");
  const [needNextTasks, setNeedNextTasks] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    getGuilds().then((response) => {
      Promise.all(
        response.guilds.map(async (guild) => {
          if (guild.contract.chain === 0) {
            return {
              value: guild.guildId,
              label: guild.guildName,
              icon: guild.iconUrl,
              channels: guild.channels,
              checked: true,
            };
          } else {
            const check = await isOwner(
              address,
              guild.contract.address,
              guild.contract.chain
            );
            if (check) {
              return {
                value: guild.guildId,
                label: guild.guildName,
                icon: guild.iconUrl,
                channels: guild.channels,
                checked: true,
              };
            }
          }
        })
      ).then((options) => {
        setFilters((prev) => {
          const filters = [...prev];
          filters[0].options = options.filter((v) => v != undefined);
          filters[0].options.map((guildOption) => {
            const channelsOption = guildOption.channels.map((channel) => {
              return {
                value: channel.id,
                label: channel.name,
                icon: guildOption.icon,
                checked: true,
              };
            });
            const addingFilters = channelsOption.filter((v) => v != undefined);
            filters[1].options = [...filters[1].options, ...addingFilters];
          });
          return filters;
        });
      });
    });

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const scrollHandler = () => {
    window.innerHeight + window.scrollY >= document.body.offsetHeight
      ? setNeedNextTasks(true)
      : setNeedNextTasks(false);
  };

  const sortHandler = (index) => {
    const result = sortOptions.map((option, optionIndex) => {
      option.current = optionIndex === index;
      return option;
    });
    setSortOptions(result);
  };

  const checkHandler = (sectionId, index) => {
    const result = [...filters];
    if (sectionId === "Channel") {
      result[1].options[index].checked = !result[1].options[index].checked;
    } else if (sectionId === "Guild") {
      result[0].options[index].checked = !result[0].options[index].checked;
    } else if (sectionId === "Type") {
      result[2].options[index].checked = !result[2].options[index].checked;
    }
    setFilters(result);
  };

  const searchHandler = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      onChange={() =>
                                        checkHandler(section.id, optionIdx)
                                      }
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    {section.id == "Guild" || "Channel" ? (
                                      <div className="h-6 w-6 ml-1">
                                        <img src={option.icon}></img>
                                      </div>
                                    ) : null}
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-1 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end mt-4">
            <ConnectButton
              showBalance={false}
              chainStatus="none"
              accountStatus="full"
            />
          </div>
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
            <div>
              <img className="h-10 w-30" src="./logo.png" />
            </div>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option, optionIndex) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                              onClick={() => sortHandler(optionIndex)}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button> */}

              <div className="relative mt-2 ml-3 w-auto rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  size="40"
                  type="text"
                  name="searchText"
                  id="searchText"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="検索"
                  onChange={searchHandler}
                />
              </div>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-8">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <FunnelIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center justify-start"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  onChange={() =>
                                    checkHandler(section.id, optionIdx)
                                  }
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                {section.id == "Guild" ||
                                section.id == "Channel" ? (
                                  <div className="flex ml-1 w-8 items-center justify-start">
                                    <div className="h-4 w-4 ml-1">
                                      <img src={option.icon}></img>
                                    </div>
                                  </div>
                                ) : null}
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-2 text-sm text-gray-600 justify-start"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              <div className="lg:col-span-7">
                <Tasks
                  filters={filters}
                  sortOptions={sortOptions}
                  needNextTasks={needNextTasks}
                  searchText={searchText}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
