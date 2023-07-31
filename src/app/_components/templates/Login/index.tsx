"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/_components/atoms/Button";
import { ErrorMessage } from "@/app/_components/atoms/ErrorMessage";
import { TextboxWithError } from "@/app/_components/molecules/TextboxWithError";
import type { Database } from "@/libs/database.types";

import { Spinner } from "../../atoms/Spinner";

const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります。" }),
});

type Schema = z.infer<typeof schema>;

export const Login: FC = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      // エラーチェック
      if (error) {
        setMessage("ログインに失敗しました");
        return;
      }
      reset();
      // トップページに遷移
      router.push("/");
    } catch (error) {
      setMessage("ログインに失敗しました。");
      return;
    } finally {
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative top-32 m-auto w-4/5 rounded bg-card px-4 pb-8 pt-16 shadow before:absolute before:right-0 before:top-0 before:block before:h-[5px] before:w-full before:rounded-t before:bg-primary before:content-['']"
    >
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
          <TextboxWithError
            disabled={isSubmitting}
            id="email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-600" htmlFor="password">
            パスワード
          </label>
          <TextboxWithError
            disabled={isSubmitting}
            id="password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>
        <div className="m-auto flex w-[90%]">
          <Button disabled={isSubmitting}>
            {isSubmitting ? <Spinner variant="default" /> : "ログイン"}
          </Button>
        </div>
        {message && (
          <ErrorMessage className="text-center">{message}</ErrorMessage>
        )}
      </div>
    </form>
  );
};
