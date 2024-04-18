"use client";
import {
  ChangeEvent,
  FC,
  MouseEvent,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { AxiosError } from "axios";

import { useDebounce, useOutsideClick } from "@/hooks";
import { EndpointsEnum, IUser, LinksEnum, apiErrorMessage } from "@/types";
import { PopUpMenu, SearchField } from "@/components";
import { getDataFromLS, nickNameMinLength, setDataToLS } from "@/utils";
import { ISearchBar } from "./SearchBar.type";
import styles from "./SearchBar.module.scss";

import defaultAvatar from "@/src/assets/vectors/default-user-avatar.svg";
import { clientApi } from "@/services";
import Link from "next/link";
import Image from "next/image";

const SearchBar: FC<ISearchBar> = ({ inputClassName }) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const [recentSearchArr, setRecentSearchArr] = useState<Array<string>>(
    getDataFromLS("recentSearch") || []
  );
  const [showRecentSearchPopup, setShowRecentSearchPopup] = useState(false);

  const [resultArr, setResultArr] = useState<Array<IUser>>([]);
  const [showResultPopup, setShowResultPopup] = useState(false);

  const [showNotFoundPopup, setShowNotFoundPopup] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const searchRef = useRef(null);
  const notFoundRef = useRef(null);
  const resultRef = useRef(null);

  useOutsideClick(searchRef, setShowRecentSearchPopup, "search-field");
  useOutsideClick(resultRef, setShowResultPopup, "search-field");
  useOutsideClick(notFoundRef, setShowNotFoundPopup, "search-field");

  const handleSearch = async (searchValue: string) => {
    try {
      if (searchValue.length < nickNameMinLength) return;

      setIsLoading(true);
      const recentSearchArray = recentSearchArr;
      const res = await clientApi.get(EndpointsEnum.USERS_SEARCH, {
        params: { query: searchValue },
      });

      if (res.data.message === apiErrorMessage.USERS_NOT_FOUND) {
        setShowRecentSearchPopup(false);
        setShowResultPopup(false);
        setSearchValue("");
        return setShowNotFoundPopup(true);
      }
      if (res.data.length) {
        setResultArr(res.data);
        setShowRecentSearchPopup(false);
        setShowResultPopup(true);
        if (!recentSearchArr.includes(searchValue))
          recentSearchArray.push(searchValue);

        setDataToLS({
          recentSearch: Array.from(new Set(recentSearchArray.slice(-5))),
        });
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 404) {
          setShowRecentSearchPopup(false);
          setShowResultPopup(false);
          setShowNotFoundPopup(true);
          setSearchValue("");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowNotFoundPopup(false);
    setSearchValue(e.target.value);
  };

  const onHandleFocus = () => {
    setShowRecentSearchPopup(true);
    setShowNotFoundPopup(false);
  };

  const onHandleRecentSearchClick = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    setSearchValue(e.currentTarget.value);
    setShowRecentSearchPopup(false);
  };

  const onHandleLinkClick = () => {
    setShowResultPopup(false);
    setShowNotFoundPopup(false);
    setShowRecentSearchPopup(false);
  };

  useEffect(() => {
    if (debouncedSearchValue !== "") {
      handleSearch(debouncedSearchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  useEffect(() => {
    setRecentSearchArr(getDataFromLS("recentSearch") || []);
  }, [debouncedSearchValue]);

  const renderRecent = (
    <>
      <p>Recent</p>
      <ul>
        {recentSearchArr.map((el, i) => {
          return (
            <li key={i}>
              <button
                onClick={onHandleRecentSearchClick}
                value={el}
                aria-label="Recent search text button"
              >
                {el}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );

  const renderResult = (
    <>
      <div>
        <p>Result</p>
        <ul>
          {resultArr.slice(0, 5).map((el) => {
            return (
              <li key={el.id}>
                <Link
                  href={`/${el.id}`}
                  onClick={onHandleLinkClick}
                  className={styles["nickname"]}
                  aria-label="User profile nav link"
                >
                  <Image
                    src={el.avatarUrl || defaultAvatar}
                    width={40}
                    height={40}
                    alt="user avatar"
                  />
                  <span>
                    {el.nickName.length > 15
                      ? el.nickName.slice(0, 15) + "..."
                      : el.nickName}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {resultArr.length > 5 ? (
        <Link
          href={LinksEnum.SEARCH}
          className={styles["link"]}
          onClick={onHandleLinkClick}
          aria-label="Search page nav link"
        >
          See more
        </Link>
      ) : null}
    </>
  );

  const renderNotFound = <p>Nothing found.</p>;

  return (
    <div className={styles["search__wrapper"]}>
      <SearchField
        id={"search-field"}
        name={"search-field"}
        dataAutomation={"search-field"}
        className={`${inputClassName} ${isLoading ? styles["input-load"] : ""}`}
        placeholder="Find your friends here"
        value={searchValue}
        onChange={onHandleChange}
        onFocus={onHandleFocus}
        autoComplete="off"
      />
      <PopUpMenu
        isOpen={showRecentSearchPopup && !!recentSearchArr.length}
        setIsOpen={setShowRecentSearchPopup}
        nodeRef={searchRef}
        backdropClassName={`${styles["popup"]} ${styles["recent"]}`}
        bodyClassName={styles["popup__body"]}
        contentWrapperClassNames={`${styles["popup__content-wrapper"]} ${styles["recent"]}`}
      >
        {renderRecent}
      </PopUpMenu>
      <PopUpMenu
        isOpen={showResultPopup}
        setIsOpen={setShowResultPopup}
        nodeRef={resultRef}
        backdropClassName={`${styles["popup"]} ${styles["search"]}`}
        bodyClassName={styles["popup__body"]}
        contentWrapperClassNames={`${styles["popup__content-wrapper"]} ${styles["search"]}`}
      >
        {renderResult}
      </PopUpMenu>
      <PopUpMenu
        isOpen={showNotFoundPopup}
        setIsOpen={setShowNotFoundPopup}
        nodeRef={notFoundRef}
        backdropClassName={`${styles["popup"]} ${styles["not-found"]}`}
        bodyClassName={styles["popup__body"]}
        contentWrapperClassNames={`${styles["popup__content-wrapper"]} ${styles["not-found"]}`}
      >
        {renderNotFound}
      </PopUpMenu>
    </div>
  );
};

export default SearchBar;
