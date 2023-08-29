import { FC } from "react";

export const Tabs: FC = () => {
  return (
    <div className="">
      <input id="all" type="radio" name="tab_item" checked />
      <label className="" htmlFor="all">
        総合
      </label>
      <input id="programming" type="radio" name="tab_item" />
      <label className="" htmlFor="programming">
        プログラミング
      </label>
      <input id="design" type="radio" name="tab_item" />
      <label className="" htmlFor="design">
        デザイン
      </label>
    </div>
  );
};
