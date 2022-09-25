import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { AssetLinkBlock, BLOCKS, Document } from "@contentful/rich-text-types";
import ApolloClient, { gql } from "apollo-boost";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiArrowLeftBottom, mdiArrowRight } from "@mdi/js";
interface BlogProps {
    blog: {
        title: string;
        body: Document;
        creationDate: Date;
        tags: Array<string>;
        links: Array<{
            title: string;
            url: string;
            sys: {
                id: string;
            };
            width: number;
            height: number;
        }>;
    };
}

const Blog = ({ blog }: BlogProps) => {
    const options = {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node: AssetLinkBlock) => {
                let img = blog.links.find(
                    (i) => i.sys.id === node.data.target.sys.id
                );
                if (!img)
                    img = {
                        url: "",
                        title: "",
                        sys: { id: "" },
                        width: 0,
                        height: 0,
                    };
                return (
                    <div className="max-w-3xl">
                        <Image
                            src={img.url}
                            alt={img.title}
                            width={img.width}
                            height={img.height}
                            objectFit="cover"
                        />
                    </div>
                );
            },
        },
    };
    return (
        <>
            <Layout>
                <div className="max-w-3xl w-4/5 mt-40 mx-auto font-inter">
                    <div className="dark:text-blue-200  text-blue-500 relative w-fit text-xl hover:after:w-full hover:after:h-[0.1rem] hover:after:dark:bg-blue-200 hover:after:bg-blue-500 hover:after:absolute hover:after:bottom-0 cursor-pointer ">
                        <Link href="/" passHref>
                            <a className="flex items-center gap-2">
                                <Icon path={mdiArrowLeft} size={1} />
                                Go back
                            </a>
                        </Link>
                    </div>
                    <div className="flex flex-col mt-4">
                        <h1 className="text-4xl">{blog.title}</h1>
                        <div className="gap-3 mt-2 flex flex-wrap">
                            {blog.tags ? blog.tags.map((tag, key) => (
                                <p
                                    key={key}
                                    className="bg-base-blurple text-base-light py-1 text-sm px-2 rounded "
                                >
                                    {tag}
                                </p>
                            )) : null}
                        </div>
                        <p className="text-md mt-4">
                            {
                                // @ts-ignore
                                documentToReactComponents(blog.body, options)
                            }
                        </p>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Blog;

type Params = {
    blog: string;
};
export async function getStaticProps({ params }: { params: Params }) {

    const client = new ApolloClient({
        uri: "https://graphql.contentful.com/content/v1/spaces/jxkpl93ucbhf",
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
        },
    });

    const { data } = await client.query({
        query: gql`
            query getBlogData($blog: String!) {
                blogPostCollection(where: { title: $blog }, limit: 1) {
                    items {
                        title
                        creationDate
                        tags
                        body {
                            json
                            links {
                                assets {
                                    block {
                                        title
                                        url
                                        sys {
                                            id
                                        }
                                        width
                                        height
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `,
        variables: {
            blog: params.blog,
        },
    });

    const blog = data.blogPostCollection.items[0];
    blog.links = blog.body.links.assets.block;
    blog.body = blog.body.json;


    return {
        props: {
            blog: blog,
        },
    };
}
export async function getStaticPaths() {
    const client = new ApolloClient({
        uri: "https://graphql.contentful.com/content/v1/spaces/jxkpl93ucbhf",
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
        },
    });

    const data = await client.query({
        query: gql`
            query GetText {
                blogPostCollection(preview: false) {
                    items {
                        title
                    }
                }
            }
        `,
    });

    const d = data.data.blogPostCollection.items.map(
        (item: { title: string }) => item.title
    );

    return {
        paths: d.map((val: string) => {
            return { params: { blog: val } };
        }),
        fallback: false,
    };
}
