import Image from "next/image";
import { FC } from "react";

import { Button } from "../../atoms/Button";
import { TextboxWithError } from "../../molecules/TextboxWithError";

export const Login: FC = () => {
  return (
    <form className="relative top-16 m-auto w-4/5 rounded bg-card px-4 pb-8 pt-16 shadow before:absolute before:right-0 before:top-0 before:block before:h-[5px] before:w-full before:rounded-t before:bg-primary before:content-['']">
      <Image
        src={"/lock.svg"}
        alt=""
        className="absolute left-[50%] top-[-30px] translate-x-[-50%]"
        height={80}
        width={80}
      />
      <div className="flex flex-col gap-5">
        <fieldset className="text-center text-xl font-bold text-gray-700">
          ログイン
        </fieldset>
        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-600" htmlFor="email">
            メールアドレス
          </label>
          <TextboxWithError id="email" type="email" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-600" htmlFor="password">
            パスワード
          </label>
          <TextboxWithError id="password" type="password" />
        </div>
        <div className="m-auto flex w-[90%]">
          <Button>ログイン</Button>
        </div>
      </div>
    </form>
  );
};
