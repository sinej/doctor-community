"use client";

import { useState } from "react";
import { getUploadUrl, uploadPost } from "./actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostType, postSchema } from "./schema";
import Input from "@/components/form/input";
import Button from "@/components/form/button";
import {env} from "std-env";

export default function AddProduct() {
    const [preview, setPreview] = useState("");
    const [uploadUrl, setUploadUrl] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm<PostType>({
        resolver: zodResolver(postSchema),
    });
    const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { files },
        } = event;
        if (!files) {
            return;
        }
        const file = files[0];
        const url = URL.createObjectURL(file);
        setPreview(url);
        setFile(file);
        const { success, result } = await getUploadUrl();
        if (success) {
            const { id, uploadURL } = result;
            setUploadUrl(uploadURL);
            console.log("id", id)
            setValue(
                "photo",
                `https://imagedelivery.net/iEDtAIMyt_4aR91ziYbi7Q/${id}`
            );
        }
    };
    const onSubmit = handleSubmit(async (data: PostType) => {
        if (!file) {
            return;
        }
        const cloudflareForm = new FormData();
        cloudflareForm.append("file", file);
        const response = await fetch(uploadUrl, {
            method: "post",
            body: cloudflareForm,
        });
        if (response.status !== 200) {
            return;
        }
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("photo", data.photo);
        const errors = await uploadPost(formData);
        if (errors) {
            // setError("")
        }
    });
    const onValid = async () => {
        await onSubmit();
    };
    return (
        <div>
            <form action={onValid} className="p-5 flex flex-col gap-5">
                <label
                    htmlFor="photo"
                    className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
                    style={{
                        backgroundImage: `url(${preview})`,
                    }}
                >
                    {preview === "" ? (
                        <>
                            <div className="text-neutral-400 text-sm">
                                사진을 추가해주세요.
                                {errors.photo?.message}
                            </div>
                        </>
                    ) : null}
                </label>
                <input
                    onChange={onImageChange}
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    className="hidden"
                />
                <Input
                    required
                    placeholder="제목"
                    type="text"
                    {...register("title")}
                    errors={[errors.title?.message ?? ""]}
                />
                <Input
                    type="text"
                    required
                    placeholder="자세한 설명"
                    {...register("description")}
                    errors={[errors.description?.message ?? ""]}
                />
                <Button text="작성 완료" />
            </form>
        </div>
    );
}