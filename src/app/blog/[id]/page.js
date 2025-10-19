"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import useApi from "@/usehook/useApiHook";

export default function Page() {
    const { get_blog_detail_with_id } = useApi();
    const [blogListing, setBlogListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        if (params?.id) {
            fetchLogById(params?.id);
        }
    }, [params?.id]);

    const fetchLogById = async (blogId) => {
        setLoading(true);
        const data = await get_blog_detail_with_id({ id: blogId });
        setTimeout(() => {
            setBlogListing(data.blog);
            setLoading(false);
        }, 500); // Delay for smooth transition
    };

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
            <div className="max-w-4xl mx-auto px-4 md:px-0 pt-16">
                {loading ? (
                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse opacity-0 animate-fadeIn transition-all duration-500" />
                ) : (
                    <h3 className="mt-4 text-2xl font-semibold opacity-0 animate-fadeIn">
                        {blogListing?.title || "Blog Title"}
                    </h3>
                )}
            </div>

            {/* Image Section */}
            <div className="mt-10 mb-10 flex justify-center">
                {loading ? (
                    <div className="w-[1280px] h-[512px] bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse opacity-0 animate-fadeIn transition-all duration-500" />
                ) : (
                    <Image
                        src={blogListing?.image}
                        width={1280}
                        height={512}
                        alt="Blog Cover"
                        className="rounded-lg shadow-lg object-cover opacity-0 animate-fadeIn"
                        priority
                    />
                )}
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 mb-5">
                {loading ? (
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full opacity-0 animate-fadeIn transition-all duration-500" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6 opacity-0 animate-fadeIn transition-all duration-500" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4 opacity-0 animate-fadeIn transition-all duration-500" />
                    </div>
                ) : (
                    <div
                        className="prose dark:prose-invert prose-lg max-w-none opacity-0 animate-fadeIn"
                        dangerouslySetInnerHTML={{
                            __html: blogListing?.content || "<p>No content available</p>",
                        }}
                    />
                )}
            </div>
        </div>
    );
}
